import { Home, MessageSquare, User } from 'lucide-react';
import { HomeScreen } from './Home';
import { AIAssistantScreen } from './AIAssistant';
import { ProfileScreen } from './Profile';

export function MainTabs({ activeTab, setActiveTab }: { activeTab: 'home' | 'ai' | 'profile', setActiveTab: (tab: 'home' | 'ai' | 'profile') => void }) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative">
      <div className="flex-1 overflow-y-auto pb-[70px]">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'ai' && <AIAssistantScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </div>
      
      {/* Bottom Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 pt-2 pb-2 px-6 flex justify-between items-center z-40 h-[60px]">
        <TabItem icon={<Home />} label="主页" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <TabItem icon={<MessageSquare />} label="AI助手" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} />
        <TabItem icon={<User />} label="我的" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </div>
    </div>
  );
}

function TabItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 w-16 transition-colors ${active ? 'text-blue-500' : 'text-slate-400'}`}>
      <div className={`${active ? 'scale-110' : 'scale-100'} transition-transform duration-200`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
