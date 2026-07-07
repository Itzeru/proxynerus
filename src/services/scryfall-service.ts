/**
 * searchCards
 */
export async function searchCards(cardName: string): Promise<any> {
    const language = "en";

    const url =
        `https://api.scryfall.com/cards/search` +
        `?order=released` +
        `&include_extras=true` +
        `&q=name=${encodeURIComponent(cardName)} lang:${language}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Scryfall returned ${response.status}`);
    }

    return await response.json();
}