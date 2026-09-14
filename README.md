交互式个人简历页（示例）

包含文件：
- index.html  — 页面主文件
- styles.css  — 页面样式（响应式、动画、悬停效果）
- script.js   — 滚动 reveal、移动端菜单、头像倾斜交互
- assets/profile.svg — 占位头像 SVG

分支：feature/resume-page

说明与后续操作建议：
1. 在仓库中查看并预览：将本分支合并到默认分支或在 GitHub Pages 中将发布源设置为该分支以启用页面预览。
2. 替换头像与联系方式：将 assets/profile.svg 替换为你的真实头像，修改 index.html 中的邮箱/电话/社交链接。
3. 增强效果：
   - 若希望更丰富的滚动动画，可引入 AOS、ScrollReveal 等库或基于 IntersectionObserver 扩展更多效果。
   - 若要添加项目详情弹窗，可在 project-card 上加入点击事件和模态窗口。
4. 部署：推荐使用 GitHub Pages 或将页面作为主站点的一部分部署到你喜欢的静态托管（Netlify、Vercel 等）。

如果你希望我：
- 把页面部署到 gh-pages 分支并配置 GitHub Pages，我可以继续帮你完成部署步骤；
- 或者根据你的真实内容（头像、简历文本、项目链接）替换示例数据并美化样式，也可以直接替你修改。