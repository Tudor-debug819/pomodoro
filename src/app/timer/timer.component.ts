import { Component } from '@angular/core';
import { TimerService } from './timer.service';
import { Store } from '@ngrx/store';
import { pauseTimer, resetTimer, startTimer } from './timer.actions';
import { Observable } from 'rxjs';
import { selectSessionMessage, selectTimeLeft } from './timer.selectors';
import { AsyncPipe } from '@angular/common';
import { TimeFormatPipe } from './time.pipe';
import { CommonModule } from '@angular/common';
import { TimerState } from './timer.state';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [AsyncPipe, TimeFormatPipe, CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  timeLeft$: Observable<number>;
  sessionMessage$: Observable<string>;

  constructor(private timerService: TimerService, private store: Store<{ timer: TimerState }>) {
    this.timeLeft$ = this.store.select(selectTimeLeft);
    this.sessionMessage$ = this.store.select(selectSessionMessage);
  }

  onStart() {
    this.timerService.start();
    this.store.dispatch(startTimer());
  }

  onPause() {
    this.timerService.stop();
    this.store.dispatch(pauseTimer());
  }

  onReset() {
    this.timerService.stop();
    this.store.dispatch(resetTimer());
  }

}
