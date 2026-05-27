import { EXPLICIT_BLOCK_COSTS } from './explicitBlockCosts.js';
import { matchBlockCategory } from './blockCategoryMatcher.js';

function toBlockName(blockTypeId) {
    return blockTypeId.replace('minecraft:', '');
}

export function getBlockCost(blockTypeId) {
    return EXPLICIT_BLOCK_COSTS[blockTypeId] ?? matchBlockCategory(toBlockName(blockTypeId));
}
