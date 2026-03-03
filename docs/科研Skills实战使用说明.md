# 科研 Skills 实战使用说明（从 0 到 1）

这份说明教你如何在当前环境中使用已复刻好的科研技能组合。

## 1. 你现在有哪些可用技能

已可用：
- `literature-search`：文献检索与初筛
- `academic-deep-research`：深度综述与研究空白分析
- `xlsx`：数据分析流程入口
- `canvas-design`：图表与可视化叙事设计
- `academic-writing`：论文结构化初稿
- `writing-assistant`：论文语言与逻辑优化
- `spreadsheet`：官方表格处理技能（`xlsx` 的底层补充）

## 2. 开始前检查（建议 1 分钟）

1. 重启一次 Codex/OpenClaw 客户端（让新技能稳定加载）
2. 确认你的输入材料已准备：
- 文献主题关键词
- 实验/统计数据文件（xlsx/csv/tsv）
- 目标期刊或写作要求（可选）

## 3. 最小可运行示例（先跑通再优化）

按顺序执行：

```bash
task(load_skills=["literature-search"], prompt="搜索近3年炎症因子与心血管风险预测文献，输出Top20并说明筛选标准")
task(load_skills=["academic-deep-research"], prompt="基于上一步文献，做方法对比、争议点总结、研究空白分析")
task(load_skills=["xlsx"], prompt="分析 data.xlsx，输出关键统计结果与可复现计算说明")
task(load_skills=["canvas-design"], prompt="把分析结果设计成投稿图表方案，给出每张图的标题、轴定义、配色与注释")
task(load_skills=["academic-writing"], prompt="生成论文 Results 和 Discussion 初稿，严格区分结果与解释")
task(load_skills=["writing-assistant"], prompt="把初稿润色为投稿级英文，保留原结论，不新增未经证据支持的说法")
```

## 4. “写作组合”到底怎么用

`academic-writing + writing-assistant` 推荐按两步走：

1. 先用 `academic-writing` 搭好论文骨架和完整论证
- 输入：研究问题、关键结果、图表编号、参考文献线索
- 输出：结构完整的章节初稿

2. 再用 `writing-assistant` 做语言升级
- 输入：上一步初稿
- 输出：更清晰、更连贯、更接近期刊语气的版本 + 修改点说明

建议提示词模板：

```text
请基于以下材料生成/优化论文文本：
1) 研究问题：...
2) 核心结果：...
3) 证据来源（图表/表格）：...
4) 约束：不虚构数据；引用不确定处标记 [Citation Needed]
5) 风格：目标期刊风格（如 Nature 子刊 / IEEE / ACS）
```

## 5. 四阶段推荐用法（和你那张图一致）

1. 立项阶段
- 用 `literature-search`
- 目标：快速拿到“可读文献池 + 初筛逻辑”

2. 深研阶段
- 用 `academic-deep-research`
- 目标：形成“共识-争议-空白”三层结论

3. 数据阶段
- 用 `xlsx`（必要时明确要求调用 `spreadsheet` 处理复杂格式）
- 目标：输出可复现的统计结论

4. 论文阶段
- 先 `academic-writing`，后 `writing-assistant`
- 目标：先完成，再优化

## 6. 常见问题与解决

1. 技能不出现
- 先重启客户端
- 再检查技能目录是否存在：`~/.codex/skills/`

2. 输出内容“像对但不严谨”
- 在 prompt 中加入硬约束：
  - “不允许编造数据/引用”
  - “每个结论后附证据来源”
  - “不确定处用 [Evidence Needed] 标记”

3. 数据分析结果不稳定
- 明确要求输出：
  - 清洗规则
  - 计算公式
  - 缺失值处理策略

4. 英文润色后语义被改
- 在 `writing-assistant` prompt 里加：
  - “只优化表达，不改变结论与数值”
  - “对可能改变含义的句子单独标注”

## 7. 你可以直接复制的高质量 Prompt

### 文献检索
```text
请用 literature-search 检索“XXX 主题”近 5 年高相关文献，输出 Top 30，必须包含：
- 检索式
- 筛选标准
- 每篇一句贡献总结
- 与我课题的相关性评分（1-5）
```

### 深度研究
```text
请用 academic-deep-research 基于已有文献做深度综述：
- 共识结论
- 关键争议
- 方法优缺点对照
- 高价值研究空白（至少 3 条）
并给出可执行的下一步实验建议。
```

### 论文初稿
```text
请用 academic-writing 生成 Results + Discussion：
- Results 只陈述客观发现
- Discussion 解释机制并说明局限
- 每段包含“论点-证据”对应关系
- 无证据处标记 [Evidence Needed]
```

### 润色优化
```text
请用 writing-assistant 优化以下段落：
- 保留原结论和数值
- 提升清晰度与逻辑衔接
- 压缩冗余表达
- 输出“优化后文本 + 修改理由清单”
```

## 8. 质量底线（必须人工把关）

你必须人工复核这 4 类内容：
- 数据与统计显著性
- 引文元数据（作者、年份、DOI）
- 图表和正文是否一致
- 结论是否超出证据边界

如果你愿意，我下一步可以再给你一版“按你的研究方向定制”的 prompt 套件（直接替换主题就能用）。
