class UserModel {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    saveUser(userData) {
        if (this.users.some(user => user.email === userData.email)) {
            console.warn('User with this email already exists.');
            return false;
        }
        this.users.push(userData);
        localStorage.setItem('users', JSON.stringify(this.users));
        console.log('User registered:', userData.email);
        return true;
    }

    authenticateUser(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            console.log('User authenticated:', user.email);
            return user;
        }
        console.warn('Authentication failed for:', email);
        return null;
    }

    setCurrentUser(user) {
        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('currentUser');
        }
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    }

    updateUser(email, newData) {
        const index = this.users.findIndex(user => user.email === email);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...newData };
            localStorage.setItem('users', JSON.stringify(this.users));
            if (this.getCurrentUser() && this.getCurrentUser().email === email) {
                this.setCurrentUser(this.users[index]);
            }
            console.log('User updated:', email);
            return true;
        }
        return false;
    }

    updatePassword(email, currentPassword, newPassword) {
        const index = this.users.findIndex(user => user.email === email);
        if (index === -1) {
            console.warn('User not found for password update:', email);
            return false;
        }

        const user = this.users[index];
        if (user.password !== currentPassword) {
            console.warn('Current password mismatch for user:', email);
            return false;
        }

        user.password = newPassword;
        localStorage.setItem('users', JSON.stringify(this.users));
        if (this.getCurrentUser() && this.getCurrentUser().email === email) {
            this.setCurrentUser(user);
        }
        console.log('Password updated for user:', email);
        return true;
    }

    deleteUser(email) {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.email !== email);
        if (this.users.length < initialLength) {
            localStorage.setItem('users', JSON.stringify(this.users));
            if (this.getCurrentUser() && this.getCurrentUser().email === email) {
                this.setCurrentUser(null);
            }
            console.log('User deleted:', email);
            return true;
        }
        return false;
    }
}