import { useMemo, useState } from 'react';
import { useNav } from '../App';
import { ChevronLeft, CircleAlert, CircleCheck, HeartPulse, MessageCircle } from 'lucide-react';
import { openCustomerSupport } from '../lib/contact';

type Option = { label: string; value: number };
type Question = { id: number; text: string };

const options: Option[] = [
  { label: '完全没有', value: 0 },
  { label: '几天', value: 1 },
  { label: '一半以上天数', value: 2 },
  { label: '几乎每天', value: 3 },
];

const questions: Question[] = [
  { id: 1, text: '做事时提不起劲或没有兴趣' },
  { id: 2, text: '感到心情低落、沮丧或绝望' },
  { id: 3, text: '入睡困难、睡不安稳或睡眠过多' },
  { id: 4, text: '感到疲倦或没有活力' },
  { id: 5, text: '食欲不振或吃太多' },
  { id: 6, text: '觉得自己很糟，或觉得自己很失败，或让自己或家人失望' },
  { id: 7, text: '对事物专注有困难，如阅读报纸或看电视时' },
  { id: 8, text: '动作或说话速度变慢，或烦躁到无法坐定' },
  { id: 9, text: '有过“不如死掉或伤害自己”的想法' },
];

function getSeverity(score: number) {
  if (score <= 4) return { label: '最小程度', color: 'text-green-600', desc: '当前情绪波动较轻，建议保持规律作息并持续观察。' };
  if (score <= 9) return { label: '轻度', color: 'text-lime-600', desc: '建议进行压力管理与睡眠调整，1-2周后复测。' };
  if (score <= 14) return { label: '中度', color: 'text-amber-600', desc: '建议尽快与心理支持团队沟通，评估是否需要进一步干预。' };
  if (score <= 19) return { label: '中重度', color: 'text-orange-600', desc: '建议在 24-72 小时内安排专业心理咨询。' };
  return { label: '重度', color: 'text-red-600', desc: '建议立即联系专业人员进行评估，并确保有人陪伴。' };
}

export function MentalAssessment() {
  const { pop, push } = useNav();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState('');

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const totalScore = useMemo(() => questions.reduce((sum, question) => sum + (answers[question.id] ?? 0), 0), [answers]);
  const severity = useMemo(() => getSeverity(totalScore), [totalScore]);
  const hasSelfHarmSignal = (answers[9] || 0) > 0;
  const shouldBookCounselor = totalScore >= 10 || hasSelfHarmSignal;

  const updateAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-hidden">
      <div className="pt-12 pb-4 px-6 bg-white flex items-center sticky top-0 z-10 shadow-sm">
        <button onClick={pop} className="p-2 -ml-2 text-slate-800 active:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold ml-2">心理健康测评（PHQ-9）</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-28 space-y-4">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <div className="flex items-start gap-2">
            <HeartPulse size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-800">过去两周内，你被以下问题困扰的频率如何？</p>
              <p className="text-xs text-blue-700 mt-1">本测评为标准 PHQ-9 量表，用于抑郁风险初筛，不替代医生诊断。</p>
            </div>
          </div>
        </div>

        {notice && <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">{notice}</div>}

        {questions.map(question => (
          <div key={question.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-800 mb-3">{question.id}. {question.text}</p>
            <div className="grid grid-cols-2 gap-2">
              {options.map(option => {
                const selected = answers[question.id] === option.value;
                return (
                  <button
                    key={option.label}
                    onClick={() => updateAnswer(question.id, option.value)}
                    className={`text-xs py-2.5 px-2 rounded-xl border transition-colors ${
                      selected ? 'bg-blue-500 text-white border-blue-500' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {submitted && (
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">总分</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{totalScore}</p>
                <p className="text-xs text-slate-400 mt-1">已作答 {answeredCount}/{questions.length} 题</p>
              </div>
              <span className={`text-sm font-bold ${severity.color}`}>{severity.label}</span>
            </div>
            <p className="text-sm text-slate-700 mt-3 leading-relaxed">{severity.desc}</p>
            <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
              结果说明：本评估基于 PHQ-9 量表，仅供参考，不能替代临床诊断。
            </div>

            {hasSelfHarmSignal && (
              <div className="mt-3 bg-red-50 border border-red-100 rounded-xl p-3 text-sm text-red-700">
                <div className="flex items-center gap-1 font-semibold">
                  <CircleAlert size={14} />
                  风险提醒
                </div>
                <p className="mt-1">检测到第9题有阳性信号。请立即联系专业支持，若存在现实危险请直接拨打 999。</p>
              </div>
            )}

            <div className="mt-4 grid grid-cols-1 gap-2">
              {shouldBookCounselor ? (
                <button
                  onClick={() => push({ id: 'booking', title: '心理咨询师预约' })}
                  className="w-full bg-blue-500 text-white rounded-xl py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle size={14} />
                  安排心理咨询师
                </button>
              ) : (
                <button
                  onClick={() => {
                    openCustomerSupport();
                  }}
                  className="w-full bg-blue-500 text-white rounded-xl py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle size={14} />
                  联系心理支持
                </button>
              )}
              <button
                onClick={() => setSubmitted(false)}
                className="w-full bg-slate-100 text-slate-700 rounded-xl py-2.5 text-sm font-semibold"
              >
                重新测评
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100">
        <button
          onClick={() => {
            if (answeredCount !== questions.length) {
              setNotice('你还有未作答题目，系统已按“完全没有”先生成参考结果，可补充后重新测评。');
              window.setTimeout(() => setNotice(''), 1800);
            }
            setSubmitted(true);
          }}
          className="w-full rounded-2xl py-3.5 font-semibold text-sm transition-colors bg-blue-500 text-white active:bg-blue-600"
        >
          生成测评结果（{answeredCount}/{questions.length}）
        </button>
        <p className="text-[11px] text-slate-400 text-center mt-2 inline-flex items-center justify-center w-full gap-1">
          <CircleCheck size={12} />
          评估结果仅供参考，不替代专业医疗诊断
        </p>
      </div>
    </div>
  );
}
