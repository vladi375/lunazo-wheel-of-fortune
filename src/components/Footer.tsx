import { asset, links, withLandingQueryParams } from '../config';

export function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__content'>
                <img
                    className='footer__logo'
                    src={asset('shared/logo.webp')}
                    width={78}
                    height={14}
                    alt='Lunazo'
                />
                <nav
                    className='footer__links'
                    aria-label='Información y contacto'
                >
                    <a href='mailto:support@lunazo.bet'>support@lunazo.bet</a>
                    <a
                        href={withLandingQueryParams(
                            links.responsible,
                            window.location.search,
                        )}
                    >
                        Juego Responsable
                    </a>
                    <a
                        href={withLandingQueryParams(
                            links.privacy,
                            window.location.search,
                        )}
                    >
                        Política de Privacidad
                    </a>
                </nav>
                <div className='footer__badges'>
                    <span
                        className='payments'
                        role='img'
                        aria-label='Bank Transfer, Mercado Pago, Naranja X, AstroPay, USDT'
                    />
                    <span
                        className='age'
                        aria-label='Solo para mayores de 18 años'
                    >
                        18+
                    </span>
                </div>
                <p className='footer__notice'>
                    IMPORTANTE: TODOS LOS MONTOS DE BONIFICACIÓN SE MUESTRAN EN
                    EL MONTO TOTAL DE LOS 5 PRIMEROS DEPÓSITOS.
                </p>
            </div>
        </footer>
    );
}
