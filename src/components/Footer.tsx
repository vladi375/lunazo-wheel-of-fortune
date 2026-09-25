import { asset, links, withLandingQueryParams } from '../config';

export function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__content'>
                <img
                    className='footer__logo'
                    src={asset('shared/footer-lunazo.svg')}
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
                    >
                        <img
                            src={asset('shared/bank-transfer.svg')}
                            alt=''
                            width={20}
                            height={33}
                        />
                        <img
                            src={asset('shared/mercado-pago.svg')}
                            alt=''
                            width={26}
                            height={33}
                        />
                        <img
                            src={asset('shared/naranja-x.svg')}
                            alt=''
                            width={37}
                            height={33}
                        />
                        <img
                            src={asset('shared/astropay.svg')}
                            alt=''
                            width={37}
                            height={33}
                        />
                        <img
                            src={asset('shared/tether.svg')}
                            alt=''
                            width={35}
                            height={33}
                        />
                    </span>
                    <img
                        className='age'
                        src={asset('shared/age-18.svg')}
                        alt='Solo para mayores de 18 años'
                        width={27}
                        height={27}
                    />
                </div>
                <p className='footer__notice'>
                    IMPORTANTE: TODOS LOS MONTOS DE BONIFICACIÓN SE MUESTRAN EN
                    EL MONTO TOTAL DE LOS 5 PRIMEROS DEPÓSITOS.
                </p>
            </div>
        </footer>
    );
}
