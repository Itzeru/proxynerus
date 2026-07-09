export interface Card {
    /* Principals */
    name_og: string;
    name: string;
    layout: CardLayout;
    mana?: string;
    type?: string;
    rules?: string;

    /* Segons tipus */
    power?: string; // Creature
    toughness?: string; // Creature
    loyalty?: string; // Planeswalker
    defense?: string; // Battles

    /* Habilitats */
    // abilities?: string[]; // Com definir? Planeswalkers, sagues, classes/talents, level ups...

    /* Art */
    artist?: string,
    art?: string // uri per la imatge d'Scryfall
}

export enum CardLayout {
    NORMAL,
    SPLIT,
    FLIP,
    TRANSFORM,
    MODAL_DFC,
    MELD,
    LEVELER,
    CLASS,
    CASE,
    SAGA,
    ADVENTURE,
    PREPARE,
    MUTATE,
    PROTOTYPE,
    BATTLE,
    PLANAR,
    SCHEME,
    TOKEN,
    EMBLEM,
    OTHER
}