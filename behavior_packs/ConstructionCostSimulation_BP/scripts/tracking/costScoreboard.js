import { world } from '@minecraft/server';

export const SCOREBOARD_IDS = {
    totalCost: 'BuildCost',
    totalCostK: 'BuildCostK',
    lastCost: 'BuildLast',
    lastCostK: 'BuildLastK',
    blockCount: 'BuildBlocks'
};

const SCOREBOARD_NAMES = {
    [SCOREBOARD_IDS.totalCost]: '建築コスト合計',
    [SCOREBOARD_IDS.totalCostK]: '建築コスト合計(千円)',
    [SCOREBOARD_IDS.lastCost]: '直近ブロック単価',
    [SCOREBOARD_IDS.lastCostK]: '直近ブロック単価(千円)',
    [SCOREBOARD_IDS.blockCount]: '建築ブロック数'
};

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
    const totalKObjective = ensureObjective(SCOREBOARD_IDS.totalCostK);
    const lastObjective = ensureObjective(SCOREBOARD_IDS.lastCost);
    const lastKObjective = ensureObjective(SCOREBOARD_IDS.lastCostK);
    const blockCountObjective = ensureObjective(SCOREBOARD_IDS.blockCount);

    const nextTotal = getScore(totalObjective, player) + costYen;
    const nextBlockCount = getScore(blockCountObjective, player) + 1;

    totalObjective.setScore(player, nextTotal);
    totalKObjective.setScore(player, toThousandsOfYen(nextTotal));
    lastObjective.setScore(player, costYen);
    lastKObjective.setScore(player, toThousandsOfYen(costYen));
    blockCountObjective.setScore(player, nextBlockCount);

    return {
        totalCostYen: nextTotal,
        totalCostKiloYen: toThousandsOfYen(nextTotal),
        blockCount: nextBlockCount
    };
}
