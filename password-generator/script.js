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
  }
  updateLength() {
    const length = this.lengthSlider.value;
    this.lengthValue.textContent = length;
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

}
