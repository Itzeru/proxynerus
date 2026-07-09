// DOCUMENTACIÓ SCRYFALL
/* https://scryfall.com/docs/api/ */

import { CardLayout, type Card } from "../models/card.model";
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
                ...this.mapCard(c, scryfallCard.layout)
            }));
        } else {
            return [this.mapCard(scryfallCard)];
        };
    }

    private static mapCard(scryfallCard: ScryfallCard, layout: string = 'normal'): Card {
        return {
            name_og : scryfallCard.name,
            name: scryfallCard.printed_name ?? scryfallCard.name,
            layout: this.mapCardLayout(scryfallCard.layout ?? layout),
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

    private static mapCardLayout(scryfallLayout: string): CardLayout {
        switch(scryfallLayout){
            case 'normal':
                return CardLayout.NORMAL;
            case 'split':
                return CardLayout.SPLIT;
            case 'flip':
                return CardLayout.FLIP;
            case 'transform':
                return CardLayout.TRANSFORM;
            case 'modal_dfc':
                return CardLayout.MODAL_DFC;
            case 'meld':
                return CardLayout.MELD;
            case 'leveler':
                return CardLayout.LEVELER;
            case 'class':
                return CardLayout.CLASS;
            case 'case':
                return CardLayout.CASE;
            case 'saga':
                return CardLayout.SAGA;
            case 'adventure':
                return CardLayout.ADVENTURE;
            case 'prepare':
                return CardLayout.PREPARE;
            case 'mutate':
                return CardLayout.MUTATE;
            case 'prototype':
                return CardLayout.PROTOTYPE;
            case 'battle':
                return CardLayout.BATTLE;
            case 'planar':
                return CardLayout.PLANAR;
            case 'scheme':
                return CardLayout.SCHEME;
            case 'token':
                return CardLayout.TOKEN;
            case 'emblem':
                return CardLayout.EMBLEM;
            default:
                return CardLayout.OTHER;
        }
    }
}