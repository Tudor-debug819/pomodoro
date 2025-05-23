import { createAction, props } from "@ngrx/store";

export const startTimer = createAction('[Pomodoro] Start Timer');
export const pauseTimer = createAction('[Pomodoro] Pause Timer');
export const resetTimer = createAction('[Pomodoro] Reset Timer');
export const tick = createAction('[Pomodoro] Tick');

export const setDurations = createAction(
    '[Pomodoro] Set Durations',
    props<{ workDuration: number; breakDuration: number }>()
);