import { createAction, props } from '@ngrx/store';
import { StructureBonusType } from 'src/app/structure-bonusses/enums/structure-bonus-type.enum';
import { PlayerFaction } from '../../interfaces/player-faction.interface';

export const loadPlayerFactions = createAction('[Player Faction Page] Load');

export const setTotalPlayers = createAction(
  '[Player Faction Page] Set Total Players',
  props<{ totalPlayers: number }>(),
);

export const getWinningPlayerFaction = createAction(
  '[Player Faction Page] Get Winning Player Faction',
  props<{ structureBonusType: StructureBonusType }>(),
);

export const updatePlayerFaction = createAction(
  '[Player Faction Page] Update',
  props<{ playerFaction: PlayerFaction; structureBonusType: StructureBonusType }>(),
);

export const createPlayerFaction = createAction(
  '[Player Faction Page] Create',
  props<{ playerFaction: PlayerFaction; structureBonusType: StructureBonusType }>(),
);

export const deletePlayerFaction = createAction(
  '[Player Faction Page] Delete Player Faction',
  props<{ playerFactionId: number }>(),
);

export const resetDatabase = createAction('[Player Faction Page] Reset Database');
