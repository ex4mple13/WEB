class WordLearningView {
    constructor() {
        this.currentWordElement = document.getElementById('currentWord');
        this.currentTranslationElement = document.getElementById('currentTranslation');
        this.showTranslationBtn = document.getElementById('showTranslationBtn');
        this.previousWordBtn = document.getElementById('previousWordBtn');
        this.nextLearningWordBtn = document.getElementById('nextLearningWordBtn');
        this.knowledgeWordDisplay = document.getElementById('knowledgeWordDisplay');
        this.userTranslationInput = document.getElementById('answerInput');
        this.checkKnowledgeBtn = document.getElementById('checkAnswerBtn');
        this.correctBadge = document.getElementById('correctBadge');
        this.incorrectBadge = document.getElementById('incorrectBadge');
        this.nextKnowledgeWordBtn = document.getElementById('nextForCheckBtn');
        this.studiedWordsList = document.getElementById('studiedWordsList');
    }

    renderLearningWord(englishWord) {
        if (this.currentWordElement) {
            this.currentWordElement.textContent = englishWord;
        }
        if (this.currentTranslationElement) {
            this.currentTranslationElement.style.display = 'none'; // Hide translation by default
        }
    }

    showLearningTranslation(russianTranslation) {
        if (this.currentTranslationElement) {
            this.currentTranslationElement.textContent = russianTranslation;
            this.currentTranslationElement.style.display = 'block'; // Show translation
        }
    }

    bindShowTranslation(handler) {
        if (this.showTranslationBtn) {
            this.showTranslationBtn.addEventListener('click', handler);
        }
    }
    bindPreviousLearningWord(handler) {
        if (this.previousWordBtn) {
            this.previousWordBtn.addEventListener('click', handler);
        }
    }
    bindNextLearningWord(handler) {
        if (this.nextLearningWordBtn) {
            this.nextLearningWordBtn.addEventListener('click', handler);
        }
    }

    renderKnowledgeWord(englishWord) {
        if (this.knowledgeWordDisplay) {
            this.knowledgeWordDisplay.textContent = `How to translate "${englishWord}"?`;
        }
        if (this.userTranslationInput) {
            this.userTranslationInput.value = '';
            this.userTranslationInput.disabled = false;
        }
        if (this.correctBadge) this.correctBadge.style.display = 'none';
        if (this.incorrectBadge) this.incorrectBadge.style.display = 'none';
        if (this.checkKnowledgeBtn) this.checkKnowledgeBtn.disabled = false;
        if (this.nextKnowledgeWordBtn) this.nextKnowledgeWordBtn.style.display = 'none'; 
    }

    getUserKnowledgeTranslation() {
        return this.userTranslationInput ? this.userTranslationInput.value.trim() : '';
    }

    displayKnowledgeFeedback(isCorrect, correctTranslation = '') {
        if (isCorrect) {
            if (this.correctBadge) this.correctBadge.style.display = 'inline-block';
            if (this.incorrectBadge) this.incorrectBadge.style.display = 'none';
        } else {
            if (this.correctBadge) this.correctBadge.style.display = 'none';
            if (this.incorrectBadge) {
                this.incorrectBadge.textContent = `Incorrect. Correct: "${correctTranslation}"`;
                this.incorrectBadge.style.display = 'inline-block';
            }
        }
        if (this.userTranslationInput) this.userTranslationInput.disabled = true;
        if (this.checkKnowledgeBtn) this.checkKnowledgeBtn.disabled = true;
        if (this.nextKnowledgeWordBtn) this.nextKnowledgeWordBtn.style.display = 'block'; 
    }

    bindCheckKnowledgeAnswer(handler) {
        if (this.checkKnowledgeBtn) {
            this.checkKnowledgeBtn.addEventListener('click', handler);
        }
    }

    bindNextKnowledgeWord(handler) {
        if (this.nextKnowledgeWordBtn) {
            this.nextKnowledgeWordBtn.addEventListener('click', handler);
        }
    }

    renderStudiedWords(words) {
        if (this.studiedWordsList) {
            this.studiedWordsList.innerHTML = '';
            words.forEach(word => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <span class="badge bg-secondary rounded-pill me-2">Eng.</span> ${word.english}
                    <span class="badge bg-secondary rounded-pill ms-auto me-2">Rus.</span> ${word.russian}
                `;
                this.studiedWordsList.appendChild(li);
            });
        }
    }
}