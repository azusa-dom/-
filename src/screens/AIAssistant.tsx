import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, Bot, ChevronRight, LoaderCircle, Send, Sparkles } from 'lucide-react';
import { useNav } from '../App';
import { useDemoData } from '../context/DemoDataContext';
import { generateAssistantReply, type AssistantAction, type AssistantIntent } from '../lib/aiAssistantEngine';
import { isLiveAssistantEnabled, requestLiveAssistantReply, type LiveActionType } from '../lib/liveAssistant';

type Role = 'bot' | 'user';

interface ChatMessage {
  id: string;
  role: Role;
  text: string;
  time: string;
  urgency?: 'normal' | 'urgent';
  action?: AssistantAction;
}

const defaultPrompts = ['如何预约 GP?', '什么是 Sick Note?', '紧急情况拨打什么电话?', '我的会员权益有哪些?'];
const thinkingTips = ['正在分析问题...', '正在生成建议...', '正在匹配服务路径...'];

function nowLabel() {
  return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

function inferAction(question: string): AssistantAction | undefined {
  const input = question.toLowerCase();
  if (/紧急|999|111|急诊|呼吸困难|胸痛/.test(input)) {
    return { type: 'open-booking', label: '发起紧急支持', payload: '紧急支持 (24小时)' };
  }
  if (/心理|焦虑|抑郁|失眠|情绪/.test(input)) {
    return { type: 'open-mental-assessment', label: '开始心理测评' };
  }
  if (/病假|sick|fit note|证明/.test(input)) {
    return { type: 'open-booking', label: '申请病假条', payload: '申请病假条' };
  }
  if (/gp|注册|建档|看医生|门诊/.test(input)) {
    return { type: 'open-booking', label: '发起就诊申请', payload: '找医生与科室' };
  }
  if (/费用|多少钱|价格|权益/.test(input)) {
    return { type: 'open-faq', label: '查看常见问题' };
  }
  return undefined;
}

function mapLiveAction(type: LiveActionType, label?: string, payload?: string): AssistantAction | undefined {
  if (type === 'booking') {
    return {
      type: 'open-booking',
      label: label || '发起服务申请',
      payload: payload || '找医生与科室',
    };
  }
  if (type === 'mental-assessment') {
    return {
      type: 'open-mental-assessment',
      label: label || '开始心理测评',
    };
  }
  if (type === 'medical-guide') {
    return {
      type: 'open-medical-guide',
      label: label || '查看就医指南',
    };
  }
  if (type === 'faq') {
    return {
      type: 'open-faq',
      label: label || '查看常见问题',
    };
  }
  if (type === 'academic-docs') {
    return {
      type: 'open-academic-docs',
      label: label || '查看学业文件',
    };
  }
  return undefined;
}

export function AIAssistantScreen() {
  const { push } = useNav();
  const { membershipExpiry, serviceRequests, documentRecords } = useDemoData();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'bot',
      text:
        `您好，我是云途护航 AI 助手。\n当前账号会员有效期至 ${membershipExpiry}。\n您可以直接告诉我：预约 GP、申请病假条、查看进度、紧急就医等具体需求。`,
      time: nowLabel(),
      urgency: 'normal',
    },
  ]);
  const [input, setInput] = useState('');
  const [smartPrompts, setSmartPrompts] = useState<string[]>(defaultPrompts);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingText, setThinkingText] = useState(thinkingTips[0]);
  const [lastIntent, setLastIntent] = useState<AssistantIntent | undefined>(undefined);
  const liveMode = isLiveAssistantEnabled();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const assistantContext = useMemo(
    () => ({
      membershipExpiry,
      serviceRequests,
      documentRecords,
    }),
    [membershipExpiry, serviceRequests, documentRecords],
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleAction = (action?: AssistantAction) => {
    if (!action) return;
    if (action.type === 'open-booking') {
      push({ id: 'booking', title: action.payload || '找医生与科室' });
      return;
    }
    if (action.type === 'open-medical-guide') {
      push({ id: 'medical-guide' });
      return;
    }
    if (action.type === 'open-faq') {
      push({ id: 'faq' });
      return;
    }
    if (action.type === 'open-academic-docs') {
      push({ id: 'academic-docs' });
      return;
    }
    if (action.type === 'open-mental-assessment') {
      push({ id: 'mental-assessment' });
    }
  };

  const runAssistant = async (question: string) => {
    const tip = thinkingTips[Math.floor(Math.random() * thinkingTips.length)];
    setThinkingText(tip);
    setIsThinking(true);

    const liveReply = await requestLiveAssistantReply({
      input: question,
      context: assistantContext,
      history: messages.map(item => ({
        role: item.role === 'bot' ? 'assistant' : 'user',
        text: item.text,
      })),
    });

    if (liveReply) {
      const liveAction = mapLiveAction(liveReply.action.type, liveReply.action.label, liveReply.action.payload);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: liveReply.text,
          time: nowLabel(),
          urgency: liveReply.urgency,
          action: liveAction || inferAction(question),
        },
      ]);
      setSmartPrompts(liveReply.followUps.length ? liveReply.followUps : defaultPrompts);
      setIsThinking(false);
      return;
    }

    window.setTimeout(() => {
      const reply = generateAssistantReply({
        input: question,
        context: assistantContext,
        lastIntent,
      });

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: reply.text,
          time: nowLabel(),
          urgency: reply.urgency,
          action: reply.action,
        },
      ]);
      setSmartPrompts(reply.followUps.slice(0, 4));
      setLastIntent(reply.intent);
      setIsThinking(false);
    }, 700 + Math.floor(Math.random() * 700));
  };

  const handleSend = (text: string = input) => {
    const question = text.trim();
    if (!question || isThinking) return;

    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: 'user',
        text: question,
        time: nowLabel(),
      },
    ]);
    setInput('');
    runAssistant(question);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative">
      <div className="pt-12 pb-4 px-6 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-blue-500" />
          <h1 className="text-lg font-bold text-slate-800">AI 智能助手</h1>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">{liveMode ? '实时 AI 已连接' : '智能模式（未配置实时模型）'}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 pb-36">
        {messages.map(message => (
          <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {message.role === 'bot' && (
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Bot size={18} />
              </div>
            )}

            <div className="max-w-[82%]">
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm border whitespace-pre-line ${
                  message.role === 'bot'
                    ? message.urgency === 'urgent'
                      ? 'bg-red-50 border-red-100 text-red-700 rounded-tl-none'
                      : 'bg-white border-slate-100 text-slate-700 rounded-tl-none'
                    : 'bg-blue-500 border-blue-400 text-white rounded-tr-none'
                }`}
              >
                {message.urgency === 'urgent' && message.role === 'bot' && (
                  <div className="mb-2 flex items-center gap-1 text-[11px] font-semibold">
                    <AlertTriangle size={14} />
                    紧急分级提醒
                  </div>
                )}
                {message.text}
              </div>

              <div className={`mt-1 text-[10px] text-slate-400 ${message.role === 'user' ? 'text-right' : ''}`}>
                {message.time}
              </div>

              {message.role === 'bot' && message.action && (
                <button
                  onClick={() => handleAction(message.action)}
                  className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  {message.action.label}
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <LoaderCircle size={18} className="animate-spin" />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-none bg-white border border-slate-100 text-sm text-slate-500 shadow-sm">
              {thinkingText}
            </div>
          </div>
        )}

        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">猜你想问</p>
          <div className="flex flex-wrap gap-2">
            {smartPrompts.map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={isThinking}
                className="bg-white border border-slate-200 px-4 py-2 rounded-full text-xs text-slate-600 hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center gap-1 text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {prompt}
                <ChevronRight size={12} />
              </button>
            ))}
          </div>
        </div>

        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 pb-safe z-20">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={event => setInput(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="直接输入具体场景，例如：我明天发烧能否申请 Sick Note？"
            className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isThinking}
            className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 active:scale-90 transition-transform disabled:bg-blue-200 disabled:cursor-not-allowed"
          >
            <Send size={14} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
