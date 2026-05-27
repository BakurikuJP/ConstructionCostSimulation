import { MATERIAL_COSTS } from './costCatalog.js';

const woodTypes = [
    'oak',
    'spruce',
    'birch',
    'jungle',
    'acacia',
    'dark_oak',
    'mangrove',
    'cherry',
    'crimson',
    'warped'
];

const stoneFamilies = [
    'stone',
    'cobblestone',
    'granite',
    'diorite',
    'andesite',
    'deepslate',
    'tuff',
    'calcite',
    'basalt',
    'blackstone'
];

function hasAnyToken(blockName, tokens) {
    return tokens.some((token) => blockName.includes(token));
}

function isWoodBlock(blockName) {
    return woodTypes.some((woodType) => (
        blockName === `${woodType}_planks` ||
        blockName === `${woodType}_log` ||
        blockName === `${woodType}_wood` ||
        blockName === `stripped_${woodType}_log` ||
        blockName === `stripped_${woodType}_wood` ||
        blockName.startsWith(`${woodType}_slab`) ||
        blockName.startsWith(`${woodType}_stairs`) ||
        blockName.startsWith(`${woodType}_fence`) ||
        blockName.startsWith(`${woodType}_door`) ||
        blockName.startsWith(`${woodType}_trapdoor`) ||
        blockName.startsWith(`${woodType}_button`) ||
        blockName.startsWith(`${woodType}_pressure_plate`)
    ));
}

function isStoneBlock(blockName) {
    return hasAnyToken(blockName, stoneFamilies) ||
        blockName.includes('brick') ||
        blockName.includes('sandstone') ||
        blockName.includes('prismarine') ||
        blockName.includes('quartz') ||
        blockName.includes('purpur') ||
        blockName.includes('netherrack') ||
        blockName.includes('end_stone');
}

export function matchBlockCategory(blockName) {
    if (blockName.endsWith('_concrete')) {
        return MATERIAL_COSTS.concrete;
    }

    if (blockName.endsWith('_concrete_powder')) {
        return MATERIAL_COSTS.concretePowder;
    }

    if (blockName.includes('bamboo')) {
        return MATERIAL_COSTS.bamboo;
    }

    if (isWoodBlock(blockName)) {
        return MATERIAL_COSTS.wood;
    }

    if (blockName.includes('redstone') || blockName.includes('rail') || blockName.includes('piston') || blockName.includes('observer') || blockName.includes('dispenser') || blockName.includes('dropper')) {
        return MATERIAL_COSTS.equipment;
    }

    if (blockName.includes('lantern') || blockName.includes('torch') || blockName.includes('lamp') || blockName.includes('light') || blockName.includes('glowstone')) {
        return MATERIAL_COSTS.lighting;
    }

    if (isStoneBlock(blockName)) {
        return blockName.includes('brick') ? MATERIAL_COSTS.brick : MATERIAL_COSTS.stone;
    }

    if (blockName.includes('glass')) {
        return MATERIAL_COSTS.glass;
    }

    if (blockName.includes('wool') || blockName.includes('carpet')) {
        return MATERIAL_COSTS.textile;
    }

    if (blockName.includes('terracotta') || blockName.includes('ceramic')) {
        return MATERIAL_COSTS.ceramic;
    }

    if (blockName.includes('copper')) {
        return MATERIAL_COSTS.copper;
    }

    if (blockName.includes('iron') || blockName.includes('chain') || blockName.includes('anvil')) {
        return MATERIAL_COSTS.iron;
    }

    if (blockName.includes('gold') || blockName.includes('diamond') || blockName.includes('emerald') || blockName.includes('netherite')) {
        return MATERIAL_COSTS.luxury;
    }

    if (blockName.includes('dirt') || blockName.includes('grass') || blockName.includes('sand') || blockName.includes('gravel') || blockName.includes('mud') || blockName.includes('clay')) {
        return MATERIAL_COSTS.earth;
    }

    if (blockName.includes('leaves') || blockName.includes('sapling') || blockName.includes('flower') || blockName.includes('moss') || blockName.includes('vine') || blockName.includes('coral')) {
        return MATERIAL_COSTS.landscape;
    }

    if (blockName.includes('ice') || blockName.includes('snow')) {
        return MATERIAL_COSTS.iceSnow;
    }

    return MATERIAL_COSTS.other;
}
