

export default function createCardComponent(container: HTMLElement, name: string, imageUrl?: string, initialCopies = 1) : void {
  let copies = initialCopies;

  container.innerHTML = `
    <div class="card">
      <img src="${imageUrl}" />
      <h4>${name}</h4>
      <div class="controls">
        <button id="minus">-</button>
        <input type="text" id="copies" value="${copies}" min="1" readonly />
        <button id="plus">+</button>
      </div>
    </div>
  `;

  const input = container.querySelector<HTMLInputElement>('#copies')!;
  const minusBtn = container.querySelector<HTMLButtonElement>('#minus')!;
  const plusBtn = container.querySelector<HTMLButtonElement>('#plus')!;

  function update(next: number) {
    copies = Math.max(1, next);
    input.value = String(copies);
  }

  minusBtn.addEventListener('click', () => update(copies - 1));
  plusBtn.addEventListener('click', () => update(copies + 1));
  input.addEventListener('change', () => update(parseInt(input.value)));
}