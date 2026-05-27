import { MATERIAL_COSTS } from './costCatalog.js';

const concreteColors = [
    'white',
    'orange',
    'magenta',
    'light_blue',
    'yellow',
    'lime',
    'pink',
    'gray',
    'light_gray',
    'cyan',
    'purple',
    'blue',
    'brown',
    'green',
    'red',
    'black'
];

function withLabel(cost, label) {
    return {
        ...cost,
        label
    };
}

function createColorBlockCosts(suffix, cost, labelPrefix) {
    return Object.fromEntries(
        concreteColors.map((color) => [
            `minecraft:${color}_${suffix}`,
            withLabel(cost, `${labelPrefix}(${color})`)
        ])
    );
}

export const EXPLICIT_BLOCK_COSTS = {
    ...createColorBlockCosts('concrete', MATERIAL_COSTS.concrete, 'コンクリート'),
    ...createColorBlockCosts('concrete_powder', MATERIAL_COSTS.concretePowder, 'コンクリート粉末'),

    'minecraft:stone': MATERIAL_COSTS.rawStone,
    'minecraft:cobblestone': MATERIAL_COSTS.cobblestone,
    'minecraft:stone_bricks': withLabel(MATERIAL_COSTS.stone, '石レンガ'),
    'minecraft:bricks': MATERIAL_COSTS.brick,
    'minecraft:glass': withLabel(MATERIAL_COSTS.glass, '板ガラス相当'),
    'minecraft:bamboo_planks': MATERIAL_COSTS.bamboo,
    'minecraft:iron_block': withLabel(MATERIAL_COSTS.iron, '鉄骨・鋼材相当'),
    'minecraft:copper_block': withLabel(MATERIAL_COSTS.copper, '銅材相当'),
    'minecraft:diamond_block': MATERIAL_COSTS.luxury,
    'minecraft:gold_block': MATERIAL_COSTS.luxury,
    'minecraft:emerald_block': MATERIAL_COSTS.luxury
};
