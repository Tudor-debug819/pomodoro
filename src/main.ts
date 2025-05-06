import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { timerReducer } from './app/timer/timer.reducer';
import { provideState, provideStore } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  providers: [
    provideState('timer', timerReducer),
    provideStore(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ]

});
