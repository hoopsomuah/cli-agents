// smoke.mjs — exercises the DOM-free modules in plain Node. No dependencies.
//   node test/smoke.mjs

import { parseDot } from '../js/dot.js';
import { buildScene } from '../js/scene.js';
import { parseTimeline, bindTimeline, buildSchedule } from '../js/timeline.js';
import { EXAMPLES } from '../js/examples.js';

let failures = 0;
const check = (label, ok) => {
  console.log(`${ok ? 'ok  ' : 'FAIL'}  ${label}`);
  if (!ok) failures++;
};

// Every bundled example must parse, lay out, bind, and schedule.
for (const example of EXAMPLES) {
  try {
    const scene = buildScene(parseDot(example.dot));
    const bound = bindTimeline(parseTimeline(example.timeline), scene);
    const schedule = buildSchedule(bound, scene);
    check(
      `example ${example.id}: ${scene.nodes.length} nodes, ${schedule.steps.length} steps, ${schedule.total.toFixed(1)}s`,
      scene.nodes.length > 0 && schedule.total > 0
    );
  } catch (err) {
    check(`example ${example.id}: ${err.message}`, false);
  }
}

// Edge chains and spaceless arrows.
const chain = buildScene(parseDot('digraph t { a->b->c }'));
check('a->b->c parses to 2 edges', chain.edges.length === 2);

// Icon auto-pick: keyword match and stable fallback.
const pick = buildScene(parseDot('digraph t { a [label="GitHub origin"]; b [label="Reviewer"]; a->b }'));
check('keyword auto-pick', pick.nodes[0].icon === 'cloud' && pick.nodes[1].icon === 'person');

// Reverse pulse resolves against the only existing edge and auto-reveals it.
const rev = buildSchedule(bindTimeline(parseTimeline('b ->> a : back'), pick), pick);
const types = rev.steps[0].actions.map((a) => a.type + (a.reverse ? ':rev' : ''));
check('reverse pulse auto-reveals', JSON.stringify(types) === '["show","show","show","pulse:rev"]');

// Error paths surface line numbers.
const throws = (fn) => { try { fn(); return null; } catch (err) { return err.message; } };
check('undirected graph rejected', /digraph/.test(throws(() => parseDot('graph { a -- b }'))));
check('unknown node rejected', /No node "nope"/.test(throws(() => bindTimeline(parseTimeline('show nope'), pick))));
check('bad step rejected', /Cannot parse/.test(throws(() => parseTimeline('wobble a'))));

process.exit(failures ? 1 : 0);
