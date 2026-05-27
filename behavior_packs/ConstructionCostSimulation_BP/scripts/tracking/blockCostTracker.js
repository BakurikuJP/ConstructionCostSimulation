import { world } from '@minecraft/server';
import { getBlockCost } from '../config/blockCosts.js';
import { addConstructionCost } from './costScoreboard.js';

function formatYen(amount) {
    return amount.toLocaleString('ja-JP');
}

export function registerBlockCostTracking() {
    world.afterEvents.playerPlaceBlock.subscribe((event) => {
        const player = event.player;
        const blockCost = getBlockCost(event.block.typeId);

        const result = addConstructionCost(player, blockCost.costYen);

        player.sendMessage(
            `§a${blockCost.label} 1m3: ${formatYen(blockCost.costYen)}円を計上しました。合計: ${formatYen(result.totalCostYen)}円`
        );
    });
}
