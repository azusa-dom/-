import { useNav } from '../App';
import { ChevronLeft, FileText, Plus, Clock, CheckCircle2 } from 'lucide-react';

export function AcademicDocs() {
  const { pop, push } = useNav();

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-hidden">
      <div className="pt-12 pb-4 px-6 bg-white flex items-center sticky top-0 z-10 shadow-sm">
        <button onClick={pop} className="p-2 -ml-2 text-slate-800 active:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold ml-2">学业文件</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-200 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
          
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">病假条申请</h2>
              <p className="text-blue-100 text-sm">Sick Note / Medical Certificate</p>
            </div>
          </div>
          
          <p className="text-sm text-blue-50 leading-relaxed mb-6 relative z-10">
            协助开具符合英国学校/大学规范要求的病假证明，用于学业请假、延期考试或缺勤说明。
          </p>
          
          <button 
            onClick={() => push({ id: 'booking', title: '申请病假条' })}
            className="w-full bg-white text-blue-600 hover:bg-blue-50 transition-colors rounded-full py-3 font-bold flex items-center justify-center gap-2 relative z-10 shadow-sm"
          >
            <Plus size={20} />
            立即申请病假条
          </button>
        </div>

        <div className="flex items-center justify-between mb-4 ml-2">
          <h3 className="font-bold text-slate-800">申请记录</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                <span className="font-bold text-slate-800 text-sm">流感病假证明</span>
              </div>
              <span className="bg-green-50 text-green-600 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 size={12} />
                已出具
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">申请日期: 2025-11-12</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-slate-50 text-slate-600 text-xs font-medium py-2 rounded-lg border border-slate-100 active:bg-slate-100 transition-colors">
                查看详情
              </button>
              <button className="flex-1 bg-blue-50 text-blue-600 text-xs font-medium py-2 rounded-lg border border-blue-100 active:bg-blue-100 transition-colors">
                下载 PDF
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 opacity-70">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-slate-400" />
                <span className="font-bold text-slate-600 text-sm">肠胃炎病假证明</span>
              </div>
              <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1">
                <Clock size={12} />
                处理中
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">申请日期: 2026-02-28</p>
            <button className="w-full bg-slate-50 text-slate-500 text-xs font-medium py-2 rounded-lg border border-slate-100 active:bg-slate-100 transition-colors">
              查看进度
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
