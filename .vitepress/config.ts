import { defineConfig } from 'vitepress'
import sidebar from './sidebar.generated';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "对话式 AI 好奇者手册",
  description: "这本开源小册子深入探索 Conversational AI（对话式 AI）的工程基础 —— 从实时流式传输与 WebRTC，到框架设计、级联与端到端架构、多模态交互，以及评估方法论。",
  srcDir: 'docs',
  base: '/conversational-ai-for-the-curious/',
  markdown: {
  },
  themeConfig: {
    outline: {
      level: [2, 3],
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/RTE-Dev/Conversational-AI-for-the-curious.git' }
    ]
  },
  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GTM-M8NNQBCW' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GTM-M8NNQBCW');`
    ]
  ],
  lang: 'zh-CN'
})
