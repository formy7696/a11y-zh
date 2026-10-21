import { Command } from 'commander';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { scan } from './scanner.js';
import { enhance } from './enhancer.js';
import { printReport } from './reporters/terminal.js';

const LEVELS = ['minor', 'moderate', 'serious', 'critical'];

function toUrl(target: string): string {
  if (/^(https?|file):\/\//.test(target)) return target;
  return pathToFileURL(resolve(target)).href; // 本地文件路径
}

new Command()
  .name('a11y-zh')
  .description('面向中文开发者的网页无障碍检查工具')
  .argument('<target>', '网址或本地 HTML 文件路径')
  .option('--fail-on <level>', '出现该级别及以上的问题时退出码为 1（minor|moderate|serious|critical）')
  .action(async (target: string, opts: { failOn?: string }) => {
    const issues = enhance(await scan(toUrl(target)));
    printReport(issues);

    if (opts.failOn) {
      const threshold = LEVELS.indexOf(opts.failOn);
      if (threshold < 0) {
        console.error(`无效的级别：${opts.failOn}`);
        process.exit(2);
      }
      if (issues.some((i) => LEVELS.indexOf(i.impact) >= threshold)) process.exit(1);
    }
  })
  .parseAsync();
