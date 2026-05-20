// pr-walkthrough.js — clickable PR mockup with approve → merge flow
export function renderPRWalkthrough(target) {
  target.innerHTML = `
    <div class="pr">
      <div class="pr__header">
        <span class="pr__badge">Open</span>
        <p class="pr__title">Q2 launch: June 1 → June 15</p>
        <span class="pr__meta">#47 · hoop wants to merge into main</span>
      </div>
      <div class="pr__diff">
        <div style="padding:.5rem 1rem;font-family:var(--font-mono);font-size:.75rem;color:var(--fg-muted);background:var(--bg-2);border-bottom:1px solid var(--rule);">
          canon/plan-of-record.md
        </div>
        <div class="pr__diff-row del"><span class="pr__diff-marker">-</span><span>Launch: June 1, 2026</span></div>
        <div class="pr__diff-row add"><span class="pr__diff-marker">+</span><span>Launch: June 15, 2026 (shifted from June 1; see decision #DEC-2026-07)</span></div>
        <div style="padding:.5rem 1rem;font-family:var(--font-mono);font-size:.75rem;color:var(--fg-muted);background:var(--bg-2);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);">
          canon/rhythm.md
        </div>
        <div class="pr__diff-row del"><span class="pr__diff-marker">-</span><span>Q2 launch readiness: weekly through May 30</span></div>
        <div class="pr__diff-row add"><span class="pr__diff-marker">+</span><span>Q2 launch readiness: weekly through June 13</span></div>
      </div>
      <div class="pr__footer">
        <button class="pr__approve" id="pr-approve">Approve</button>
        <button class="pr__merge" id="pr-merge">Merge to main</button>
        <span class="pr__status" id="pr-status">Awaiting review · 1 reviewer required</span>
      </div>
    </div>
    <p style="font-family:var(--font-serif);font-style:italic;font-size:var(--text-sm);color:var(--fg-muted);margin:1rem 0 0;text-align:center;">
      Click Approve → Merge. The diff, the description, and your decision are all permanent.
    </p>
  `;

  const approve = target.querySelector('#pr-approve');
  const merge = target.querySelector('#pr-merge');
  const status = target.querySelector('#pr-status');
  const badge = target.querySelector('.pr__badge');

  approve.addEventListener('click', () => {
    if (approve.classList.contains('is-approved')) return;
    approve.classList.add('is-approved');
    approve.textContent = '✓ Approved';
    merge.classList.add('is-enabled');
    status.textContent = 'Approved by you · ready to merge';
  });

  merge.addEventListener('click', () => {
    if (!merge.classList.contains('is-enabled')) return;
    merge.classList.add('is-merged');
    merge.textContent = '✓ Merged';
    badge.textContent = 'Merged';
    badge.style.background = 'oklch(48% 0.14 270)';
    status.textContent = 'Merged into main · audit trail preserved forever';
  });
}
