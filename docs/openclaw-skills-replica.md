# OpenClaw 科研 Skills 复刻说明（本机版）

## 1) “写作组合”是什么意思
`academic-writing + writing-assistant` 的本质是两阶段流水线：

1. `academic-writing`：先把论文内容写完整（结构、论点、证据位置）
2. `writing-assistant`：再做语言和逻辑优化（清晰度、连贯性、投稿语气）

对应你看到的“2周 -> 2天”，核心不是“自动生成成稿”，而是把：
- 初稿搭建时间
- 反复润色时间

压缩成一个标准化流程。

## 2) 已完成的本地复刻
我已在 `~/.codex/skills` 下创建并校验通过以下技能：

- `academic-deep-research`
- `literature-search`
- `xlsx`
- `canvas-design`
- `academic-writing`
- `writing-assistant`

此外安装了官方技能：
- `spreadsheet`（作为 `xlsx` 的实现型补充）

## 3) 可直接使用的示例

```bash
task(load_skills=["literature-search"], prompt="搜索近3年炎症因子与心血管风险预测文献，输出Top20")
task(load_skills=["academic-deep-research"], prompt="基于已检索文献做方法对比与研究空白分析")
task(load_skills=["xlsx"], prompt="分析实验数据并输出关键统计结果和表格")
task(load_skills=["canvas-design"], prompt="把分析结果设计成可投稿图表规范")
task(load_skills=["academic-writing"], prompt="生成论文Results和Discussion初稿")
task(load_skills=["writing-assistant"], prompt="将初稿润色为投稿级英文，保留原始结论")
```

## 4) 你这套“阶段推荐”的可运行版本
- 立项：`literature-search`
- 深研：`academic-deep-research`
- 数据：`xlsx`（复杂表格处理时可结合 `spreadsheet`）
- 图表：`canvas-design`
- 论文：`academic-writing + writing-assistant`

## 5) 注意事项
- 关键数据、统计显著性、引文元数据必须人工复核。
- 复刻的是“工作流”，不是“保证结果正确”的黑盒。
- 新安装/新建技能一般需要重启客户端后才会稳定出现在技能列表。
