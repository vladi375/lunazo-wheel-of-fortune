export type SpinState = 'idle' | 'spinning' | 'won';

export interface SpinController {
    readonly state: SpinState;
    start(): boolean;
    finish(): boolean;
}

export function createSpin(): SpinController {
    let state: SpinState = 'idle';
    return {
        get state() {
            return state;
        },
        start() {
            if (state !== 'idle') return false;
            state = 'spinning';
            return true;
        },
        finish() {
            if (state !== 'spinning') return false;
            state = 'won';
            return true;
        },
    };
}
