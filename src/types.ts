export interface KnowledgeEntry {
  id: string;
  title: string;
  whyItMatters: string;
  whoIsAffected: string[];
  howToFix: string;
  examples?: { bad: string; good: string };
  frameworkTips?: { vue?: string; react?: string };
  wcag: string;
}

export interface EnhancedIssue {
  id: string;
  impact: string;
  title: string;
  helpUrl: string;
  nodes: { html: string; target: string }[];
  knowledge: KnowledgeEntry | null; // 知识库没覆盖时为 null
  fallbackHelp: string;             // axe 自带的英文说明，作为兜底
}
