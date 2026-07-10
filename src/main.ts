import createCardComponent from "./pages/components/card";
import { ScryfallService } from "./services/scryfall.service";

async function main(): Promise<void> {
    const app = document.getElementById("app");
    if (!app) {
        throw new Error("App element not found.");
    }

    try {
        const result = await ScryfallService.searchCards("Goblin");
        console.log(result);
        // Testing component card.ts
        for (let i = 0; i < result.length; i++) {
            const card = result[i];
            const cardContainer = document.createElement("div");
            app.appendChild(cardContainer);
            createCardComponent(cardContainer, card.name, card.art ?? '');
        }
    }
    catch (error) {
        console.error(error);
    }
}

main();