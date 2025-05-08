export interface TimerState {
    workDurations: number;
    breakDuration: number;
    isRunning: boolean;
    isWorkSession: boolean;
    timeLeft: number;
    history: SessionHistoryEntry[];
}

export const initialState: TimerState = {
    workDurations: 25,
    breakDuration: 5,
    isRunning: false,
    isWorkSession: true,
    timeLeft: 25 * 60,
    history: JSON.parse(localStorage.getItem('pomodoroHistory') || '[]')
}

export interface SessionHistoryEntry {
    type: 'work' | 'break';
    duration: number;
    timestamp: string;
}