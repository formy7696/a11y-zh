import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import type { EnhancedIssue, KnowledgeEntry } from './types.js';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'knowledge');

function loadKnowledge(): Map<string, KnowledgeEntry> {
  const map = new Map<string, KnowledgeEntry>();
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.json')) continue;
    const entry = JSON.parse(readFileSync(join(dir, file), 'utf-8')) as KnowledgeEntry;
    map.set(entry.id, entry);
  }
  return map;
}

const knowledge = loadKnowledge();

export function enhance(violations: any[]): EnhancedIssue[] {
  return violations.map((v) => ({
    id: v.id,
    impact: v.impact ?? 'minor',
    title: knowledge.get(v.id)?.title ?? v.help,
    helpUrl: v.helpUrl,
    nodes: v.nodes.map((n: any) => ({
      html: n.html,
      target: (n.target as any[]).flat().join(' '),
    })),
    knowledge: knowledge.get(v.id) ?? null,
    fallbackHelp: v.help,
  }));
}
