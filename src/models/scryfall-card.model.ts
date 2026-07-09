// DOCUMENTACIÓ SCRYFALL
/* https://scryfall.com/docs/api/cards */

export interface ScryfallCard {
    /* Principals */
    name: string;
    layout: string;
    mana_cost?: string;
    type_line?: string;
    oracle_text?: string;
    flavor_text?: string
    card_faces?: ScryfallCard[]; // card_faces[0] -> frontal / card_faces[1] -> revers

    /* Segons tipus */
    power?: string; // Criatures
    toughness?: string; // Criatures
    loyalty?: string; // Planeswalkers
    defense?: string, // Battles

    /* Art */
    artist?: string,
    image_uris?: {art_crop: string},

    /* Idioma */
    printed_name?: string,
    printed_text?: string,
    printed_type_line?: string
}