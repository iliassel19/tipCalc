const billInput = document.querySelector(".tip__bill-input");
const tips = document.querySelectorAll(".tip__option");
const tipCustom = document.querySelector(".tip__custom");
const tipInputs = document.querySelector(".tip__inputs");
const peopleNumInput = document.querySelector(".tip__number-input");
const tipValue = document.querySelector(".tip__value");
const totalValue = document.querySelector(".total__value");
const billReset = document.querySelector(".bill__reset");
const error = document.querySelector(".input__error");

let bill, tipChoosen, peopleCount, tipFinal, valueFinal;
bill = 0;
tipChoosen = 0;
peopleCount = 1;
tipFinal = 0;
valueFinal = 0;

billInput.addEventListener("input", function (e) {
  billReset.classList.add("active");
  e.target.classList.add("focus");
  bill = Number(parseFloat(e.target.value).toFixed(2));

  // CalcTip on every change
  calcTip();
});

// Adding active class to the clicked tip
tips.forEach((tip) => {
  tip.addEventListener("click", function () {
    tips.forEach((item) => item.classList.remove("active"));
    tip.classList.add("active");
    tipChoosen = parseFloat(tip.textContent) / 100;
    // CalcTip on every change
    calcTip();
  });
});

// Add Error message for number of people
peopleNumInput.addEventListener("input", function (e) {
  if (parseFloat(e.target.value) < 1) {
    e.target.classList.add("active");
    error.classList.add("active");
  } else {
    e.target.classList.remove("active");
    e.target.classList.add("focus");
    error.classList.remove("active");
  }
  peopleCount = Math.trunc(e.target.value);

  // CalcTip on every change
  calcTip();
});

// Tip Costum
tipCustom.addEventListener("input", function (e) {
  tipChoosen = Math.trunc(e.target.value) / 100;
  // CalcTip on every change
  calcTip();
});

// Reset
const reset = function () {
  bill = 0;
  tipChoosen = 0;
  peopleCount = 1;
  tipFinal = 0;
  valueFinal = 0;
};

billReset.addEventListener("click", function () {
  // Reset all Values that will be used in CalcTip
  reset();
  calcTip();

  // Empty all inputs and remove active classes
  billInput.value = "";
  tips.forEach((tip) => {
    tip.classList.remove("active");
  });
  peopleNumInput.value = "";
  tipCustom.value = "";
  billReset.classList.remove("active");
});

// Calc Tip
const calcTip = function () {
  tipFinal = (bill * tipChoosen) / peopleCount;
  valueFinal = (bill + tipFinal) / peopleCount;
  tipValue.textContent = "$" + tipFinal.toFixed(2);
  totalValue.textContent = "$" + valueFinal.toFixed(2);
};
