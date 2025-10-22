import { type DefaultTheme } from 'vitepress';

type Sidebar = DefaultTheme.Config['sidebar'];

const sidebar: Sidebar = [
  {
    "link": "/1-我们为何撰写本手册",
    "text": "1-我们为何撰写本手册"
  },
  {
    "link": "/2-Conversational AI 的架构与编排",
    "text": "2-Conversational AI 的架构与编排"
  },
  {
    "link": "/3-实时传输：WebRTC 与 WebSocket 的选择",
    "text": "3-实时传输：WebRTC 与 WebSocket 的选择"
  },
  {
    "link": "/4-声音处理：从声学前端到对话轮次",
    "text": "4-声音处理：从声学前端到对话轮次"
  },
  {
    "link": "/5-对话式 AI 的基础链路",
    "text": "5-对话式 AI 的基础链路"
  },
  {
    "link": "/6-对话式 AI 的认知与能力拓展",
    "text": "6-对话式 AI 的认知与能力拓展"
  },
  {
    "link": "/7-SIP 电话系统",
    "text": "7-SIP 电话系统"
  },
  {
    "link": "/8-Conversational AI 的评估",
    "text": "8-Conversational AI 的评估"
  },
  {
    "link": "/9-具体场景拆解",
    "text": "9-具体场景拆解"
  }
];

export default sidebar;