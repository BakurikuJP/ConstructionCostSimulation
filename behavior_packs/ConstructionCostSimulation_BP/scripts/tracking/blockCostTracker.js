import { world } from '@minecraft/server';
import { getBlockCost } from '../config/blockCosts.js';
import { addConstructionCost } from './costScoreboard.js';

function formatYen(amount) {
    return amount.toLocaleString('ja-JP');
}

function formatReadableYen(amount) {
    if (amount >= 10000) {
        const manYen = amount / 10000;
        return `${manYen.toFixed(manYen >= 10 ? 0 : 1)}万円`;
    }

    return `${formatYen(amount)}円`;
}

export function registerBlockCostTracking() {
    world.afterEvents.playerPlaceBlock.subscribe((event) => {
        const player = event.player;
        const blockCost = getBlockCost(event.block.typeId);

        const result = addConstructionCost(player, blockCost.costYen);

        // player.sendMessage(
        //     `§a${blockCost.label} 1m3: ${formatReadableYen(blockCost.costYen)}を建材費に計上しました。合計: ${formatReadableYen(result.totalCostYen)}`
        // );
    });

    world.afterEvents.playerBreakBlock.subscribe((event) => {
        const player = event.player;
        const blockCost = getBlockCost(event.brokenBlockPermutation.type.id);

        addConstructionCost(player, -blockCost.costYen);
    });
}
