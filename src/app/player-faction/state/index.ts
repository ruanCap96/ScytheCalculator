import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerFactionState } from './player-faction.reducer';

const getPlayerFactionFeatureState = createFeatureSelector<PlayerFactionState>('playerFactions');

export const getPlayerFactions = createSelector(getPlayerFactionFeatureState, (state) => state.playerFactions);

export const getWinningPlayerFaction = createSelector(
  getPlayerFactionFeatureState,
  (state) => state.winningPlayerFaction,
);

export const getTotalPlayers = createSelector(
  getPlayerFactionFeatureState,
  (state) => state.gameplayConfig.totalPlayers,
);

export const getError = createSelector(getPlayerFactionFeatureState, (state) => state.error);
