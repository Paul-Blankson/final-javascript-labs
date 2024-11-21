class PasswordGenerator {
    constructor() {
        this.passwordDisplay = document.querySelector('.password__input');
        this.copyButton = document.querySelector('.password__copy');
        this.generateButton = document.querySelector('.password__generate');
        this.lengthSlider = document.querySelector('.length__slider');
        this.lengthValue = document.querySelector('.length__value');
        this.checkboxes = document.querySelectorAll('.options__checkbox');
        this.strengthText = document.querySelector('.strength__text');
        this.strengthBars = document.querySelectorAll('.strength__bar');

        this.characterSets = {
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };

    }
    updateLength() {
        const length = this.lengthSlider.value;
        this.lengthValue.textContent = length;
    }

}