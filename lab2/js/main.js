document.addEventListener('DOMContentLoaded', () => {
    if (typeof UserModel === 'undefined' || typeof WordModel === 'undefined' ||
        typeof AuthView === 'undefined' || typeof ProfileView === 'undefined' || typeof WordLearningView === 'undefined' ||
        typeof AuthController === 'undefined' || typeof ProfileController === 'undefined' || typeof WordLearningController === 'undefined') {
        console.error('One or more MVC classes are not defined. Ensure all script files are loaded in the correct order.');
        return;
    }

    const userModel = new UserModel();
    const wordModel = new WordModel();

    const path = window.location.pathname;

    if (path.includes('registration.html')) {
        const authView = new AuthView();
        const authController = new AuthController(userModel, authView);
        authController.init();
    } else if (path.includes('login.html')) {
        const authView = new AuthView();
        const authController = new AuthController(userModel, authView);
        authController.init();
    } else if (path.includes('profile.html')) {
        const profileView = new ProfileView();
        const profileController = new ProfileController(userModel, profileView);
        profileController.init();
    } else if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        const wordLearningView = new WordLearningView();
        const wordLearningController = new WordLearningController(wordModel, wordLearningView);
        wordLearningController.init();
    }
});