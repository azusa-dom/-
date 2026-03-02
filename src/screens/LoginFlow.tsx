import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNav } from '../App';
import { Check, X, ChevronRight } from 'lucide-react';

export function LoginFlow({ step }: { step: 'login' | 'bind-phone' | 'invite-code' }) {
  const { push, reset } = useNav();
  const [agreed, setAgreed] = useState(false);

  if (step === 'login') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white relative">
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <img src="/logo.png" alt="云途护航 Logo" className="w-24 h-24 object-contain mb-6" onError={(e) => {
            // Fallback if logo.png is not found
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="%233B82F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a9 9 0 1 0-11-15.6M17.5 19a9 9 0 1 1-11-15.6M17.5 19A9 9 0 0 0 12 21a9 9 0 0 0 5.5-2M6.5 3.4A9 9 0 0 1 12 3a9 9 0 0 1 5.5.4"/></svg>';
          }} />
          <h1 className="text-2xl font-bold text-blue-600 mb-16 tracking-wider">云途护航</h1>
          
          <div className="mb-10 text-center">
            <div className="text-3xl font-bold text-slate-800 mb-2 tracking-widest">131 **** 6666</div>
            <div className="text-xs text-slate-400">中国联通 提供认证服务</div>
          </div>
          
          <button 
            onClick={() => {
              if (!agreed) return alert('请先同意用户协议与隐私政策');
              push({ id: 'invite-code' });
            }}
            className={`w-full py-4 rounded-full text-white font-medium text-lg transition-all ${agreed ? 'bg-blue-500 active:bg-blue-600 shadow-md shadow-blue-200' : 'bg-blue-300 cursor-not-allowed'}`}
          >
            本机号码一键登录
          </button>
          
          <button className="mt-6 text-slate-500 text-sm font-medium hover:text-blue-500 transition-colors">
            其他手机号登录
          </button>
          
          <div className="mt-auto pt-10 flex items-center gap-2 text-xs text-slate-500">
            <button 
              onClick={() => setAgreed(!agreed)}
              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${agreed ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300'}`}
            >
              {agreed && <Check size={10} strokeWidth={3} />}
            </button>
            <span>登录即同意 <span className="text-blue-500">《用户协议》</span> 与 <span className="text-blue-500">《隐私政策》</span></span>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'invite-code') {
    return (
      <div className="flex-1 flex flex-col p-8 bg-slate-50">
        <div className="flex flex-col items-center mt-20 mb-16">
          <img src="/logo.png" alt="云途护航 Logo" className="w-20 h-20 object-contain mb-4" onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="%233B82F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a9 9 0 1 0-11-15.6M17.5 19a9 9 0 1 1-11-15.6M17.5 19A9 9 0 0 0 12 21a9 9 0 0 0 5.5-2M6.5 3.4A9 9 0 0 1 12 3a9 9 0 0 1 5.5.4"/></svg>';
          }} />
          <p className="text-slate-500 text-sm">请输入您的邀请码以继续使用服务</p>
        </div>
        
        <div className="relative mb-8">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="邀请码" 
            className="w-full bg-transparent border-b border-slate-200 pl-8 py-3 focus:outline-none focus:border-blue-500 transition-colors text-lg"
          />
        </div>
        
        <button 
          onClick={() => reset({ id: 'main' })}
          className="w-full bg-blue-500 text-white rounded-full py-4 font-medium text-lg shadow-md shadow-blue-200 active:bg-blue-600 transition-colors"
        >
          确定
        </button>
        
        <div className="mt-auto flex flex-col items-center gap-4 pb-8">
          <span className="text-xs text-slate-400">还没有邀请码？</span>
          <button className="text-blue-500 text-sm font-medium flex items-center gap-1">
            来看看我们的产品 <ChevronRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
