import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNav } from '../App';
import { Shield, Calendar, ChevronRight, MessageCircle, Phone, FileText, Info, X, BookOpen, HelpCircle } from 'lucide-react';
import { Logo } from '../components/Logo';

export function HomeScreen() {
  const { push } = useNav();
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="pt-12 pb-4 px-6 bg-slate-50 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-lg text-slate-800">云途护航</span>
        </div>
      </div>

      <div className="p-6 pt-2">
        <div className="bg-gradient-to-br from-[#7BA4FF] to-[#4A7DFF] rounded-3xl p-6 text-white shadow-lg shadow-blue-200/50 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-blue-50 font-medium">会员状态</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">已激活</span>
          </div>
          
          <h2 className="text-2xl font-bold mb-1 relative z-10">有效期限至: 2026-04-01</h2>
          <p className="text-blue-100 text-sm mb-6 relative z-10">如需协助，请联系中文支持</p>
          
          <button 
            onClick={() => setShowSupport(true)}
            className="w-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md text-white rounded-full py-3 font-medium mb-4 relative z-10"
          >
            联系客服
          </button>
        </div>

        <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-4 uppercase">Quick Actions</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => push({ id: 'benefits' })}
            className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start text-left active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
              <Shield size={20} />
            </div>
            <h4 className="font-bold text-slate-800 mb-1">我的权益</h4>
            <p className="text-[11px] text-slate-400 leading-tight">套餐内容与服务入口</p>
          </button>

          <button 
            onClick={() => push({ id: 'service-portal' })}
            className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start text-left active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
              <Calendar size={20} />
            </div>
            <h4 className="font-bold text-slate-800 mb-1">服务入口</h4>
            <p className="text-[11px] text-slate-400 leading-tight">预约、文件与协助发起</p>
          </button>

          <button 
            onClick={() => push({ id: 'medical-guide' })}
            className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start text-left active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
              <BookOpen size={20} />
            </div>
            <h4 className="font-bold text-slate-800 mb-1">就医指南</h4>
            <p className="text-[11px] text-slate-400 leading-tight">英国NHS体系与流程说明</p>
          </button>

          <button 
            onClick={() => push({ id: 'faq' })}
            className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start text-left active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
              <HelpCircle size={20} />
            </div>
            <h4 className="font-bold text-slate-800 mb-1">常见问题</h4>
            <p className="text-[11px] text-slate-400 leading-tight">快速查找服务相关解答</p>
          </button>
        </div>

        <AnimatePresence>
          {showSupport && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowSupport(false)}
                className="fixed inset-0 bg-black/40 z-50"
              />
              <motion.div 
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-slate-50 rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto pb-safe"
              >
                <div className="p-6">
                  <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
                  
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-bold text-blue-500 tracking-wider uppercase">Support Center</h3>
                    <button onClick={() => setShowSupport(false)} className="p-1 bg-slate-100 rounded-full text-slate-400">
                      <X size={16} />
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">需要协助吗？</h2>
                  <p className="text-slate-500 text-sm mb-6">云途服务团队在这里为您解答</p>

                  <div className="space-y-3 mb-8">
                    <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-[0.98] transition-transform">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                        <MessageCircle size={20} />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-bold text-slate-800">联系在线客服</h4>
                        <p className="text-xs text-slate-400">转到企业微信</p>
                      </div>
                      <ChevronRight size={20} className="text-slate-300" />
                    </button>

                    <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-[0.98] transition-transform">
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                        <Phone size={20} />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-bold text-slate-800">拨打服务热线</h4>
                        <p className="text-xs text-slate-400">转电话客服</p>
                      </div>
                      <ChevronRight size={20} className="text-slate-300" />
                    </button>

                    <button 
                      onClick={() => {
                        setShowSupport(false);
                        push({ id: 'faq' });
                      }}
                      className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-[0.98] transition-transform"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                        <Info size={20} />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-bold text-slate-800">查看常见问题指引</h4>
                        <p className="text-xs text-slate-400">快速查找答案</p>
                      </div>
                      <ChevronRight size={20} className="text-slate-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
