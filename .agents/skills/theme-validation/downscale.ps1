# Downscale raw audit PNGs into compact review JPEGs so reviewer agents can open them
# without exceeding the model's per-request attachment limit (~5 MB).
#
# Mirrors  .theme-audit/{reading,deck}/...*.png  ->  .theme-audit/review/...*.jpg
#   pass 1: longest side <= 1000px (1600px for very tall scene shots), quality 68
#   pass 2: any output still > 1 MB re-encoded harder (longest side <= 1600px, quality 45)
# Idempotent: re-running re-converts from the current PNGs.
#
# Windows / .NET System.Drawing — no extra dependencies. Run:  pwsh downscale.ps1

Add-Type -AssemblyName System.Drawing

$root = Join-Path $PSScriptRoot ".theme-audit"
if (!(Test-Path $root)) { Write-Error "No .theme-audit/ found next to this script. Run audit.mjs first."; exit 1 }

$jpegEnc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }

function Save-Jpeg([System.Drawing.Image]$img, [string]$out, [int]$maxLong, [int]$quality) {
    $w = $img.Width; $h = $img.Height
    $scale = 1.0
    $long = [math]::Max($w, $h)
    if ($long -gt $maxLong) { $scale = [double]$maxLong / $long }
    $nw = [int][math]::Max(1, [math]::Round($w * $scale))
    $nh = [int][math]::Max(1, [math]::Round($h * $scale))
    $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
    try {
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $nw, $nh)
        $g.Dispose()
        $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
        $bmp.Save($out, $jpegEnc, $ep)
    } finally { $bmp.Dispose() }
}

$converted = 0
foreach ($sr in @("reading", "deck")) {
    $base = Join-Path $root $sr
    if (!(Test-Path $base)) { continue }
    foreach ($f in Get-ChildItem $base -Recurse -Filter *.png) {
        $rel = $f.FullName.Substring($root.Length + 1)
        $out = Join-Path (Join-Path $root "review") ([System.IO.Path]::ChangeExtension($rel, ".jpg"))
        $od = Split-Path $out -Parent
        if (!(Test-Path $od)) { New-Item -ItemType Directory -Force -Path $od | Out-Null }
        $img = [System.Drawing.Image]::FromFile($f.FullName)
        try { Save-Jpeg $img $out 1000 68 } finally { $img.Dispose() }
        $converted++
    }
}

# Pass 2: harder-compress anything still over 1 MB.
$recompressed = 0
foreach ($f in Get-ChildItem (Join-Path $root "review") -Recurse -Filter *.jpg | Where-Object Length -gt 1MB) {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    $tmp = $f.FullName + ".tmp.jpg"
    try { Save-Jpeg $img $tmp 1600 45 } finally { $img.Dispose() }
    Move-Item $tmp $f.FullName -Force
    $recompressed++
}

$all = Get-ChildItem (Join-Path $root "review") -Recurse -Filter *.jpg
$maxKB = [math]::Round(($all | Measure-Object Length -Maximum).Maximum / 1KB, 1)
"converted=$converted recompressed=$recompressed total=$($all.Count) maxKB=$maxKB over1MB=$(($all | Where-Object Length -gt 1MB).Count)"
