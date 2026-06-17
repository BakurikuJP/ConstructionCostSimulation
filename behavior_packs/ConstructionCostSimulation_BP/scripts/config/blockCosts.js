import { EXPLICIT_BLOCK_COSTS } from './explicitBlockCosts.js';
import { matchBlockCategory } from './blockCategoryMatcher.js';

const HALF_BLOCK_COST_FACTOR = 0.5;

function toBlockName(blockTypeId) {
    return blockTypeId.replace('minecraft:', '');
}

function isDoubleSlab(blockName) {
    return blockName.startsWith('double_') || blockName.includes('_double_slab');
}

function isHalfBlock(blockName) {
    return blockName.includes('slab') && !isDoubleSlab(blockName);
}

function applyBlockShapeCost(blockName, blockCost) {
    if (!isHalfBlock(blockName)) {
        return blockCost;
    }

    return {
        ...blockCost,
        costYen: Math.round(blockCost.costYen * HALF_BLOCK_COST_FACTOR)
    };
}

export function getBlockCost(blockTypeId) {
    const blockName = toBlockName(blockTypeId);
    const blockCost = EXPLICIT_BLOCK_COSTS[blockTypeId] ?? matchBlockCategory(blockName);

    return applyBlockShapeCost(blockName, blockCost);
}
