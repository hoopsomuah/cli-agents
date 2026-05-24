#!/usr/bin/env python3
"""Generate responsive WebP variants for every hero image.

For each PNG/JPG in site/assets/images/, emit WebP at the configured widths
into site/assets/images/webp/<width>/<basename>.webp. Idempotent: skips
files whose WebP variant is newer than the source. Pure stdlib + ffmpeg.

Run from the repo root:

    python3 scripts/generate-webp.py

Options:

    --force         re-encode even if up-to-date
    --quality N     WebP quality (default 82; 80-85 is the sweet spot for
                    watercolor illustration)
    --widths a,b,c  comma-separated target widths in px (default 768,1280,1920)
    --jobs N        parallel encodes (default = CPU count)
    --dry-run       list what would change, don't encode

The renderers (site/js/render.js and present/deck.js) read these files via
<picture> + srcset. If you add a new hero image to site/assets/images/, run
this script before committing so the responsive variants ship with it.
"""
from __future__ import annotations

import argparse
import concurrent.futures as cf
import os
import shutil
import subprocess
import sys
import time
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SRC_DIR = REPO / "site" / "assets" / "images"
OUT_ROOT = SRC_DIR / "webp"
DEFAULT_WIDTHS = (768, 1280, 1920)
DEFAULT_QUALITY = 82
SOURCE_EXTS = {".png", ".jpg", ".jpeg"}


def find_sources() -> list[Path]:
    out = []
    for p in sorted(SRC_DIR.iterdir()):
        if not p.is_file():
            continue
        if p.suffix.lower() not in SOURCE_EXTS:
            continue
        out.append(p)
    return out


def target_path(src: Path, width: int) -> Path:
    return OUT_ROOT / str(width) / f"{src.stem}.webp"


def needs_encode(src: Path, dst: Path, force: bool) -> bool:
    if force or not dst.exists():
        return True
    return src.stat().st_mtime > dst.stat().st_mtime


def encode(src: Path, dst: Path, width: int, quality: int) -> tuple[Path, int, str | None]:
    """Returns (dst, bytes_written, error). Caller logs."""
    dst.parent.mkdir(parents=True, exist_ok=True)
    tmp = dst.with_name(dst.name + ".tmp.webp")
    cmd = [
        "ffmpeg",
        "-y",
        "-loglevel", "error",
        "-i", str(src),
        "-vf", f"scale={width}:-2:flags=lanczos",
        "-c:v", "libwebp",
        "-quality", str(quality),
        "-compression_level", "6",
        "-an",
        str(tmp),
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True)
    except subprocess.CalledProcessError as e:
        tmp.unlink(missing_ok=True)
        return dst, 0, e.stderr.decode("utf-8", "replace").strip() or "ffmpeg failed"
    except FileNotFoundError:
        return dst, 0, "ffmpeg not found on PATH"

    tmp.replace(dst)
    return dst, dst.stat().st_size, None


def human(n: int) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024:
            return f"{n:.0f} {unit}"
        n /= 1024
    return f"{n:.0f} TB"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--force", action="store_true", help="Re-encode even if up-to-date")
    ap.add_argument("--quality", type=int, default=DEFAULT_QUALITY)
    ap.add_argument("--widths", default=",".join(str(w) for w in DEFAULT_WIDTHS))
    ap.add_argument("--jobs", type=int, default=os.cpu_count() or 4)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    widths = tuple(int(w.strip()) for w in args.widths.split(",") if w.strip())
    if not widths:
        print("error: no widths specified", file=sys.stderr)
        return 2

    if not shutil.which("ffmpeg"):
        print("error: ffmpeg not found on PATH — install ffmpeg first", file=sys.stderr)
        return 2

    sources = find_sources()
    if not sources:
        print(f"no source images found in {SRC_DIR}", file=sys.stderr)
        return 1

    # Plan
    plan: list[tuple[Path, Path, int]] = []
    for src in sources:
        for w in widths:
            dst = target_path(src, w)
            if needs_encode(src, dst, args.force):
                plan.append((src, dst, w))

    src_total = sum(p.stat().st_size for p in sources)
    print(f"Sources: {len(sources)} files, {human(src_total)} total")
    print(f"Targets: {len(widths)} widths × {len(sources)} sources = {len(sources) * len(widths)} variants")
    print(f"Need encoding: {len(plan)} file(s){' (dry-run)' if args.dry_run else ''}")

    if args.dry_run or not plan:
        for src, dst, w in plan[:20]:
            print(f"  + {dst.relative_to(REPO)}  (from {src.name}, {w}w)")
        if len(plan) > 20:
            print(f"  ... and {len(plan) - 20} more")
        return 0

    start = time.time()
    errors: list[tuple[Path, str]] = []
    total_bytes = 0

    with cf.ThreadPoolExecutor(max_workers=args.jobs) as ex:
        futs = {
            ex.submit(encode, src, dst, w, args.quality): (src, dst, w)
            for src, dst, w in plan
        }
        for i, fut in enumerate(cf.as_completed(futs), 1):
            src, dst, w = futs[fut]
            _, size, err = fut.result()
            if err:
                errors.append((dst, err))
                print(f"  ✗ [{i}/{len(plan)}] {dst.relative_to(REPO)}: {err}")
            else:
                total_bytes += size
                if i % 25 == 0 or i == len(plan):
                    print(f"  ✓ [{i}/{len(plan)}] {dst.relative_to(REPO)}  ({human(size)})")

    elapsed = time.time() - start
    print(f"\nEncoded {len(plan) - len(errors)} file(s) in {elapsed:.1f}s, {human(total_bytes)} written")
    if errors:
        print(f"\n{len(errors)} error(s):", file=sys.stderr)
        for dst, err in errors:
            print(f"  {dst.relative_to(REPO)}: {err}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
