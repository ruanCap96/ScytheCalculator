import { Component, Input } from '@angular/core';
import { PlayerFactionModel } from '../models/player-faction.model';

@Component({
  selector: 'player-faction-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  @Input() playerFactions: PlayerFactionModel[];
  @Input() winningPlayerFaction: PlayerFactionModel;
  @Input() canShowWinningFaction: boolean;
  @Input() error: string;
}
