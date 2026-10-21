import type { EnhancedIssue } from '../types.js';

const ORDER = ['critical', 'serious', 'moderate', 'minor'];
const LABEL: Record<string, string> = {
  critical: '致命', serious: '严重', moderate: '中等', minor: '轻微',
};
const COLOR: Record<string, string> = {
  critical: '\x1b[31m', serious: '\x1b[33m', moderate: '\x1b[36m', minor: '\x1b[90m',
};
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

export function printReport(issues: EnhancedIssue[]) {
  const sorted = [...issues].sort(
    (a, b) => ORDER.indexOf(a.impact) - ORDER.indexOf(b.impact),
  );

  if (sorted.length === 0) {
    console.log('✔ 没有发现自动化可检测的问题（仍建议做人工检查）');
    return;
  }

  for (const i of sorted) {
    const c = COLOR[i.impact] ?? '';
    console.log(`${c}${BOLD}✖ ${LABEL[i.impact] ?? i.impact}${RESET}  ${BOLD}${i.title}${RESET} (${i.id})`);

    if (i.knowledge) {
      const k = i.knowledge;
      console.log(`  为什么重要：${k.whyItMatters}`);
      console.log(`  受影响人群：${k.whoIsAffected.join('、')}`);
      console.log(`  如何修复：${k.howToFix}`);
      if (k.examples) {
        console.log(`  错误示例：${k.examples.bad.replace(/\n/g, '\n            ')}`);
        console.log(`  正确示例：${k.examples.good.replace(/\n/g, '\n            ')}`);
      }
      console.log(`  WCAG：${k.wcag}`);
    } else {
      console.log(`  说明（英文原文）：${i.fallbackHelp}`);
      console.log(`  详情：${i.helpUrl}`);
    }

    console.log(`  出问题的位置（共 ${i.nodes.length} 处）：`);
    for (const n of i.nodes.slice(0, 3)) console.log(`    - ${n.target}`);
    if (i.nodes.length > 3) console.log(`    ……还有 ${i.nodes.length - 3} 处`);
    console.log();
  }

  const total = sorted.reduce((s, i) => s + i.nodes.length, 0);
  console.log(`共 ${sorted.length} 类问题，${total} 处元素需要修复。`);
  console.log('提示：自动化工具只能发现部分问题，请配合键盘和读屏软件做人工检查。');
}
