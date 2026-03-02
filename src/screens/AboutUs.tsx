import { useNav } from '../App';
import { ChevronLeft, Cloud, CheckCircle2, Award, ShieldCheck, Globe } from 'lucide-react';

export function AboutUs() {
  const { pop } = useNav();

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-hidden">
      <div className="pt-12 pb-4 px-6 bg-blue-500 text-white flex items-center sticky top-0 z-10">
        <button onClick={pop} className="p-2 -ml-2 active:bg-blue-600 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold ml-2">关于云途护航</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="bg-blue-500 text-white p-8 pt-4 pb-12 rounded-b-[40px] shadow-md mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <Cloud size={32} />
            <h2 className="text-3xl font-bold tracking-wider">云途护航</h2>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed relative z-10 max-w-[85%]">
            FCM 专家为在英学生打造的年度医疗会员服务体系，为您建立长期可信赖的医疗档案。
          </p>
        </div>

        <div className="px-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              <h3 className="font-bold text-slate-800">品牌使命</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              云途护航致力于为在英留学生群体提供更专业、更及时的医疗咨询与就医协助。我们整合全英优质医疗资源，消除语言与文化隔阂，让海外求学之路更安心。
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              <h3 className="font-bold text-slate-800">专业资质</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl text-center">
                <Award size={24} className="text-blue-500 mb-2" />
                <span className="text-xs font-bold text-slate-700">Doctify 认证</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl text-center">
                <ShieldCheck size={24} className="text-blue-500 mb-2" />
                <span className="text-xs font-bold text-slate-700">NHS 标准</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl text-center">
                <Globe size={24} className="text-blue-500 mb-2" />
                <span className="text-xs font-bold text-slate-700">GMC 认证</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl text-center">
                <CheckCircle2 size={24} className="text-blue-500 mb-2" />
                <span className="text-xs font-bold text-slate-700">专业分诊</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              <h3 className="font-bold text-slate-800">联系我们</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">官方网站</span>
                <span className="text-sm font-medium text-blue-600">www.fcm-health.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">服务热线</span>
                <span className="text-sm font-medium text-slate-800">+44 (0) 20 1234 5678</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">企业微信</span>
                <span className="text-sm font-medium text-slate-800">云途护航中文支持</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
