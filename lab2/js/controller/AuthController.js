// js/controller/AuthController.js

class AuthController {
    constructor(userModel, authView) {
        this.userModel = userModel;
        this.authView = authView;
    }

    init() {
        const path = window.location.pathname;
        if (path.includes('registration.html')) {
            this.authView.bindRegister(this.handleRegister.bind(this));
        } else if (path.includes('login.html')) {
            this.authView.bindLogin(this.handleLogin.bind(this));
        }
    }

    handleRegister(event) {
        event.preventDefault();
        const userData = this.authView.getRegistrationData();

        if (userData) {
            if (!userData.name || !userData.surname || !userData.email || !userData.password || !userData.confirmPassword || !userData.sex || !userData.birthDate) {
                this.authView.showMessage('Please fill in all fields.', 'warning');
                return;
            }
            if (userData.password !== userData.confirmPassword) {
                this.authView.showMessage('Passwords do not match.', 'danger');
                return;
            }

            const isSaved = this.userModel.saveUser(userData);
            if (isSaved) {
                this.authView.showMessage('Registration successful! You can now log in.', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                this.authView.showMessage('User with this email already exists.', 'danger');
            }
        } else {
            this.authView.showMessage('Error getting registration data.', 'danger');
        }
    }

    handleLogin(event) {
        event.preventDefault();
        const loginData = this.authView.getLoginData();

        if (loginData && loginData.email && loginData.password) {
            const user = this.userModel.authenticateUser(loginData.email, loginData.password);
            if (user) {
                this.userModel.setCurrentUser(user);
                this.authView.showMessage('Login successful!', 'success');
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 1500);
            } else {
                this.authView.showMessage('Invalid email or password.', 'danger');
            }
        } else {
            this.authView.showMessage('Please enter email and password.', 'warning');
        }
    }
}