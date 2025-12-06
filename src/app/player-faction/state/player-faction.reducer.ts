import { createReducer, on } from '@ngrx/store';
import { PlayerFactionModel } from '../models/player-faction.model';
import { PlayerFactionApiActions } from './actions';
import { GameplayConfig } from '../interfaces/gameplay-config.interface';
import { setTotalPlayers } from './actions/player-faction-page.actions';

export interface PlayerFactionState {
  gameplayConfig: GameplayConfig;
  playerFactions: PlayerFactionModel[];
  winningPlayerFaction: PlayerFactionModel | null;
  error: string;
}

const initialState: PlayerFactionState = {
  gameplayConfig: {
    totalPlayers: 0,
  },
  playerFactions: [],
  winningPlayerFaction: null,
  error: '',
};

export const playerFactionReducer = createReducer<PlayerFactionState>(
  initialState,
  on(PlayerFactionApiActions.loadSuccess, (state, action): PlayerFactionState => {
    return {
      ...state,
      playerFactions: action.playerFactions.map((pF) => PlayerFactionModel.create(pF, null)),
      error: '',
    };
  }),
  on(PlayerFactionApiActions.loadFailure, (state, action): PlayerFactionState => {
    return {
      ...state,
      playerFactions: [],
      error: action.error,
    };
  }),
  on(PlayerFactionApiActions.getWinningPlayerFactionSuccess, (state, action): PlayerFactionState => {
    return {
      ...state,
      winningPlayerFaction: action.playerFaction ? PlayerFactionModel.create(action.playerFaction, null) : null,
      error: '',
    };
  }),
  on(PlayerFactionApiActions.getWinningPlayerFactionFailure, (state, action): PlayerFactionState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(PlayerFactionApiActions.createSuccess, (state, action): PlayerFactionState => {
    return {
      ...state,

      playerFactions: [
        ...state.playerFactions,
        PlayerFactionModel.create(action.playerFaction, action.structureBonusType),
      ],
      error: '',
    };
  }),
  on(PlayerFactionApiActions.createFailure, (state, action): PlayerFactionState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(PlayerFactionApiActions.updateSuccess, (state, action): PlayerFactionState => {
    const updatedPlayerFactions = state.playerFactions.map((untouchedFaction) =>
      action.playerFaction.id === untouchedFaction.id ? action.playerFaction : untouchedFaction,
    );
    return {
      ...state,
      playerFactions: updatedPlayerFactions.map((pF) => PlayerFactionModel.create(pF, action.structureBonusType)),
      error: '',
    };
  }),
  on(PlayerFactionApiActions.updateFailure, (state, action): PlayerFactionState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(PlayerFactionApiActions.deleteSuccess, (state, action): PlayerFactionState => {
    return {
      ...state,
      playerFactions: state.playerFactions.filter((faction) => faction.id !== action.playerFactionId),
      error: '',
    };
  }),
  on(PlayerFactionApiActions.deleteFailure, (state, action): PlayerFactionState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(PlayerFactionApiActions.resetDatabaseSuccess, (state, action): PlayerFactionState => {
    return {
      ...state,
      gameplayConfig: { totalPlayers: 0 },
      playerFactions: [],
      error: '',
    };
  }),
  on(PlayerFactionApiActions.resetDatabaseFailure, (state, action): PlayerFactionState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(setTotalPlayers, (state, action): PlayerFactionState => {
    return {
      ...state,
      gameplayConfig: {
        totalPlayers: action.totalPlayers,
      },
    };
  }),
);
