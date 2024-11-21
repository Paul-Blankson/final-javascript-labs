class PasswordGenerator {
  constructor() {
    this.passwordDisplay = document.querySelector(".password__input");
    this.copyButton = document.querySelector(".password__copy");
    this.generateButton = document.querySelector(".password__generate");
    this.lengthSlider = document.querySelector(".length__slider");
    this.lengthValue = document.querySelector(".length__value");
    this.checkboxes = document.querySelectorAll(".options__checkbox");
    this.strengthText = document.querySelector(".strength__text");
    this.strengthBars = document.querySelectorAll(".strength__bar");

    this.characterSets = {
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    };

    this.init();
  }
  updateLength() {
    const length = this.lengthSlider.value;
    this.lengthValue.textContent = length;
    this.updateSliderBackground();
  }

  getSelectedCharacterTypes() {
    return [...this.checkboxes].reduce((types, checkbox, index) => {
      if (checkbox.checked) {
        switch (index) {
          case 0:
            types.push("uppercase");
            break;
          case 1:
            types.push("lowercase");
            break;
          case 2:
            types.push("numbers");
            break;
          case 3:
            types.push("symbols");
            break;
        }
      }
      return types;
    }, []);
  }

  generateRandomCharacter(characterSet) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    return characterSet[randomIndex];
  }

  generatePassword() {
    const length = +this.lengthSlider.value;
    const selectedTypes = this.getSelectedCharacterTypes();

    if (selectedTypes.length === 0) {
      alert("Please select at least one character type");
      return;
    }

    const combinedCharSet = selectedTypes
      .map((type) => this.characterSets[type])
      .join("");

    const password = selectedTypes.map((type) =>
      this.generateRandomCharacter(this.characterSets[type])
    );

    // Fill remaining length
    while (password.length < length) {
      password.push(this.generateRandomCharacter(combinedCharSet));
    }

    // Shuffle password
    const shuffledPassword = this.shuffleArray(password).join("");

    this.passwordDisplay.value = shuffledPassword;

    this.calculatePasswordStrength(shuffledPassword);
  }

  // Shuffle array using Fisher-Yates algorithm
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  calculatePasswordStrength(password) {
    const length = password.length;
    const selectedTypes = this.getSelectedCharacterTypes();

    let strength = "TOO WEAK!";
    let barCount = 1;

    if (length >= 12 && selectedTypes.length >= 3) {
      strength = "STRONG";
      barCount = 4;
    } else if (length >= 8 && selectedTypes.length >= 2) {
      strength = "MEDIUM";
      barCount = 3;
    } else if (length >= 8 && selectedTypes.length === 1) {
      strength = "WEAK";
      barCount = 2;
    }

    this.strengthText.textContent = strength;
    this.updateStrengthBars(strength, barCount);
  }

  updateStrengthBars(strength, count) {
    this.strengthBars.forEach((bar, index) => {
      bar.className = "strength__bar";

      if (index < count) {
        switch (strength) {
          case "STRONG":
            bar.classList.add("strength__bar--strong");
            break;
          case "MEDIUM":
            bar.classList.add("strength__bar--medium");
            break;
          case "WEAK":
            bar.classList.add("strength__bar--week");
            break;
          case "TOO WEAK!":
            bar.classList.add("strength__bar--too-week");
            break;
        }
      } else {
        bar.classList.add("strength__bar--not-filled");
      }
    });
  }

  init() {
    this.updateLength(); // This is to set the initial text and slider background
    this.lengthSlider.addEventListener("input", this.updateLength.bind(this));
    this.generateButton.addEventListener(
      "click",
      this.generatePassword.bind(this)
    );
    this.copyButton.addEventListener("click", this.copyPassword.bind(this));
  }

  updateSliderBackground() {
    const value = this.lengthSlider.value;
    const min = this.lengthSlider.min || 0;
    const max = this.lengthSlider.max || 100;
    const percentage = ((value - min) * 100) / (max - min);
    this.lengthSlider.style.background = `linear-gradient(to right, var(--color-neon-green) ${percentage}%, var(--color-bg-veryDarkGrey) ${percentage}%)`;
  }

  copyPassword() {
    const password = this.passwordDisplay.value;
    const copyText = this.copyButton.querySelector(".password__copy-text");

    if (password) {
      navigator.clipboard
        .writeText(password)
        .then(() => {
          copyText.classList.add("active");

          setTimeout(() => {
            copyText.classList.remove("active");
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PasswordGenerator();
});
