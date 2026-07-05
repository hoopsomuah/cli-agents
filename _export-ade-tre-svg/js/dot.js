// dot.js — parser for the subset of Graphviz DOT that Flow Lab understands.
//
// Supported:
//   digraph name { ... }
//   rankdir=LR;                      (graph-level attribute, bare)
//   graph [rankdir=TB]               (graph-level attribute list)
//   node  [icon=circle]              (default attributes for subsequent nodes)
//   edge  [color=x]                  (default attributes for subsequent edges)
//   a [label="Two\nlines" icon=star]
//   a -> b -> c [label="ship it"]
//   // line comments, /* block comments */, # line comments
//
// Not supported (throws): subgraphs, undirected graphs, ports, HTML labels.

const SYMBOLS = new Set(['{', '}', '[', ']', '=', ';', ',']);

function tokenize(src) {
  // Strip comments first so the main scanner stays simple.
  const clean = src
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
    .replace(/^#.*$/gm, ' ');

  const tokens = [];
  let i = 0;
  let line = 1;
  while (i < clean.length) {
    const ch = clean[i];
    if (ch === '\n') { line++; i++; continue; }
    if (/\s/.test(ch)) { i++; continue; }
    if (ch === '-' && clean[i + 1] === '>') {
      tokens.push({ type: 'arrow', line });
      i += 2;
      continue;
    }
    if (SYMBOLS.has(ch)) {
      tokens.push({ type: ch, line });
      i++;
      continue;
    }
    if (ch === '"') {
      let j = i + 1;
      let value = '';
      while (j < clean.length && clean[j] !== '"') {
        if (clean[j] === '\\') {
          const next = clean[j + 1];
          if (next === 'n') value += '\n';
          else value += next;
          j += 2;
        } else {
          if (clean[j] === '\n') line++;
          value += clean[j];
          j++;
        }
      }
      if (j >= clean.length) throw new DotError('Unterminated string', line);
      tokens.push({ type: 'id', value, quoted: true, line });
      i = j + 1;
      continue;
    }
    // "-" is allowed inside ids (feature-branch) but not when it starts "->".
    const match = /^(?:[A-Za-z0-9_.À-￿]|-(?!>))+/.exec(clean.slice(i));
    if (match) {
      tokens.push({ type: 'id', value: match[0], line });
      i += match[0].length;
      continue;
    }
    throw new DotError(`Unexpected character "${ch}"`, line);
  }
  return tokens;
}

export class DotError extends Error {
  constructor(message, line) {
    super(line ? `${message} (line ${line})` : message);
    this.line = line;
  }
}

/**
 * Parse DOT source into { name, attrs, nodes, edges }.
 * nodes: [{ id, attrs: { label, icon, ... } }] in declaration order.
 * edges: [{ from, to, attrs }] in declaration order.
 */
export function parseDot(src) {
  const tokens = tokenize(src);
  let pos = 0;

  const peek = () => tokens[pos];
  const next = () => tokens[pos++];
  const expect = (type, what) => {
    const t = next();
    if (!t || t.type !== type) {
      throw new DotError(`Expected ${what || type}`, t ? t.line : undefined);
    }
    return t;
  };

  const first = next();
  if (!first || first.type !== 'id' || first.value.toLowerCase() !== 'digraph') {
    throw new DotError('Flow Lab graphs must start with "digraph"', first && first.line);
  }
  let name = 'flow';
  if (peek() && peek().type === 'id') name = next().value;
  expect('{', '"{"');

  const graph = { name, attrs: {}, nodes: [], edges: [] };
  const nodeIndex = new Map();
  const defaults = { node: {}, edge: {} };

  const ensureNode = (id, line) => {
    if (id === 'graph' || id === 'node' || id === 'edge') {
      throw new DotError(`"${id}" is a reserved word and cannot be a node id`, line);
    }
    if (!nodeIndex.has(id)) {
      const node = { id, attrs: { ...defaults.node } };
      nodeIndex.set(id, node);
      graph.nodes.push(node);
    }
    return nodeIndex.get(id);
  };

  const parseAttrList = () => {
    const attrs = {};
    expect('[');
    while (peek() && peek().type !== ']') {
      const key = expect('id', 'attribute name').value;
      expect('=', '"=" after attribute name');
      const value = expect('id', 'attribute value').value;
      attrs[key] = value;
      if (peek() && (peek().type === ',' || peek().type === ';')) next();
    }
    expect(']', '"]"');
    return attrs;
  };

  while (peek() && peek().type !== '}') {
    const t = next();
    if (t.type === ';') continue;
    if (t.type !== 'id') throw new DotError('Expected a statement', t.line);

    if (t.value === 'graph' || t.value === 'node' || t.value === 'edge') {
      const attrs = parseAttrList();
      if (t.value === 'graph') Object.assign(graph.attrs, attrs);
      else Object.assign(defaults[t.value], attrs);
      continue;
    }

    // Bare graph attribute: rankdir=LR
    if (peek() && peek().type === '=') {
      next();
      graph.attrs[t.value] = expect('id', 'attribute value').value;
      continue;
    }

    // Node or edge chain starting at this id.
    const chain = [t.value];
    ensureNode(t.value, t.line);
    while (peek() && peek().type === 'arrow') {
      next();
      const target = expect('id', 'node id after "->"');
      ensureNode(target.value, target.line);
      chain.push(target.value);
    }

    let attrs = {};
    if (peek() && peek().type === '[') attrs = parseAttrList();

    if (chain.length === 1) {
      Object.assign(nodeIndex.get(chain[0]).attrs, attrs);
    } else {
      for (let k = 0; k < chain.length - 1; k++) {
        graph.edges.push({
          from: chain[k],
          to: chain[k + 1],
          attrs: { ...defaults.edge, ...attrs },
        });
      }
    }
  }
  expect('}', '"}"');
  return graph;
}
