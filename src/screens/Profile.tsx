import { useNav } from '../App';
import { User, Globe, Phone, Bell, ShieldCheck, FileText, Info, Activity, ChevronRight, GraduationCap } from 'lucide-react';

export function ProfileScreen() {
  const { push, reset } = useNav();

  return (
    <div className="p-6 pt-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800">我的</h1>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">匿名用户</h2>
          <p className="text-sm text-slate-400">UID: 88294021</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl p-6 text-white shadow-lg shadow-blue-200 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <span className="text-blue-50 font-medium">会员状态</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">已激活</span>
        </div>
        
        <h2 className="text-2xl font-bold mb-1 relative z-10">有效期限至: 2026-04-01</h2>
        <p className="text-blue-100 text-sm mb-6 relative z-10">如需协助，请联系中文支持</p>
        
        <button className="w-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md text-white rounded-full py-3 font-medium mb-4 relative z-10">
          联系中文支持
        </button>
        
        <button 
          onClick={() => push({ id: 'benefits' })}
          className="text-sm text-blue-100 flex items-center gap-1 hover:text-white transition-colors relative z-10"
        >
          查看权益 <ChevronRight size={14} />
        </button>
      </div>

      <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-3 uppercase ml-2">基础设置</h3>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <SettingItem icon={<Globe />} label="语言设置" value="简体中文" />
        <SettingItem icon={<Phone />} label="联系方式" />
        <SettingItem icon={<Bell />} label="消息提醒开关" isToggle={true} />
        <SettingItem icon={<GraduationCap />} label="学业文件" onClick={() => push({ id: 'academic-docs' })} />
      </div>

      <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-3 uppercase ml-2">协议说明</h3>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <SettingItem icon={<ShieldCheck />} label="隐私政策" />
        <SettingItem icon={<FileText />} label="用户服务协议" />
        <SettingItem icon={<Info />} label="关于我们" onClick={() => push({ id: 'about' })} />
        <SettingItem icon={<Activity />} label="版本号" value="v2.4.0" hideArrow />
      </div>

      <button 
        onClick={() => reset({ id: 'login' })}
        className="w-full bg-red-50 text-red-500 rounded-full py-4 font-medium flex items-center justify-center gap-2 active:bg-red-100 transition-colors mb-8"
      >
        退出登录
      </button>
    </div>
  );
}

function SettingItem({ icon, label, value, isToggle, hideArrow, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="w-full p-4 flex items-center gap-4 border-b border-slate-50 last:border-0 text-left active:bg-slate-50 transition-colors"
    >
      <div className="text-blue-500 shrink-0">
        {icon}
      </div>
      <span className="flex-1 text-sm font-medium text-slate-700">{label}</span>
      {value && <span className="text-sm text-slate-400">{value}</span>}
      {isToggle && (
        <div className="w-12 h-6 bg-blue-500 rounded-full relative">
          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
        </div>
      )}
      {!isToggle && !hideArrow && <ChevronRight size={18} className="text-slate-300" />}
    </button>
  );
}
