export interface TimerState {
    workDurations: number;
    breakDuration: number;
    isRunning: boolean;
    isWorkSession: boolean;
    timeLeft: number;
}

export const initialState: TimerState = {
    workDurations: 25,
    breakDuration: 5,
    isRunning: false,
    isWorkSession: true,
    timeLeft: 25 * 60,
}