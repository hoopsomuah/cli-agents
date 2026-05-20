// canon-comparison.js — side by side, "old way" vs "living canon"
export function renderCanonComparison(target) {
  target.innerHTML = `
    <div class="comparison">
      <div class="comparison__card" style="border-left:3px solid oklch(65% 0.16 25);">
        <h4>Quarterly Deck Era</h4>
        <ul>
          <li>"Mission_v4_FINAL.pptx" emailed Jan 7</li>
          <li>Three people have different copies</li>
          <li>Last update: 18 months ago</li>
          <li>Approval lived in Sarah's inbox somewhere</li>
          <li>Agents can't read it without a converter</li>
        </ul>
      </div>
      <div class="comparison__card" style="border-left:3px solid oklch(60% 0.18 145);">
        <h4>Living Canon</h4>
        <ul>
          <li><code>canon/mission.md</code> at a stable URL</li>
          <li>One source. One link. Always current.</li>
          <li>Every change is a PR with a reviewer</li>
          <li>Full history. Diff any two moments.</li>
          <li>Agents read it natively in milliseconds</li>
        </ul>
      </div>
    </div>
  `;
}
