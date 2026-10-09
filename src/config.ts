export type Variant = '1' | '2';
export type Country = 'ar' | 'co';

export const sites = {
    'wheel-v1-co': { variant: '1', country: 'co' },
    'wheel-v1-ar': { variant: '1', country: 'ar' },
    'wheel-v2-co': { variant: '2', country: 'co' },
    'wheel-v2-ar': { variant: '2', country: 'ar' },
} as const satisfies Record<string, { variant: Variant; country: Country }>;

export type SiteName = keyof typeof sites;

export const links = {
    registration: 'https://xf-649000-tr.xyz/es/registration/0',
    bonus: 'https://xf-649000-tr.xyz/es/registration/1',
    responsible: 'https://lunazo.bet/es/responsible',
    privacy: 'https://lunazo.bet/es/privacy',
} as const;

export function withLandingQueryParams(
    destination: string,
    landingSearch: string,
): string {
    if (!landingSearch) return destination;

    const url = new URL(destination);
    new URLSearchParams(landingSearch).forEach((value, key) => {
        url.searchParams.append(key, value);
    });
    return url.toString();
}

export const variants = {
    '1': {
        headline: ['¿HOY ES TU NOCHE DE SUERTE?', '¡GIRA Y DESCÚBRELO!'],
        decorations: ['diamond', 'joker', 'buffalo', 'zeus', 'candy'],
        benefits: false,
    },
    '2': {
        headline: ['APOSTÁ EN GRANDE,', 'GANÁ A LO LUNAZO'],
        decorations: [
            'slots',
            'avocado',
            'pineapple',
            'panther',
            'woman',
            'passionfruit-small',
            'passionfruit-large',
        ],
        benefits: true,
    },
} as const;

export function asset(path: string): string {
    return `${import.meta.env.BASE_URL}assets/${path}`;
}
