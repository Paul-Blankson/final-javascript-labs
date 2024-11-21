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

generatePassword() {
    const length = +this.lengthSlider.value;
    const selectedTypes = this.getSelectedCharacterTypes();

    if (selectedTypes.length === 0) {
        alert('Please select at least one character type');
        return;
    }

    const combinedCharSet = selectedTypes
        .map(type => this.characterSets[type])
        .join('');

    const password = selectedTypes.map(type => 
        this.generateRandomCharacter(this.characterSets[type])
    );

    // Fill remaining length
    while (password.length < length) {
        password.push(
            this.generateRandomCharacter(combinedCharSet)
        );
    }

    // Shuffle password
    const shuffledPassword = this.shuffleArray(password).join('');
    
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
    
    let strength = 'TOO WEAK!';
    let barCount = 0;

    if (length >= 12 && selectedTypes.length >= 3) {
        strength = 'STRONG';
        barCount = 4;
    } else if (length >= 8 && selectedTypes.length >= 2) {
        strength = 'MEDIUM';
        barCount = 3;
    } else if (length >= 8 && selectedTypes.length === 1) {
        strength = 'WEAK';
        barCount = 2;
    }
    else if (length < 8 ) {
        strength = 'TOO WEAK!';
        barCount = 1;
    }

    this.strengthText.textContent = strength;
    this.updateStrengthBars(barCount);
}


}
