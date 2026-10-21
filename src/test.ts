import { scan } from './scanner.js';

const url = process.argv[2] || 'https://example.com';
const violations = await scan(url);

console.log(`共发现 ${violations.length} 类问题\n`);
for (const v of violations) {
  console.log(`[${v.impact}] ${v.id}：${v.help}（${v.nodes.length} 处）`);
}
