export interface TimerState {
    workDurations: number;
    breakDuration: number;
    isRunning: boolean;
    isWorkSession: boolean;
    timeLeft: number;
}

export const initialState: TimerState = {
    workDurations: 1,
    breakDuration: 1,
    isRunning: false,
    isWorkSession: true,
    timeLeft: 1 * 60,
}