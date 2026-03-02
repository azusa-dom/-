import { useNav } from '../App';
import { ChevronLeft, Stethoscope, FileText, Heart, GraduationCap, AlertCircle, GitMerge, MessageCircle, Search, ClipboardCheck, PhoneCall, ChevronRight } from 'lucide-react';

export function ServicePortal() {
  const { pop, push } = useNav();

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-hidden">
      <div className="pt-12 pb-4 px-6 bg-white flex items-center sticky top-0 z-10 shadow-sm">
        <button onClick={pop} className="p-2 -ml-2 text-slate-800 active:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold ml-2">服务入口</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <div className="space-y-4 mb-8">
          {/* 1. 找医生与科室 */}
          <button 
            onClick={() => push({ id: 'booking', title: '找医生与科室' })}
            className="w-full bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <Search size={24} />
            </div>
            <div className="text-left flex-1">
              <h4 className="font-bold text-slate-800">找医生与科室</h4>
              <p className="text-xs text-slate-400">对接全英优质医疗资源与专家</p>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </button>

          {/* 2. GP 注册与建档 */}
          <button 
            onClick={() => push({ id: 'booking', title: 'GP 注册与建档' })}
            className="w-full bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <ClipboardCheck size={24} />
            </div>
            <div className="text-left flex-1">
              <h4 className="font-bold text-slate-800">GP 注册与建档</h4>
              <p className="text-xs text-slate-400">协助完成 NHS 注册与医疗档案建立</p>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </button>

          {/* 3. 心理支持 */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 pb-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                <Heart size={18} />
              </div>
              <h4 className="font-bold text-slate-800">心理支持</h4>
            </div>
            <div className="grid grid-cols-2 gap-px bg-slate-50">
              <button 
                onClick={() => push({ id: 'booking', title: '心理在线评估' })}
                className="bg-white p-4 flex flex-col items-center gap-2 active:bg-slate-50 transition-colors"
              >
                <span className="text-sm font-bold text-slate-700">在线评估</span>
                <span className="text-[10px] text-slate-400">情绪与压力快速测评</span>
              </button>
              <button 
                onClick={() => push({ id: 'booking', title: '心理预约支持' })}
                className="bg-white p-4 flex flex-col items-center gap-2 active:bg-slate-50 transition-colors"
              >
                <span className="text-sm font-bold text-slate-700">预约支持</span>
                <span className="text-[10px] text-slate-400">专业心理咨询预约</span>
              </button>
            </div>
          </div>

          {/* 4. 学业文件 */}
          <button 
            onClick={() => push({ id: 'academic-docs' })}
            className="w-full bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <GraduationCap size={24} />
            </div>
            <div className="text-left flex-1">
              <h4 className="font-bold text-slate-800">学业文件</h4>
              <p className="text-xs text-slate-400">申请病假条 (Sick Note)</p>
            </div>
            <span className="bg-blue-500 text-white text-[10px] px-3 py-1.5 rounded-full font-bold">申请病假条</span>
          </button>

          {/* 5. 紧急支持 (24小时) */}
          <button 
            className="w-full bg-red-50 p-5 rounded-3xl shadow-sm border border-red-100 flex items-center gap-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-200">
              <AlertCircle size={24} />
            </div>
            <div className="text-left flex-1">
              <h4 className="font-bold text-red-600">紧急支持 (24小时)</h4>
              <p className="text-xs text-red-400">突发急症、需立即响应的医疗需求</p>
            </div>
            <PhoneCall size={20} className="text-red-300" />
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <GitMerge className="text-blue-500" size={20} />
            <h2 className="font-bold text-slate-800">服务发起流程</h2>
          </div>

          <div className="relative pl-4 space-y-6">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-blue-100"></div>
            
            <ProcessStep num={1} title="选择服务类型" desc="通过上方入口选择您需要的服务模块" />
            <ProcessStep num={2} title="提交基本需求" desc="填写相关信息或直接联系客服说明情况" />
            <ProcessStep num={3} title="客服确认与分诊" desc="服务团队评估情况并对接相应资源" />
            <ProcessStep num={4} title="协助安排后续服务" desc="提供具体协助，如预约、陪同或出具文件" />
          </div>
        </div>

        <button className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors text-white rounded-full py-4 font-medium flex items-center justify-center gap-2 shadow-md shadow-blue-200">
          <MessageCircle size={20} />
          联系服务团队
        </button>
      </div>
    </div>
  );
}

function ProcessStep({ num, title, desc }: any) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-[-13px] top-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold border-4 border-white">
        {num}
      </div>
      <h4 className="font-bold text-slate-800 text-sm mb-1">{title}</h4>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  );
}
