// js/view/AuthView.js

class AuthView {
    constructor() {
        this.registrationForm = document.getElementById('registrationForm');
        this.loginForm = document.getElementById('loginForm');
        this.messageContainer = document.getElementById('messageContainer');
    }

    getRegistrationData() {
        if (!this.registrationForm) return null;
        const name = this.registrationForm.querySelector('#inputName').value;
        const surname = this.registrationForm.querySelector('#inputSurname').value;
        const email = this.registrationForm.querySelector('#inputEmail').value;
        const password = this.registrationForm.querySelector('#inputPassword').value;
        const confirmPassword = this.registrationForm.querySelector('#inputConfirmPassword').value;
        const sex = this.registrationForm.querySelector('#inputSex').value;
        const birthDate = this.registrationForm.querySelector('#inputBirthDate').value;
        return { name, surname, email, password, confirmPassword, sex, birthDate };
    }

    bindRegister(handler) {
        if (this.registrationForm) {
            this.registrationForm.addEventListener('submit', handler);
        }
    }

    getLoginData() {
        if (!this.loginForm) return null;
        const email = this.loginForm.querySelector('#inputEmail').value;
        const password = this.loginForm.querySelector('#inputPassword').value;
        return { email, password };
    }

    bindLogin(handler) {
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', handler);
        }
    }

    showMessage(message, type = 'success') {
        if (this.messageContainer) {
            this.messageContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
            setTimeout(() => {
                this.messageContainer.innerHTML = '';
            }, 5000);
        } else {
            alert(message);
        }
    }
}