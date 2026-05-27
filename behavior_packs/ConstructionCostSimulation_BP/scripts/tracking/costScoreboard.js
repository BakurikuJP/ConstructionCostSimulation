import { world } from '@minecraft/server';

export const SCOREBOARD_IDS = {
    totalCost: 'BuildCost',
    lastCost: 'BuildLast',
    blockCount: 'BuildBlocks'
};

const SCOREBOARD_NAMES = {
    [SCOREBOARD_IDS.totalCost]: '建築コスト合計',
    [SCOREBOARD_IDS.lastCost]: '直近ブロック単価',
    [SCOREBOARD_IDS.blockCount]: '建築ブロック数'
};

function ensureObjective(objectiveId) {
    let objective = world.scoreboard.getObjective(objectiveId);
    if (!objective) {
        objective = world.scoreboard.addObjective(objectiveId, SCOREBOARD_NAMES[objectiveId]);
    }
    return objective;
}

function getScore(objective, player) {
    try {
        return objective.getScore(player) ?? 0;
    } catch {
        return 0;
    }
}

export function initializeCostScoreboards(player) {
    for (const objectiveId of Object.values(SCOREBOARD_IDS)) {
        const objective = ensureObjective(objectiveId);
        if (player && getScore(objective, player) === 0) {
            objective.setScore(player, 0);
        }
    }
}

export function addConstructionCost(player, costYen) {
    initializeCostScoreboards(player);

    const totalObjective = ensureObjective(SCOREBOARD_IDS.totalCost);
    const lastObjective = ensureObjective(SCOREBOARD_IDS.lastCost);
    const blockCountObjective = ensureObjective(SCOREBOARD_IDS.blockCount);

    const nextTotal = getScore(totalObjective, player) + costYen;
    const nextBlockCount = getScore(blockCountObjective, player) + 1;

    totalObjective.setScore(player, nextTotal);
    lastObjective.setScore(player, costYen);
    blockCountObjective.setScore(player, nextBlockCount);

    return {
        totalCostYen: nextTotal,
        blockCount: nextBlockCount
    };
}
