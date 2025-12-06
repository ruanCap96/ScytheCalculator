// Angular
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NgRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

// Toast
import { ToastrModule } from 'ngx-toastr';

// App modules and components
import { AppComponent } from './app.component';
import { ShellModule } from './player-faction/shell/shell.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { PlayerFactionModule } from './player-faction/player-faction.module';
import { StructureBonussesModule } from './structure-bonusses/structure-bonusses.module';

// Database
import { ScytheData } from './shared/database/scythe.data';
import { GameplayConfigDialogModule } from './gameplay-config/gameplay-config-dialog.module';

export let AppInjector: Injector;

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ScytheData),
    FlexLayoutModule,

    // NgRX
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),

    // Toasts
    ToastrModule.forRoot(),

    // App modules and components
    ToolbarModule,
    PlayerFactionModule,
    ShellModule,
    StructureBonussesModule,
    GameplayConfigDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
