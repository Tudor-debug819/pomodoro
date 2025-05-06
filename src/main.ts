import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { timerReducer } from './app/timer/timer.reducer';
import { provideState, provideStore } from '@ngrx/store';

bootstrapApplication(AppComponent, {
  providers: [
    provideState('timer', timerReducer),
    provideStore(), 
  ]

});
