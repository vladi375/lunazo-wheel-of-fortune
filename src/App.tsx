import { useRef, useState } from 'react';
import { asset, links, variants } from './config';
import type { Variant } from './config';
import { Wheel } from './features/wheel/Wheel';
import { WinDialog } from './components/WinDialog';
import { Footer } from './components/Footer';

export function App({ variant }: { variant: Variant }) {
    const config = variants[variant];
    const [resultOpen, setResultOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <main className={`landing landing--${variant}`}>
                <section className='hero' aria-labelledby='headline'>
                    <div className='scene'>
                        <header className='header'>
                            <img
                                className='brand'
                                src={asset('shared/logo.webp')}
                                alt='Lunazo'
                                width={209}
                                height={37}
                            />
                            <a className='register' href={links.registration}>
                                REGÍSTRATE
                            </a>
                        </header>
                        <h1 id='headline'>
                            {config.headline.map((line) => (
                                <span key={line}>{line}</span>
                            ))}
                        </h1>
                        <div className='artwork' aria-hidden='true'>
                            {config.decorations.map((name) =>
                                variant === '1' &&
                                (name === 'joker' || name === 'zeus') ? (
                                    <picture key={name}>
                                        <source
                                            media='(max-width: 900px)'
                                            srcSet={asset(
                                                `landing-1/${name}-original.webp`,
                                            )}
                                        />
                                        <img
                                            className={`art art--${name}`}
                                            src={asset(
                                                `landing-1/${name}.webp`,
                                            )}
                                            alt=''
                                            draggable={false}
                                        />
                                    </picture>
                                ) : (
                                    <img
                                        key={name}
                                        className={`art art--${name}`}
                                        src={asset(
                                            `landing-${variant}/${name}.webp`,
                                        )}
                                        alt=''
                                        draggable={false}
                                    />
                                ),
                            )}
                        </div>
                        <Wheel
                            onResult={() => setResultOpen(true)}
                            buttonRef={buttonRef}
                        />
                        {config.benefits && (
                            <ul
                                className='benefits'
                                aria-label='Ventajas de Lunazo'
                            >
                                <li>
                                    <span
                                        className='benefit-icon benefit-icon--secure'
                                        aria-hidden='true'
                                    />
                                    Pagos seguros
                                </li>
                                <li>
                                    <span
                                        className='benefit-icon benefit-icon--support'
                                        aria-hidden='true'
                                    />
                                    Soporte 24/7
                                </li>
                                <li>
                                    <span
                                        className='benefit-icon benefit-icon--fast'
                                        aria-hidden='true'
                                    />
                                    Retiros rápidos
                                </li>
                            </ul>
                        )}
                    </div>
                </section>
                <Footer />
            </main>
            <WinDialog
                variant={variant}
                open={resultOpen}
                onClose={() => setResultOpen(false)}
                returnFocusRef={buttonRef}
            />
        </>
    );
}
