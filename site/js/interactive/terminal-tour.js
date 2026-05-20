// terminal-tour.js — illustrated Windows Terminal screenshot
export function renderTerminalTour(target) {
  target.innerHTML = `
    <div style="background:#1a1f2b;border-radius:10px;padding:0;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.25);">
      <div style="background:#242a36;padding:.5rem 1rem;display:flex;gap:.5rem;align-items:center;font-family:var(--font-mono);font-size:.7rem;color:#888;">
        <span style="width:11px;height:11px;border-radius:50%;background:#e06c75;"></span>
        <span style="width:11px;height:11px;border-radius:50%;background:#e5c07b;"></span>
        <span style="width:11px;height:11px;border-radius:50%;background:#98c379;"></span>
        <span style="margin-left:1rem;">PowerShell</span>
        <span style="padding:.15rem .5rem;background:#2d3340;border-radius:4px 4px 0 0;margin-left:1rem;color:#fff;">PowerShell</span>
        <span style="padding:.15rem .5rem;color:#666;">Ubuntu (WSL)</span>
        <span style="padding:.15rem .5rem;color:#666;">Azure CLI</span>
        <span style="margin-left:auto;">+</span>
      </div>
      <div style="padding:1rem 1.25rem;font-family:var(--font-mono);font-size:.8rem;line-height:1.6;color:#d4d4d4;min-height:9rem;">
        <div><span style="color:#98c379;">PS C:\\Users\\hoop&gt;</span> <span style="color:#fff;">ls</span></div>
        <div style="color:#888;">    Documents/   Downloads/   team-canon/</div>
        <div><span style="color:#98c379;">PS C:\\Users\\hoop&gt;</span> <span style="color:#fff;">cd team-canon</span></div>
        <div><span style="color:#98c379;">PS C:\\Users\\hoop\\team-canon&gt;</span> <span style="color:#fff;">git status</span></div>
        <div style="color:#888;">    On branch main · clean working tree</div>
        <div><span style="color:#98c379;">PS C:\\Users\\hoop\\team-canon&gt;</span> <span style="display:inline-block;width:.5em;height:1em;background:#98c379;vertical-align:-2px;animation:blink 1s steps(2) infinite;"></span></div>
      </div>
    </div>
    <p style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--fg-faint);margin-top:.75rem;text-align:center;">
      One window. Three shells (tabs). Real font. Mouse-selectable text. Welcome to 2026.
    </p>
  `;
}
