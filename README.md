# a11y-zh

面向中文开发者的网页无障碍检查工具。

基于业界标准的 [axe-core](https://github.com/dequelabs/axe-core) 检测，在检测结果上加了一层**中文知识库**：不只告诉你"哪里错了"，还告诉你**为什么重要、谁会受影响、怎么改**，并附上错误/正确示例。

## 安装

需要 Node.js 18 或更高版本。

```bash
git clone https://github.com/formy7696/a11y-zh.git
cd a11y-zh
npm install
npx playwright install chromium
```

## 使用

```bash
# 检查网址
npm run scan -- https://example.com

# 检查本地 HTML 文件
npm run scan -- ./dist/index.html

# 在 CI 中使用：出现严重及以上问题时返回退出码 1
npm run scan -- ./dist/index.html --fail-on serious
```

## 当前覆盖的规则

图片替代文本、按钮名称、链接文字、表单标签、颜色对比度、页面标题、页面语言。

未收录的规则会显示 axe 的英文原文说明，不会漏报。

## 重要局限

**自动化工具只能发现一部分无障碍问题**。以下情况必须人工检查：

- alt 文字写得对不对、有没有表达图片的真实含义
- 只用键盘（Tab、Enter、Esc）能否完成全部操作
- 焦点顺序是否合理，焦点是否可见
- 页面放大到 200% 后是否仍可正常使用
- 用读屏软件（NVDA、VoiceOver）实际体验一遍

通过本工具的检查，**不代表**页面已经无障碍。

## 参与贡献

最容易的贡献方式：为 `knowledge/` 目录添加一条新规则。每条规则是一个 JSON 文件，格式参考 `knowledge/image-alt.json`。规则 id 与 [axe 规则列表](https://dequeuniversity.com/rules/axe/) 一致。

详见 CONTRIBUTING.md（待补充）。

## 许可证

MIT
