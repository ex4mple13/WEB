// js/view/ProfileView.js

class ProfileView {
    constructor() {
        this.profileTableBody = document.getElementById('profileTableBody');
        this.deleteAccountBtn = document.getElementById('deleteAccountBtn');
        this.changePasswordBtn = document.getElementById('changePasswordBtn');
        this.editProfileBtn = document.getElementById('editProfileBtn');
        this.messageContainer = document.getElementById('messageContainer'); // New: for messages on profile page
    }

    renderProfile(userData) {
        if (this.profileTableBody && userData) {
            this.profileTableBody.innerHTML = `
                <tr>
                    <td>${userData.name || 'N/A'}</td>
                    <td>${userData.surname || 'N/A'}</td>
                    <td>${userData.email || 'N/A'}</td>
                    <td>${userData.birthDate || 'N/A'}</td>
                    <td>${userData.sex || 'N/A'}</td>
                </tr>
            `;
        } else if (this.profileTableBody) {
             this.profileTableBody.innerHTML = `<tr><td colspan="5" class="text-center">No user data available. Please login.</td></tr>`;
        }
    }

    bindDeleteAccount(handler) {
        if (this.deleteAccountBtn) {
            this.deleteAccountBtn.addEventListener('click', handler);
        }
    }

    bindChangePassword(handler) {
        if (this.changePasswordBtn) {
            this.changePasswordBtn.addEventListener('click', handler);
        }
    }

    bindEditProfile(handler) {
        if (this.editProfileBtn) {
            this.editProfileBtn.addEventListener('click', handler);
        }
    }

    // New: show message on profile page
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

    // New: get password change data using prompts
    promptForPasswordChange() {
        const currentPassword = prompt("Enter your current password:");
        if (currentPassword === null) return null; // User cancelled

        const newPassword = prompt("Enter your new password:");
        if (newPassword === null) return null;

        const confirmNewPassword = prompt("Confirm your new password:");
        if (confirmNewPassword === null) return null;

        return { currentPassword, newPassword, confirmNewPassword };
    }

    // New: get profile edit data using prompts
    promptForProfileEdit(currentUser) {
        if (!currentUser) return null;

        const newName = prompt("Enter new Name:", currentUser.name || '');
        if (newName === null) return null;

        const newSurname = prompt("Enter new Surname:", currentUser.surname || '');
        if (newSurname === null) return null;

        const newBirthDate = prompt("Enter new Birth Date (YYYY-MM-DD):", currentUser.birthDate || '');
        if (newBirthDate === null) return null;

        // Simple prompt for sex, could be improved with dropdown in a real modal
        const newSex = prompt("Enter new Sex (M/F/O):", currentUser.sex || '');
        if (newSex === null) return null;


        return { name: newName, surname: newSurname, birthDate: newBirthDate, sex: newSex };
    }
}