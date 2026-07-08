// DOCUMENTACIÓ SCRYFALL
/* https://scryfall.com/docs/api/ */

import type { Card } from "../models/card.model";
import type { ScryfallCard } from "../models/scryfall-card.model";

export class ScryfallService {

    static async searchCards(
        cardName: string,
        language: string = "en"
    ): Promise<Card[]> {
        const url =
        `https://api.scryfall.com/cards/search?q=name=${encodeURIComponent(cardName)} lang:${language}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Scryfall returned ${response.status}`);
        }

        const json = await response.json();

        const cards: Card[] = [];
        json.data.forEach((scryfallCard: ScryfallCard) => cards.push(...this.mapCards(scryfallCard)));
        return cards;
    }

    private static mapCards(
        scryfallCard: ScryfallCard
    ): Card[] {
        if (scryfallCard.card_faces?.length) {
            return scryfallCard.card_faces!.map(c => ({
                ...this.mapCard(c, scryfallCard.lang)
            }));
        } else {
            return [this.mapCard(scryfallCard)];
        };
    }

    private static mapCard(scryfallCard: ScryfallCard, lang?: string): Card {
        return {
            name_og : scryfallCard.name,
            name: scryfallCard.printed_name ?? scryfallCard.name,
            lang: lang ?? scryfallCard.lang,
            mana: scryfallCard.mana_cost,
            type: scryfallCard.printed_type_line ?? scryfallCard.type_line,
            rules: scryfallCard.printed_text ?? scryfallCard.oracle_text,
            power: scryfallCard.power,
            toughness: scryfallCard.toughness,
            loyalty: scryfallCard.loyalty,
            defense: scryfallCard.defense,
            artist: scryfallCard.artist,
            art: scryfallCard.image_uris?.art_crop
        };
    }
}