import { useState } from 'react';
import { useNav } from '../App';
import { ChevronLeft, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';

export function BookingDemo({ title }: { title: string }) {
  const { pop } = useNav();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col bg-white h-full items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">预约申请已提交</h2>
        <p className="text-slate-500 mb-8">我们的服务团队将尽快与您联系确认具体安排。</p>
        <button 
          onClick={pop}
          className="w-full max-w-xs bg-slate-100 text-slate-800 rounded-full py-4 font-medium active:bg-slate-200 transition-colors"
        >
          返回
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-hidden">
      <div className="pt-12 pb-4 px-6 bg-white flex items-center sticky top-0 z-10 shadow-sm">
        <button onClick={pop} className="p-2 -ml-2 text-slate-800 active:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold ml-2">{title}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CalendarIcon size={18} className="text-blue-500" />
            选择期望日期
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`py-3 rounded-xl flex flex-col items-center justify-center border transition-colors ${
                  selectedDate === day 
                    ? 'bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-200' 
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-blue-200'
                }`}
              >
                <span className="text-[10px] opacity-80 mb-1">4月</span>
                <span className="font-bold text-lg">{day + 10}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-blue-500" />
            选择期望时间段
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'].map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 rounded-xl text-sm font-medium border transition-colors ${
                  selectedTime === time 
                    ? 'bg-blue-50 border-blue-500 text-blue-600' 
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-blue-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
          <h2 className="font-bold text-slate-800 mb-4">补充说明 (选填)</h2>
          <textarea 
            placeholder="请简要描述您的需求或症状..."
            className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[100px] resize-none"
          ></textarea>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 pb-safe">
        <button 
          onClick={() => setSubmitted(true)}
          disabled={!selectedDate || !selectedTime}
          className={`w-full py-4 rounded-full font-medium text-lg transition-all ${
            selectedDate && selectedTime 
              ? 'bg-blue-500 text-white shadow-md shadow-blue-200 active:bg-blue-600' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          提交预约
        </button>
      </div>
    </div>
  );
}
