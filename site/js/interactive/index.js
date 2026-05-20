// interactive/index.js — dispatcher
import { renderTeletype } from './teletype.js';
import { renderAcronymCards } from './acronyms.js';
import { renderTerminalTour } from './terminal-tour.js';
import { renderFilesystem } from './filesystem.js';
import { renderTuiGallery } from './tui-gallery.js';
import { renderGraveyard } from './graveyard.js';
import { renderRepoTimeline } from './repo-timeline.js';
import { renderPRWalkthrough } from './pr-walkthrough.js';
import { renderCanonComparison } from './canon-comparison.js';
import { renderFileOverAppQuotes } from './file-over-app.js';
import { renderObsidianDemo } from './obsidian.js';
import { renderFormatShootout } from './formats.js';
import { renderCopilotCLI } from './copilot-sim.js';
import { renderPRAuthorComparison } from './pr-authors.js';
import { renderSharepointVsRepo } from './sharepoint-vs-repo.js';
import { renderInstallChecklist } from './install-checklist.js';
import { renderIssueList } from './issue-list.js';

const REGISTRY = {
  'teletype-animation': renderTeletype,
  'acronym-cards': renderAcronymCards,
  'terminal-tour': renderTerminalTour,
  'fs-walkthrough': renderFilesystem,
  'tui-gallery': renderTuiGallery,
  'filename-graveyard': renderGraveyard,
  'repo-timeline': renderRepoTimeline,
  'pr-walkthrough': renderPRWalkthrough,
  'canon-comparison': renderCanonComparison,
  'file-over-app-quotes': renderFileOverAppQuotes,
  'obsidian-demo': renderObsidianDemo,
  'format-shootout': renderFormatShootout,
  'copilot-cli-sim': renderCopilotCLI,
  'pr-author-comparison': renderPRAuthorComparison,
  'sharepoint-vs-repo': renderSharepointVsRepo,
  'install-checklist': renderInstallChecklist,
  'issue-list': renderIssueList,
};

export function initInteractives() {
  document.querySelectorAll('[data-interactive]').forEach((el) => {
    const slot = el.dataset.interactive;
    const target = el.querySelector('[data-interactive-target]');
    const renderer = REGISTRY[slot];
    if (!renderer || !target) return;
    try {
      renderer(target);
    } catch (e) {
      console.error(`Interactive "${slot}" failed:`, e);
    }
  });
}
