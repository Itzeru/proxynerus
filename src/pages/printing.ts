import createCardComponent from "./components/card.ts";
import { PDFDocument, rgb } from "pdf-lib";

const picker = document.querySelector<HTMLInputElement>("#image-picker")!;
const uploadCard = document.querySelector<HTMLElement>("#upload-card")!;
const app = document.getElementById("app")!;
const printBtn = document.getElementById("print-btn")!;
let selectedImages: File[] = [];

const MM_TO_PT = 2.83465;
const CARD_WIDTH = 63 * MM_TO_PT;
const CARD_HEIGHT = 88 * MM_TO_PT;
const PAGE_WIDTH = 210 * MM_TO_PT;
const PAGE_HEIGHT = 297 * MM_TO_PT;
const COLS = 3;
const ROWS = 3;
const GRID_WIDTH = CARD_WIDTH * COLS;
const GRID_HEIGHT = CARD_HEIGHT * ROWS;
const MARGIN_X = (PAGE_WIDTH - GRID_WIDTH) / 2;
const MARGIN_Y = (PAGE_HEIGHT - GRID_HEIGHT) / 2;

async function generatePdf(): Promise<void> {
  const renderedCards = app.querySelectorAll<HTMLElement>(".rendered-card");

  const entries: { file: File; copies: number }[] = selectedImages.map(
    (file, i) => {
      const input =
        renderedCards[i]?.querySelector<HTMLInputElement>("#copies");
      const copies = input ? parseInt(input.value, 10) || 1 : 1;
      return { file, copies };
    },
  );

  const expanded: File[] = entries.flatMap(({ file, copies }) =>
    Array(copies).fill(file),
  );

  const pdfDoc = await PDFDocument.create();
  const cardsPerPage = COLS * ROWS;

  for (let i = 0; i < expanded.length; i++) {
    const positionOnPage = i % cardsPerPage;

    if (positionOnPage === 0) {
      pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    }

    const page = pdfDoc.getPage(pdfDoc.getPageCount() - 1);
    const col = positionOnPage % COLS;
    const row = Math.floor(positionOnPage / COLS);
    const x = MARGIN_X + col * CARD_WIDTH;
    const y = PAGE_HEIGHT - MARGIN_Y - (row + 1) * CARD_HEIGHT;

    const imageBytes = await expanded[i].arrayBuffer();
    const image = await pdfDoc.embedPng(imageBytes);

    page.drawImage(image, { x, y, width: CARD_WIDTH, height: CARD_HEIGHT });
    page.drawRectangle({
      x,
      y,
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderColor: rgb(0, 0, 0),
      borderWidth: 0.5,
      opacity: 0,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([new Uint8Array(pdfBytes).buffer], {
    type: "application/pdf",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "proxynerusPDF.pdf";
  link.click();

  URL.revokeObjectURL(url);
}

printBtn.addEventListener("click", () => {
  generatePdf();
});

uploadCard.addEventListener("click", () => picker.click());

picker.addEventListener("change", () => {
  const files = picker.files;
  if (!files) return;

  selectedImages = Array.from(files).filter(
    (file) => file.type === "image/png",
  );

  app.querySelectorAll(".rendered-card").forEach((el) => el.remove());

  selectedImages.forEach((file) => {
    const imageUrl = URL.createObjectURL(file);
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("rendered-card");
    app.appendChild(cardContainer);
    createCardComponent(cardContainer, file.name.split(".")[0], imageUrl);
  });
});
