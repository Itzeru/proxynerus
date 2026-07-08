import { searchCards } from "./services/scryfall.service";

async function main(): Promise<void> {
    try {
        const result = await searchCards("Ral, Monsoon Mage");
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}

main();