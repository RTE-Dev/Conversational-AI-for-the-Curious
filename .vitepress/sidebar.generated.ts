import { type DefaultTheme } from 'vitepress';

type Sidebar = DefaultTheme.Config['sidebar'];

const sidebar: Sidebar = [
  {
    "link": "/",
    "text": "1.我们为何撰写本手册"
  },
  {
    "link": "/2-architecture-orchestration",
    "text": "2. Conversational AI 的架构与编排"
  },
  {
    "link": "/3-realtime-transport",
    "text": "3.实时传输：WebRTC 与 WebSocket 的选择"
  },
  {
    "link": "/4-audio-processing",
    "text": "4. 声音处理：从声学前端到对话轮次"
  },
  {
    "link": "/5-conversational-ai-pipeline",
    "text": "5. 对话式 AI 的基础链路"
  },
  {
    "link": "/6-capability-extensions",
    "text": "6. 对话式 AI 的认知与能力拓展"
  },
  {
    "link": "/7-sip-systems",
    "text": "7. SIP 电话系统"
  },
  {
    "link": "/8-evals",
    "text": "8. Conversational AI 的评估"
  }
];

export default sidebar;