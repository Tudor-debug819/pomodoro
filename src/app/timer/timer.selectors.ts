import { createSelector } from "@ngrx/store";
import { TimerState } from "./timer.state";

export const selectTimer = (state: { timer: TimerState }) => state.timer;

export const selectTimeLeft = createSelector(selectTimer, (state) => state.timeLeft);
export const selectIsRunning = createSelector(selectTimer, (state) => state.isRunning);
export const selectIsWorkSession = createSelector(selectTimer, (state) => state.isWorkSession);
export const selectSessionMessage = createSelector(selectIsWorkSession, (isWorkSession) => isWorkSession ? 'Work time!' : 'Break time!');

export const selectWorkDuration = createSelector(selectTimer, (state) => state.workDurations);
export const selectBreakDuration = createSelector(selectTimer, (state) => state.breakDuration);

export const selectSessionHistory = createSelector(
    selectTimer,
    (state) => state.history || []
);