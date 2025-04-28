import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { interval, Subscription } from "rxjs";
import { tick } from "./timer.actions";

@Injectable({
    providedIn: 'root',
})

export class TimerService {
    private timerSubscription?: Subscription;

    constructor(private store: Store) { }

    start() {
        if (!this.timerSubscription) {
            this.timerSubscription = interval(1000).subscribe(() => {
                this.store.dispatch(tick());
            });
        }
    }

    stop() {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            this.timerSubscription = undefined;
        }
    }
}
