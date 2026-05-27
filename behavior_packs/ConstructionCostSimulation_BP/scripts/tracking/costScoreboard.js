import { world } from '@minecraft/server';
import { LAND_COST_YEN } from '../config/landCost.js';

export const SCOREBOARD_IDS = {
    materialCostYen: 'BuildMaterial',
    landCostYen: 'BuildLand',
    totalCostYen: 'BuildTotal',
    display: 'BuildCostBoard'
};

const SCOREBOARD_NAMES = {
    [SCOREBOARD_IDS.materialCostYen]: '建材費',
    [SCOREBOARD_IDS.landCostYen]: '土地取得価格',
    [SCOREBOARD_IDS.totalCostYen]: '合計金額',
    [SCOREBOARD_IDS.display]: '建築コスト(千円)'
};

const DISPLAY_ROWS = {
    materialCost: '建材費',
    landCost: '土地取得価格',
    totalCost: '合計金額'
};

const LEGACY_SCOREBOARD_IDS = [
    'BuildCost',
    'BuildCostK',
    'BuildLast',
    'BuildLastK',
    'BuildBlocks'
];

function toThousandsOfYen(amountYen) {
    return Math.round(amountYen / 1000);
}

function ensureObjective(objectiveId) {
    let objective = world.scoreboard.getObjective(objectiveId);
    if (!objective) {
        objective = world.scoreboard.addObjective(objectiveId, SCOREBOARD_NAMES[objectiveId]);
    }
    return objective;
}

function getScore(objective, participant) {
    try {
        return objective.getScore(participant) ?? 0;
    } catch {
        return 0;
    }
}

function updateDisplayBoard(materialCostYen, landCostYen) {
    const displayObjective = ensureObjective(SCOREBOARD_IDS.display);
    const totalCostYen = materialCostYen + landCostYen;

    displayObjective.setScore(DISPLAY_ROWS.materialCost, toThousandsOfYen(materialCostYen));
    displayObjective.setScore(DISPLAY_ROWS.landCost, toThousandsOfYen(landCostYen));
    displayObjective.setScore(DISPLAY_ROWS.totalCost, toThousandsOfYen(totalCostYen));
}

function showDisplayBoard(player) {
    if (!player) {
        return;
    }

    player.runCommand(`scoreboard objectives setdisplay sidebar ${SCOREBOARD_IDS.display}`);
}

function removeLegacyObjectives() {
    for (const objectiveId of LEGACY_SCOREBOARD_IDS) {
        const objective = world.scoreboard.getObjective(objectiveId);
        if (objective) {
            world.scoreboard.removeObjective(objectiveId);
        }
    }
}

export function initializeCostScoreboards(player) {
    removeLegacyObjectives();

    const materialObjective = ensureObjective(SCOREBOARD_IDS.materialCostYen);
    const landObjective = ensureObjective(SCOREBOARD_IDS.landCostYen);
    const totalObjective = ensureObjective(SCOREBOARD_IDS.totalCostYen);

    const currentMaterialCost = player ? getScore(materialObjective, player) : 0;
    const currentLandCost = LAND_COST_YEN;

    if (player) {
        materialObjective.setScore(player, currentMaterialCost);
        landObjective.setScore(player, currentLandCost);
        totalObjective.setScore(player, currentMaterialCost + currentLandCost);
    }

    updateDisplayBoard(currentMaterialCost, currentLandCost);
    showDisplayBoard(player);
}

export function addConstructionCost(player, costYen) {
    initializeCostScoreboards(player);

    const materialObjective = ensureObjective(SCOREBOARD_IDS.materialCostYen);
    const landObjective = ensureObjective(SCOREBOARD_IDS.landCostYen);
    const totalObjective = ensureObjective(SCOREBOARD_IDS.totalCostYen);

    const nextMaterialCost = getScore(materialObjective, player) + costYen;
    const landCost = LAND_COST_YEN;
    const nextTotalCost = nextMaterialCost + landCost;

    materialObjective.setScore(player, nextMaterialCost);
    landObjective.setScore(player, landCost);
    totalObjective.setScore(player, nextTotalCost);
    updateDisplayBoard(nextMaterialCost, landCost);

    return {
        materialCostYen: nextMaterialCost,
        landCostYen: landCost,
        totalCostYen: nextTotalCost
    };
}
