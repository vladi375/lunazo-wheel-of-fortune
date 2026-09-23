import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';
import { asset } from '../../config';
import { createSpin } from './spin';
import type { SpinState } from './spin';

const prizes = [
    [300, 40],
    [250, 35],
    [200, 30],
    [150, 25],
    [125, 20],
    [100, 15],
    [75, 10],
    [50, 5],
] as const;

interface WheelProps {
    onResult(): void;
    buttonRef: RefObject<HTMLButtonElement | null>;
}

export function Wheel({ onResult, buttonRef }: WheelProps) {
    const [controller] = useState(createSpin);
    const [state, setState] = useState<SpinState>('idle');
    const rotorRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<Animation | null>(null);

    useEffect(
        () => () => {
            animationRef.current?.cancel();
        },
        [],
    );

    async function handleSpin() {
        if (controller.state === 'won') {
            onResult();
            return;
        }
        const rotor = rotorRef.current;
        if (!rotor || !controller.start()) return;
        setState('spinning');
        // The winning sector begins under the fixed pointer. One full turn
        // restores that position without rotating the central button or rim.
        const animation = rotor.animate(
            [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
            {
                duration: matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 0
                    : 4000,
                easing: 'cubic-bezier(.15,.65,.15,1)',
                fill: 'forwards',
            },
        );
        animationRef.current = animation;
        try {
            await animation.finished;
        } catch {
            return;
        }
        rotor.style.transform = 'rotate(360deg)';
        animation.cancel();
        animationRef.current = null;
        if (controller.finish()) {
            setState('won');
            onResult();
        }
    }

    return (
        <>
            <div className='wheel' data-state={state}>
                <div className='wheel__rotor' ref={rotorRef} aria-hidden='true'>
                    <img
                        className='wheel__disc'
                        src={asset('wheel/disc.webp')}
                        alt=''
                        draggable={false}
                        width={2000}
                        height={2000}
                    />
                    {prizes.map(([percent, spins], i) => (
                        <div
                            key={percent}
                            className='prize'
                            style={
                                { '--angle': `${i * 45}deg` } as CSSProperties
                            }
                        >
                            <div className='prize__text'>
                                <strong>{percent}%</strong>
                                <span>+ {spins} GG</span>
                            </div>
                        </div>
                    ))}
                </div>
                <img
                    className='wheel__rim'
                    src={asset('wheel/rim.webp')}
                    alt=''
                    aria-hidden='true'
                    draggable={false}
                    width={2000}
                    height={2000}
                />
                <button
                    className='spin'
                    ref={buttonRef}
                    type='button'
                    onClick={handleSpin}
                    aria-disabled={state === 'spinning' || undefined}
                    aria-label={
                        state === 'won' ? 'Ver mi premio' : 'Girar la rueda'
                    }
                >
                    <span className='spin__face'>
                        <img
                            src={asset('wheel/center.webp')}
                            alt=''
                            draggable={false}
                        />
                        <span>GIRAR</span>
                    </span>
                </button>
            </div>
            <p className='sr-only' role='status' aria-live='polite'>
                {state === 'spinning'
                    ? 'La rueda está girando.'
                    : state === 'won'
                      ? '¡Felicidades! Ganaste 300% + 40 giros gratis.'
                      : ''}
            </p>
        </>
    );
}
