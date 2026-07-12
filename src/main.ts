import { ScryfallService } from "./services/scryfall.service";

async function main(): Promise<void> {
    const app = document.getElementById("app");
    if (!app) {
        throw new Error("App element not found.");
    }

    try {
        const result = await ScryfallService.searchCards("Ral Zarek");
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}

main();