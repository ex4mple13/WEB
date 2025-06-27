// js/controller/ProfileController.js

class ProfileController {
    constructor(userModel, profileView) {
        this.userModel = userModel;
        this.profileView = profileView;
    }

    init() {
        const currentUser = this.userModel.getCurrentUser();
        if (!currentUser) {
            // If no user is logged in, redirect to login page
            window.location.href = 'login.html';
            return;
        }
        this.profileView.renderProfile(currentUser);

        this.profileView.bindDeleteAccount(this.handleDeleteAccount.bind(this));
        this.profileView.bindChangePassword(this.handleChangePassword.bind(this));
        this.profileView.bindEditProfile(this.handleEditProfile.bind(this));
    }

    handleDeleteAccount() {
        if (confirm('Are you sure you want to delete your account? This action is irreversible.')) {
            const currentUser = this.userModel.getCurrentUser();
            if (currentUser && this.userModel.deleteUser(currentUser.email)) {
                this.profileView.showMessage('Your account has been successfully deleted.', 'success');
                setTimeout(() => {
                    window.location.href = 'registration.html';
                }, 1500);
            } else {
                this.profileView.showMessage('An error occurred while deleting the account.', 'danger');
            }
        }
    }

    // New: handle password change
    handleChangePassword() {
        const currentUser = this.userModel.getCurrentUser();
        if (!currentUser) {
            this.profileView.showMessage('No user logged in.', 'danger');
            return;
        }

        const passwordData = this.profileView.promptForPasswordChange();
        if (!passwordData) { // User cancelled prompt
            this.profileView.showMessage('Password change cancelled.', 'info');
            return;
        }

        const { currentPassword, newPassword, confirmNewPassword } = passwordData;

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            this.profileView.showMessage('All password fields must be filled.', 'warning');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            this.profileView.showMessage('New passwords do not match.', 'danger');
            return;
        }

        if (newPassword === currentPassword) {
            this.profileView.showMessage('New password cannot be the same as the current password.', 'warning');
            return;
        }

        if (this.userModel.updatePassword(currentUser.email, currentPassword, newPassword)) {
            this.profileView.showMessage('Password successfully updated!', 'success');
        } else {
            this.profileView.showMessage('Failed to update password. Check your current password.', 'danger');
        }
    }

    // New: handle profile details edit
    handleEditProfile() {
        const currentUser = this.userModel.getCurrentUser();
        if (!currentUser) {
            this.profileView.showMessage('No user logged in.', 'danger');
            return;
        }

        const newProfileData = this.profileView.promptForProfileEdit(currentUser);
        if (!newProfileData) { // User cancelled prompt
            this.profileView.showMessage('Profile edit cancelled.', 'info');
            return;
        }

        // Basic validation for prompts - check if any field is explicitly made empty by user
        if (newProfileData.name === '' || newProfileData.surname === '' || newProfileData.birthDate === '' || newProfileData.sex === '') {
            this.profileView.showMessage('Please ensure all profile fields are filled.', 'warning');
            return;
        }


        // Email is not editable via this simple prompt
        const updated = this.userModel.updateUser(currentUser.email, {
            name: newProfileData.name,
            surname: newProfileData.surname,
            birthDate: newProfileData.birthDate,
            sex: newProfileData.sex
        });

        if (updated) {
            this.profileView.showMessage('Profile updated successfully!', 'success');
            this.profileView.renderProfile(this.userModel.getCurrentUser()); // Re-render profile with new data
        } else {
            this.profileView.showMessage('Failed to update profile.', 'danger');
        }
    }
}