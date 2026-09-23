import { useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { asset, links } from '../config';
import type { Variant } from '../config';

interface WinDialogProps {
    variant: Variant;
    open: boolean;
    onClose(): void;
    returnFocusRef: RefObject<HTMLButtonElement | null>;
}

export function WinDialog({
    variant,
    open,
    onClose,
    returnFocusRef,
}: WinDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const claimRef = useRef<HTMLAnchorElement>(null);
    useLayoutEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const { scrollX, scrollY } = window;
        document.documentElement.classList.toggle('modal-open', open);
        if (open && !dialog.open) {
            dialog.showModal();
            claimRef.current?.focus({ preventScroll: true });
            window.scrollTo({
                left: scrollX,
                top: scrollY,
                behavior: 'instant',
            });
        } else if (!open && dialog.open) {
            dialog.close();
            returnFocusRef.current?.focus({ preventScroll: true });
        }
        return () => document.documentElement.classList.remove('modal-open');
    }, [open, returnFocusRef]);

    // Native close events are queued. Update React on the user's close action
    // instead, so a fast Escape → Enter cannot be overwritten by a stale event.
    return (
        <dialog
            className='win-dialog'
            ref={dialogRef}
            aria-labelledby='win-title'
            aria-describedby='win-description'
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            onClick={(event) => {
                if (event.target !== event.currentTarget) return;
                const bounds = event.currentTarget.getBoundingClientRect();
                if (
                    event.clientX < bounds.left ||
                    event.clientX > bounds.right ||
                    event.clientY < bounds.top ||
                    event.clientY > bounds.bottom
                )
                    onClose();
            }}
        >
            <div className={`win-card win-card--${variant}`}>
                {variant === '1' ? (
                    <img
                        className='win-card__prize'
                        src={asset('landing-1/popup-dynamite.png')}
                        alt=''
                    />
                ) : (
                    <div
                        className='win-card__prize win-card__prize--gift'
                        aria-hidden='true'
                    />
                )}
                <h2 id='win-title'>
                    {variant === '1' ? '¡FELICITACIONES!' : '¡FELICIDADES!'}
                </h2>
                <p id='win-description'>
                    <span>
                        {variant === '1'
                            ? 'GANA UN BONO DE BIENVENIDA EN CASINO'
                            : 'GANASTE'}
                    </span>
                    <strong>DE 300% + 40 GIROS GRATIS</strong>
                </p>
                <a
                    className='win-card__claim'
                    ref={claimRef}
                    href={links.bonus}
                >
                    {variant === '1' ? '¡OBTÉN TU BONO!' : '¡DALE, LO QUIERO!'}
                </a>
                <button
                    className='win-card__close'
                    type='button'
                    aria-label='Cerrar'
                    onClick={onClose}
                >
                    <span className='sr-only'>Cerrar</span>
                </button>
            </div>
        </dialog>
    );
}
