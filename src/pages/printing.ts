import createCardComponent from "./components/card";
import { PDFDocument } from "pdf-lib";

const picker = document.querySelector<HTMLInputElement>("#image-picker")!;
const uploadCard = document.querySelector<HTMLElement>("#upload-card")!;
const app = document.getElementById("app")!;
const printBtn = document.getElementById("print-btn")!;
let selectedImages: File[] = [];

printBtn.addEventListener("click", () => {
  return;
}); //TODO: Implementar PDF
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
