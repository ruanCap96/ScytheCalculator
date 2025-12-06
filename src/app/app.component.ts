import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, distinctUntilChanged, filter, map, Observable, switchMap, take } from 'rxjs';
import { PlayerFactionModel } from './player-faction/models/player-faction.model';
import { getError, getPlayerFactions, getTotalPlayers, getWinningPlayerFaction } from './player-faction/state';
import { PlayerFactionPageActions } from './player-faction/state/actions';
import { PlayerFactionState } from './player-faction/state/player-faction.reducer';
import { ValidationService } from './shared/services/validation.service';
import { StructureBonusType } from './structure-bonusses/enums/structure-bonus-type.enum';
import { StructureBonusPageActions } from './structure-bonusses/state/actions';
import { StructureBonusState } from './structure-bonusses/state/sructure-bonus.reducer';
import { MatDialog } from '@angular/material/dialog';
import { GamePlayConfigDialogComponent } from './gameplay-config/gameplay-config-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  playerFactions$: Observable<PlayerFactionModel[]>;
  structureBonus$: Observable<StructureBonusType>;
  winningPlayerFaction$: Observable<PlayerFactionModel>;
  totalPlayers$: Observable<number>;
  canShowWinningFaction$: Observable<boolean>;

  error$: Observable<string>;

  constructor(
    private readonly validationService: ValidationService,
    private readonly playerFactionStore: Store<PlayerFactionState>,
    private readonly structureBonusStore: Store<StructureBonusState>,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.openGameConfigDialog();

    this.validationService.setDefaultValidationMessages();

    this.playerFactions$ = this.playerFactionStore.select(getPlayerFactions);
    this.winningPlayerFaction$ = this.playerFactionStore.select(getWinningPlayerFaction);
    this.totalPlayers$ = this.playerFactionStore.select(getTotalPlayers);
    this.error$ = this.playerFactionStore.select(getError);
    this.canShowWinningFaction$ = combineLatest([this.playerFactions$, this.totalPlayers$]).pipe(
      map(([players, total]) => total > 0 && players.length >= total),
    );

    this.playerFactionStore.dispatch(PlayerFactionPageActions.loadPlayerFactions());
    this.structureBonusStore.dispatch(StructureBonusPageActions.getStructureBonus());
  }

  openGameConfigDialog() {
    const dialogRef = this.dialog.open(GamePlayConfigDialogComponent, {
      width: '490px',
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: number) => {
        this.playerFactionStore.dispatch(PlayerFactionPageActions.setTotalPlayers({ totalPlayers: result }));
      });
  }
}
