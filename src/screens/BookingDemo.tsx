import { useMemo, useState } from 'react';
import { useNav } from '../App';
import { useDemoData, type ServiceRequest } from '../context/DemoDataContext';
import { ChevronLeft, Calendar as CalendarIcon, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

function createUpcomingDates(days = 8) {
  const labels = ['日', '一', '二', '三', '四', '五', '六'];
  const options: Array<{ value: string; month: string; day: string; week: string }> = [];
  const toLocalDateKey = (value: Date) => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  for (let i = 1; i <= days; i += 1) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    options.push({
      value: toLocalDateKey(date),
      month: `${date.getMonth() + 1}月`,
      day: String(date.getDate()),
      week: `周${labels[date.getDay()]}`,
    });
  }

  return options;
}

export function BookingDemo({ title }: { title: string }) {
  const { pop, push } = useNav();
  const { createServiceRequest } = useDemoData();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [submittedRequest, setSubmittedRequest] = useState<ServiceRequest | null>(null);

  const isEmergency = /紧急|urgent/i.test(title);
  const dateOptions = useMemo(() => createUpcomingDates(8), []);
  const timeOptions = isEmergency
    ? ['立即回呼', '30 分钟内回呼', '1 小时内回呼', '2 小时内回呼']
    : ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'];

  if (submittedRequest) {
    return (
      <div className="flex-1 flex flex-col bg-white h-full items-center justify-center p-6 text-center">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
            isEmergency ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
          }`}
        >
          {isEmergency ? <AlertTriangle size={36} /> : <CheckCircle2 size={40} />}
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{isEmergency ? '紧急支持已发起' : '预约申请已提交'}</h2>
        <p className="text-slate-500 mb-2">
          申请编号：<span className="font-semibold text-slate-700">{submittedRequest.requestNo}</span>
        </p>
        <p className="text-slate-500 mb-8">
          {isEmergency ? '客服将按你选择的时段优先回呼。' : '服务团队将尽快联系你确认具体安排。'}
        </p>

        <div className="w-full max-w-xs space-y-3">
          {/病假|sick|note/i.test(title) && (
            <button
              onClick={() => push({ id: 'academic-docs' })}
              className="w-full bg-blue-500 text-white rounded-full py-3 font-medium active:bg-blue-600 transition-colors"
            >
              查看学业文件进度
            </button>
          )}
          <button
            onClick={pop}
            className="w-full bg-slate-100 text-slate-800 rounded-full py-3 font-medium active:bg-slate-200 transition-colors"
          >
            返回
          </button>
        </div>
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
        {isEmergency && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 text-red-700 text-sm leading-relaxed">
            若出现危及生命症状（胸痛、呼吸困难、意识丧失），请立即拨打 999。当前表单用于非致命但需快速支持的情况。
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CalendarIcon size={18} className="text-blue-500" />
            选择期望日期
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {dateOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setSelectedDate(option.value)}
                className={`py-3 rounded-xl flex flex-col items-center justify-center border transition-colors ${
                  selectedDate === option.value
                    ? 'bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-200'
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-blue-200'
                }`}
              >
                <span className="text-[10px] opacity-80 mb-1">{option.month}</span>
                <span className="font-bold text-lg leading-none">{option.day}</span>
                <span className="text-[10px] mt-1 opacity-80">{option.week}</span>
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
            {timeOptions.map(time => (
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
          <h2 className="font-bold text-slate-800 mb-4">补充说明（选填）</h2>
          <textarea
            value={note}
            onChange={event => setNote(event.target.value)}
            placeholder="请简要描述您的需求、症状开始时间、是否影响上课/考试等信息..."
            className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[100px] resize-none"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 pb-safe">
        <button
          onClick={() => {
            if (!selectedDate || !selectedTime) return;
            const request = createServiceRequest({
              title,
              preferredDate: selectedDate,
              preferredTime: selectedTime,
              note,
            });
            setSubmittedRequest(request);
          }}
          disabled={!selectedDate || !selectedTime}
          className={`w-full py-4 rounded-full font-medium text-lg transition-all ${
            selectedDate && selectedTime
              ? 'bg-blue-500 text-white shadow-md shadow-blue-200 active:bg-blue-600'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          提交申请
        </button>
      </div>
    </div>
  );
}
