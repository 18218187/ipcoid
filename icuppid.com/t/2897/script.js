let minRangeValueGap = 2;
let minAge = 18;

function isMobileDevice() {
  const isMobileByWidth = window.innerWidth <= 768;

  return isMobileByWidth;
}

let minRange, maxRange, minPercentage, maxPercentage;
let range,
  minval,
  maxval,
  minRangeInput,
  maxRangeInput,
  rangeInput,
  rightSectionStep3,
  images,
  buttons,
  interestButtons,
  counter,
  ageButtons,
  usernameInput,
  emailInput,
  passwordInput,
  togglePasswordButton;

if (isMobileDevice()) {
  //console.log(" Mobile");

  //MOBILE
  rangeInput = document.querySelectorAll(
    "#min_range_input_mobile, #max_range_input_mobile"
  );
  range = document.getElementById("range_track_mobile");
  minval = document.getElementById("min_value_mobile");
  maxval = document.getElementById("max_value_mobile");
  minRangeInput = document.getElementById("min_range_input_mobile");
  maxRangeInput = document.getElementById("max_range_input_mobile");

  buttons = document.querySelectorAll(".option-button-mobile");
  images = {
    trans: document.getElementById("image-trans-mobile"),
    women: document.getElementById("image-women-mobile"),
    both: document.getElementById("image-both-mobile"),
  };

  interestButtons = document.querySelectorAll(".interest-btn-mobile");
  counter = document.querySelector(".counter-mobile");

  ageButtons = document.querySelectorAll(".age-button-mobile");

  usernameInput = document.getElementById("username-input-mobile");
  emailInput = document.getElementById("email-input-mobile");

  passwordInput = document.getElementById("password-input-mobile");
  togglePasswordButton = document.getElementById("togglePassword-mobile");
} else {
  //console.log("Desktop");

  //DESKTOP
  rangeInput = document.querySelectorAll(
    "#min_range_input_desktop, #max_range_input_desktop"
  );
  range = document.getElementById("range_track_desktop");
  minval = document.getElementById("min_value_desktop");
  maxval = document.getElementById("max_value_desktop");
  minRangeInput = document.getElementById("min_range_input_desktop");
  maxRangeInput = document.getElementById("max_range_input_desktop");

  (rightSectionStep3 = document.getElementById("right-section-step3")),
    (buttons = document.querySelectorAll(".option-button-desktop"));
  images = {
    trans: document.getElementById("image-trans-desktop"),
    women: document.getElementById("image-women-desktop"),
    both: document.getElementById("image-both-desktop"),
  };

  interestButtons = document.querySelectorAll(".interest-btn");
  counter = document.querySelector(".counter");

  ageButtons = document.querySelectorAll(".age-button-desktop");

  usernameInput = document.getElementById("username-input-desktop");

  emailInput = document.getElementById("email-input-desktop");

  passwordInput = document.getElementById("password-input-desktop");
  togglePasswordButton = document.getElementById("togglePassword-desktop");
}

const minRangeFill = () => {
  range.style.left = (minRangeInput.value / minRangeInput.max) * 100 + "%";
};
const maxRangeFill = () => {
  range.style.right =
    100 - (maxRangeInput.value / maxRangeInput.max) * 100 + "%";
};

const setMinValueOutput = () => {
  minRange = parseInt(minRangeInput.value) + minAge;
  minval.innerHTML = minRange;
};
const setMaxValueOutput = () => {
  maxRange = parseInt(maxRangeInput.value) + minAge;
  maxval.innerHTML = maxRange;
};

setMinValueOutput();
setMaxValueOutput();
minRangeFill();
maxRangeFill();

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    setMinValueOutput();
    setMaxValueOutput();

    minRangeFill();
    maxRangeFill();

    if (maxRange - minRange < minRangeValueGap) {
      if (e.target.className === "min") {
        minRangeInput.value = maxRange - minRangeValueGap - minAge;
        setMinValueOutput();
        minRangeFill();
        e.target.style.zIndex = "2";
      } else {
        maxRangeInput.value = minRange + minRangeValueGap - minAge;
        e.target.style.zIndex = "2";
        setMaxValueOutput();
        maxRangeFill();
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");

      const id = button.id.replace("btn-", "image-");
      Object.values(images).forEach((img) => img.classList.add("hidden"));
      images[id.split("-")[1]].classList.remove("hidden");

      if (!isMobileDevice()) {
        rightSectionStep3.classList.remove("background-women-color");
        rightSectionStep3.classList.remove("background-trans-color");
        rightSectionStep3.classList.remove("background-both-color");

        const className = button.id.replace("btn-", "background-") + "-color";
        //console.log(className);
        rightSectionStep3.classList.add(className);
      }
    });
  });
});

let maxValue = 56320;
let totalValue = 0;
let activeButtons = 0;

function animateCounter(start, end) {
  const duration = 10;
  const stepTime = Math.abs(Math.floor(duration / (end - start)));
  let current = start;

  const step = () => {
    current += start < end ? 20 : -20;
    counter.textContent = current.toLocaleString();

    if (current !== end) {
      setTimeout(step, stepTime);
    }
  };
  step();
}

interestButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = parseInt(button.dataset.value);

    if (button.classList.contains("active")) {
      button.classList.remove("active");
      activeButtons--;

      if (activeButtons == 0) {
        animateCounter(maxValue - value, maxValue);
        totalValue = 0;
      } else {
        animateCounter(totalValue, totalValue - value);
        totalValue -= value;
      }
    } else {
      button.classList.add("active");
      activeButtons++;

      if (activeButtons == 0) {
        animateCounter(0, value);
        totalValue = value;
      } else {
        animateCounter(totalValue, totalValue + value);
        totalValue += value;
      }
    }
    //console.log("activeButtons ", activeButtons);
    //console.log("totalValue ", totalValue);
    //console.log("maxValue ", maxValue);
  });
});

//AGE RANGE

ageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    ageButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    selectedMaxAge = button.getAttribute("data-max-age");

    angular.element('[ng-controller="utlCtl"]').scope().age = selectedMaxAge;

    //console.log(`Selected max age: ${angular.element('[ng-controller="utlCtl"]').scope().age}`);
  });
});

//USERNAME
let username = "";

usernameInput.addEventListener("input", (event) => {
  username = event.target.value;
  angular.element('[ng-controller="utlCtl"]').scope().username = username;
  //console.log(`Username: ${angular.element('[ng-controller="utlCtl"]').scope().username }`);
});

//EMAIL
let email = "";

emailInput.addEventListener("input", (event) => {
  email = event.target.value;
  angular.element('[ng-controller="utlCtl"]').scope().email = email;
  //console.log(`email: ${angular.element('[ng-controller="utlCtl"]').scope().email }`);
});

let password = "";

togglePasswordButton.addEventListener("click", () => {
  const isPasswordHidden = passwordInput.type === "password";
  passwordInput.type = isPasswordHidden ? "text" : "password";
  togglePasswordButton.textContent = isPasswordHidden ? "🙈" : "👁️";
});

passwordInput.addEventListener("input", (event) => {
  password = event.target.value;
  angular.element('[ng-controller="utlCtl"]').scope().password = password;
  //console.log(`password: ${angular.element('[ng-controller="utlCtl"]').scope().password }`);
});

function addCopyright() {
  const footer = document.querySelector("footer");

  const copyrightDiv = document.createElement("div");

  copyrightDiv.className = "footer-copyright";

  copyrightDiv.textContent = "© Copyright 2024 All rights reserved";

  footer.appendChild(copyrightDiv);
}

function waitForSeconds(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

waitForSeconds(0.3).then(() => {
  addCopyright();
});
