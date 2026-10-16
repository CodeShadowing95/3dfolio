import { track } from './analytics';

const STORAGE_KEY = 'visiteur';
const MAX_LENGTH = 40;

// Nettoie le nom reçu dans le lien : lettres, chiffres, espaces et & ' . - uniquement
const clean = (value) =>
    value
        .replace(/[^\p{L}\p{N} &'.-]/gu, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, MAX_LENGTH);

const read = (fn) => {
    try {
        return fn();
    } catch {
        return null;
    }
};

// Entreprise passée dans le lien (ex : patrktech.com/?pour=Capgemini).
// Gardée pour la session, pour rester affichée après la visite d'une fiche projet.
export const getVisitorCompany = () => {
    if (typeof window === 'undefined') return null;

    const fromUrl = clean(new URLSearchParams(window.location.search).get('pour') ?? '');
    if (fromUrl) {
        const isNew = read(() => sessionStorage.getItem(STORAGE_KEY)) !== fromUrl;
        read(() => sessionStorage.setItem(STORAGE_KEY, fromUrl));
        // Une seule fois par session : permet de savoir quelle entreprise a ouvert le lien
        if (isNew) track('visite-personnalisee', { entreprise: fromUrl });
        return fromUrl;
    }

    return read(() => sessionStorage.getItem(STORAGE_KEY)) || null;
};
