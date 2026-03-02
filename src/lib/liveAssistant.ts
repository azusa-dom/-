import type { AssistantContextData } from './aiAssistantEngine';

export type LiveActionType = 'none' | 'booking' | 'mental-assessment' | 'medical-guide' | 'faq' | 'academic-docs';

interface LiveAssistantInput {
  input: string;
  history: Array<{ role: 'user' | 'assistant'; text: string }>;
  context: AssistantContextData;
}

interface RawLiveAction {
  type?: string;
  label?: string;
  payload?: string;
}

export interface LiveAssistantOutput {
  text: string;
  followUps: string[];
  urgency: 'normal' | 'urgent';
  action: {
    type: LiveActionType;
    label?: string;
    payload?: string;
  };
}

interface ChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string | Array<{ type?: string; text?: string }>;
    };
  }>;
}

function resolveActionType(input?: string): LiveActionType {
  if (!input) return 'none';
  const value = input.trim().toLowerCase();
  if (value === 'booking') return 'booking';
  if (value === 'mental-assessment') return 'mental-assessment';
  if (value === 'medical-guide') return 'medical-guide';
  if (value === 'faq') return 'faq';
  if (value === 'academic-docs') return 'academic-docs';
  return 'none';
}

function normalizeAction(raw: RawLiveAction | undefined) {
  return {
    type: resolveActionType(raw?.type),
    label: raw?.label?.trim(),
    payload: raw?.payload?.trim(),
  };
}

function safeJsonParse(value: string): LiveAssistantOutput | null {
  try {
    const parsed = JSON.parse(value) as Partial<LiveAssistantOutput> & { action?: RawLiveAction };
    if (!parsed.text || !Array.isArray(parsed.followUps)) return null;
    return {
      text: parsed.text.trim(),
      followUps: parsed.followUps.slice(0, 4).map(item => String(item).trim()).filter(Boolean),
      urgency: parsed.urgency === 'urgent' ? 'urgent' : 'normal',
      action: normalizeAction(parsed.action),
    };
  } catch {
    return null;
  }
}

function extractJsonBlock(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : '';
}

function readContent(data: ChatCompletionResponse): string {
  const content = data.choices?.[0]?.message?.content;
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content
    .map(chunk => (chunk.type === 'text' ? chunk.text || '' : chunk.text || ''))
    .join('')
    .trim();
}

function getApiConfig() {
  const baseUrl = (import.meta.env.VITE_AI_BASE_URL || 'https://api-inference.modelscope.cn/v1').replace(/\/$/, '');
  const apiKey = import.meta.env.VITE_AI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY;
  const model = import.meta.env.VITE_AI_MODEL || import.meta.env.VITE_OPENAI_MODEL || 'ZhipuAI/GLM-5';
  return { baseUrl, apiKey, model };
}

export function isLiveAssistantEnabled() {
  const { apiKey } = getApiConfig();
  return Boolean(apiKey);
}

export async function requestLiveAssistantReply(params: LiveAssistantInput): Promise<LiveAssistantOutput | null> {
  const { baseUrl, apiKey, model } = getApiConfig();
  if (!apiKey) return null;

  const latestService = [...params.context.serviceRequests].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))[0];
  const latestDoc = [...params.context.documentRecords].sort((a, b) => +new Date(b.appliedAt) - +new Date(a.appliedAt))[0];

  const historyText = params.history
    .slice(-8)
    .map(item => `${item.role === 'assistant' ? '助手' : '用户'}: ${item.text}`)
    .join('\n');

  const contextText = [
    `会员有效期: ${params.context.membershipExpiry}`,
    latestService ? `最近服务: ${latestService.title} (${latestService.requestNo}) 状态=${latestService.status}` : '最近服务: 无',
    latestDoc ? `最近文件: ${latestDoc.title} (${latestDoc.referenceNo}) 状态=${latestDoc.status}` : '最近文件: 无',
  ].join('\n');

  const systemPrompt = `你是“云途护航”医疗助手。你要根据用户问题给出真实可执行建议。
规则：
1) 回答简洁专业，先判断问题性质，再给最多4步行动建议。
2) 涉及危及生命风险时，明确建议立即拨打 999。
3) 如果用户是心理困扰，优先建议完成心理测评并在必要时安排心理咨询师。
4) 严格返回 JSON，不要 Markdown，不要额外解释。

JSON格式：
{
  "text":"对用户的回答",
  "followUps":["后续问题1","后续问题2","后续问题3"],
  "urgency":"normal 或 urgent",
  "action":{
    "type":"none|booking|mental-assessment|medical-guide|faq|academic-docs",
    "label":"按钮文案",
    "payload":"当 type=booking 时可填预约标题，如找医生与科室"
  }
}`;

  const userPrompt = `上下文：
${contextText}

近期对话：
${historyText || '无'}

用户问题：
${params.input}`;

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.35,
        max_tokens: 700,
      }),
    });

    if (!response.ok) return null;

    const data = (await response.json()) as ChatCompletionResponse;
    const outputText = readContent(data);
    if (!outputText) return null;

    const direct = safeJsonParse(outputText);
    if (direct) return direct;

    const block = extractJsonBlock(outputText);
    if (!block) {
      return {
        text: outputText.trim(),
        followUps: ['帮我预约 GP', '我需要申请病假条', '查看我的服务进度'],
        urgency: 'normal',
        action: { type: 'none' },
      };
    }

    return safeJsonParse(block);
  } catch {
    return null;
  }
}
