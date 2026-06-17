# Construction Cost Simulation

建築材料ブロックを設置したときに、1 ブロック = 1m3 として建築コストをスコアボードへ計上する Bedrock アドオンです。

## 構成

- `behavior_packs/ConstructionCostSimulation_BP`: スコアボードとブロック設置イベントの処理
- `resource_packs/ConstructionCostSimulation_RP`: 依存関係用の最小リソースパック
- `docs/block_price_rationale.md`: ブロック単価と根拠

## 主な挙動

- コンクリートブロックを設置すると、1m3 あたり 24,050 円を `BuildMaterial` に加算します。
- `BuildCostBoard` には、表示用に `概算建設費`、`土地取得価格`、`合計金額` の3行だけを千円単位で保存します。
- `概算建設費` は、内部で計算したブロック費用を 4 倍した値として表示します。
- 土地取得価格は `scripts/config/landCost.js` の静的値で設定します。
- 明示単価のないブロックも、素材カテゴリまたは `その他` として必ず計上します。
