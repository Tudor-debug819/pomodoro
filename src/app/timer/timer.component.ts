import { Component } from '@angular/core';
import { TimerService } from './timer.service';
import { Store } from '@ngrx/store';
import { pauseTimer, resetTimer, startTimer, setDurations } from './timer.actions';
import { filter, Observable, pairwise, combineLatest } from 'rxjs';
import { selectSessionMessage, selectTimeLeft, selectIsWorkSession, selectWorkDuration, selectBreakDuration, selectSessionHistory } from './timer.selectors';
import { AsyncPipe } from '@angular/common';
import { TimeFormatPipe } from './time.pipe';
import { CommonModule } from '@angular/common';
import { SessionHistoryEntry, TimerState } from './timer.state';
import { FcmService } from '../fcm.service';

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
  circumference = 2 * Math.PI * 70;
  isWorkSession = true;
  sessionHistory$: Observable<SessionHistoryEntry[]>;
  showSettings = false;
  workMinutes = 25;
  breakMinutes = 5;

  constructor(private timerService: TimerService, private store: Store<{ timer: TimerState }>, private fcm: FcmService) {
    this.timeLeft$ = this.store.select(selectTimeLeft);
    this.sessionMessage$ = this.store.select(selectSessionMessage);
    this.sessionHistory$ = this.store.select(selectSessionHistory);
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

  isOnline = navigator.onLine;
  showStatus = true;
  progressPercentage = 0;

  ngOnInit() {

    this.fcm.requestPermission();
    this.fcm.listen();

    window.addEventListener('online', () => {
      this.isOnline = true;
      this.showStatus = true;
      this.autoHideStatus();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.showStatus = true;
      this.autoHideStatus();
    });

    if (this.isOnline) {
      this.autoHideStatus();
    }


    this.timeLeft$.pipe(pairwise(), filter(([prev, curr]) => prev > 0 && curr === 0)).subscribe(() => {
      const wasWorkSession = this.isWorkSession;
      this.playAlarm();

      const message = wasWorkSession
        ? 'Pauză! Bea o bere.'
        : 'Gata pauza! Inapoi la lucru.';

      console.log('sending notification', message);


      new Notification('Pomodoro Timer', {
        body: message,
      });

    })

    combineLatest([
      this.store.select(selectTimeLeft),
      this.store.select(selectIsWorkSession),
      this.store.select(selectWorkDuration),
      this.store.select(selectBreakDuration)
    ]).subscribe(([timeLeft, isWork, workMin, breakMin]) => {
      const total = isWork ? workMin * 60 : breakMin * 60;
      this.progressPercentage = 100 - (timeLeft / total) * 100;
    });

    this.store.select(selectIsWorkSession).subscribe(value => {
      this.isWorkSession = value;
      this.updateBodyClass();
    });


  }

  autoHideStatus() {
    setTimeout(() => {
      this.showStatus = false;
    }, 5000);
  }

  playAlarm() {
    const audio = new Audio('assets/alarm_tone.wav');
    audio.play();
  }

  updateBodyClass() {
    const body = document.body;
    body.classList.remove('work-bg', 'break-bg');

    body.classList.add(this.isWorkSession ? 'work-bg' : 'break-bg');
  }

  onWorkInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.workMinutes = +input.value;
  }

  onBreakInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.breakMinutes = +input.value;
  }

  applySettings() {
    this.store.dispatch(setDurations({
      workDuration: this.workMinutes,
      breakDuration: this.breakMinutes
    }));
    this.showSettings = false;
  }


}
