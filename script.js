const filters = document.querySelectorAll("[data-filter]");
const equipmentCards = document.querySelectorAll("[data-area]");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const wantedArea = button.dataset.filter;
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    equipmentCards.forEach((card) => {
      const showCard = wantedArea === "all" || card.dataset.area === wantedArea;
      card.classList.toggle("hidden", !showCard);
    });
  });
});

const planner = document.querySelector("#planner-form");

if (planner) {
  const resultTitle = document.querySelector("#result-title");
  const resultTime = document.querySelector("#result-time");
  const resultCost = document.querySelector("#result-cost");
  const resultNote = document.querySelector("#result-note");

  planner.addEventListener("submit", (event) => {
    event.preventDefault();

    const equipment = document.querySelector("#equipment");
    const time = document.querySelector("#time").value;
    const hours = Number(document.querySelector("#hours").value);
    const goal = document.querySelector("#goal").value;
    const choice = equipment.options[equipment.selectedIndex];
    const price = Number(choice.dataset.price);
    const endHour = Number(time) + hours;

    resultTitle.textContent = choice.textContent;
    resultTime.textContent = `${time}:00 to ${endHour}:00 · ${goal}`;
    resultCost.textContent = `¥${price * hours}`;
    resultNote.textContent = hours === 2
      ? "Take a short break after the first hour. Drink water before you start again."
      : "One hour is a good start. Leave time to clean the equipment after use.";
  });

  planner.addEventListener("reset", () => {
    window.setTimeout(() => {
      resultTitle.textContent = "Your plan will appear here";
      resultTime.textContent = "Choose the equipment, time, hours and goal.";
      resultCost.textContent = "¥0";
      resultNote.textContent = "This tool only makes a plan. It does not save or send any data.";
    }, 0);
  });
}

