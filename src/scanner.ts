import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

export async function scan(url: string) {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    return results.violations;
  } finally {
    await browser.close();
  }
}
