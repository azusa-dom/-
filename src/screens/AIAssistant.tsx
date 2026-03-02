import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, ChevronRight } from 'lucide-react';

export function AIAssistantScreen() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: '您好！我是云途护航AI助手。您可以向我询问关于英国就医流程、常见疾病应对、或者我们的服务内容。请问有什么我可以帮您的吗？' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "如何预约 GP?",
    "什么是 Sick Note?",
    "紧急情况拨打什么电话?",
    "我的会员权益有哪些?"
  ];

  const answers: Record<string, string> = {
    "如何预约 GP?": "预约GP通常有以下几种方式：\n1. 电话预约：直接拨打您注册的GP诊所电话。\n2. 在线预约：通过诊所官网或NHS App进行预约。\n3. 现场预约：直接前往诊所前台预约。\n如果您是我们的会员，我们可以协助您完成预约流程。",
    "什么是 Sick Note?": "Sick Note（病假条），现在正式名称为 'Fit Note'。如果您生病超过7天（包括非工作日），您需要提供医生开具的Fit Note给您的雇主或学校。前7天通常可以自我认证（Self-certification）。",
    "紧急情况拨打什么电话?": "在英国，遇到紧急情况请拨打以下电话：\n- 999：适用于危及生命的紧急情况（如严重出血、心脏病发作、呼吸困难等）。\n- 111：适用于非紧急但需要医疗建议的情况。\n如果您是我们的会员，也可以随时联系我们的24小时中文支持热线。",
    "我的会员权益有哪些?": "作为云途护航的会员，您享有以下核心权益：\n1. 24/7 中英文双语医疗咨询\n2. 协助NHS GP注册及预约\n3. 心理健康在线评估与支持\n4. 学业相关医疗文件（如Sick Note）开具协助\n5. 紧急情况下的就医指导与陪同（视套餐而定）"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      const responseText = answers[text] || '这是一个演示版本的AI助手。在正式版本中，我将为您提供基于英国医疗指南的专业建议。';
      setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative">
      <div className="pt-12 pb-4 px-6 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={18} className="text-blue-500" />
          <h1 className="text-xl font-bold text-slate-800">AI 智能助手</h1>
        </div>
        <p className="text-xs text-slate-500">24小时在线为您解答医疗疑问</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 pb-32">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'bot' && (
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Bot size={18} />
              </div>
            )}
            <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[80%] shadow-sm border whitespace-pre-line ${
              msg.role === 'bot' 
                ? 'bg-white rounded-tl-none border-slate-100 text-slate-700' 
                : 'bg-blue-500 rounded-tr-none border-blue-400 text-white'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {messages.length === 1 && (
          <div className="mt-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">猜你想问</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(q)}
                  className="bg-white border border-slate-200 px-4 py-2 rounded-full text-xs text-slate-600 hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center gap-1 text-left"
                >
                  {q} <ChevronRight size={12} />
                </button>
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 pb-safe z-20">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入您的问题..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2"
          />
          <button 
            onClick={() => handleSend()}
            className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 active:scale-90 transition-transform"
          >
            <Send size={14} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
