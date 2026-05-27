import { world } from '@minecraft/server';
import { registerBlockCostTracking } from './tracking/blockCostTracker.js';
import { initializeCostScoreboards } from './tracking/costScoreboard.js';

world.afterEvents.playerSpawn.subscribe((event) => {
    initializeCostScoreboards(event.player);
});

registerBlockCostTracking();
