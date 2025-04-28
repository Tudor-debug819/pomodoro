import { createReducer } from "@ngrx/store";
import { initialState } from "./timer.state";
import { pauseTimer, resetTimer, startTimer, tick } from "./timer.actions";
import { on } from "@ngrx/store";

export const timerReducer = createReducer(initialState,
    on(startTimer, (state) => ({ ...state, isRunning: true, })),
    on(pauseTimer, (state) => ({ ...state, isRunning: false })),
    on(resetTimer, (state) => ({ ...state, isRunning: false, timeLeft: state.isWorkSession ? state.workDurations * 60 : state.breakDuration * 60 })),
    on(tick, (state) => {
        if (state.timeLeft > 0) {
          return {
            ...state,
            timeLeft: state.timeLeft - 1,
          };
        } else {
          const isNowWorkSession = !state.isWorkSession;
          const newTimeLeft = isNowWorkSession
            ? state.workDurations * 60
            : state.breakDuration * 60;
     
          return {
            ...state,
            isWorkSession: isNowWorkSession,
            timeLeft: newTimeLeft,
          };
        }
      }),
);