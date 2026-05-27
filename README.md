# Metamoverse Construction Cost Simulation

建築材料ブロックを設置したときに、1 ブロック = 1m3 として建築コストをスコアボードへ計上する Bedrock アドオンです。

## 構成

- `behavior_packs/ConstructionCostSimulation_BP`: スコアボードとブロック設置イベントの処理
- `resource_packs/ConstructionCostSimulation_RP`: 依存関係用の最小リソースパック
- `docs/block_price_rationale.md`: ブロック単価と根拠

## 主な挙動

- コンクリートブロックを設置すると、1m3 あたり 24,050 円を `BuildCost` に加算します。
- 対象ブロックを設置するたびに `BuildLast` に直近単価、`BuildBlocks` に計上数を保存します。
- 明示単価のないブロックも、素材カテゴリまたは `その他` として必ず計上します。
