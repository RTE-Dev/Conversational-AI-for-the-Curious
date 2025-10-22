import { defineConfig } from 'vitepress'
import sidebar from './sidebar.generated';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "一份面向对话式 AI 开发者的操作手册",
  description: "这本开源小册子深入探索 Conversational AI（对话式 AI）的工程基础 —— 从实时流式传输与 WebRTC，到框架设计、级联与端到端架构、多模态交互，以及评估方法论。",
  srcDir: 'docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/RTE-Dev/Conversational-AI-for-the-curious.git' }
    ]
  }
})
