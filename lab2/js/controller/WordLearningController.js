class WordLearningController {
    constructor(wordModel, wordLearningView) {
        this.wordModel = wordModel;
        this.wordLearningView = wordLearningView;
    }

    init() {
        this.loadLearningWord();
        this.loadKnowledgeWord(); 

        this.wordLearningView.bindShowTranslation(this.handleShowTranslation.bind(this));
        this.wordLearningView.bindPreviousLearningWord(this.handlePreviousLearningWord.bind(this));
        this.wordLearningView.bindNextLearningWord(this.handleNextLearningWord.bind(this));

        this.wordLearningView.bindCheckKnowledgeAnswer(this.handleCheckKnowledgeAnswer.bind(this));
        this.wordLearningView.bindNextKnowledgeWord(this.handleNextKnowledgeWord.bind(this));

        this.wordLearningView.renderStudiedWords(this.wordModel.getStudiedWords());
    }

    loadLearningWord() {
        const word = this.wordModel.getCurrentLearningWord();
        if (word) {
            this.wordLearningView.renderLearningWord(word.english);
        } else {
            if (this.wordLearningView.currentWordElement) {
                this.wordLearningView.currentWordElement.textContent = 'No words loaded.';
            }
        }
    }

    handleShowTranslation() {
        const currentWord = this.wordModel.getCurrentLearningWord();
        if (currentWord) {
            this.wordLearningView.showLearningTranslation(currentWord.russian);
        }
    }
    handlePreviousLearningWord() {
        this.wordModel.moveToPreviousLearningWord();
        this.loadLearningWord();
    }

    handleNextLearningWord() {
        this.wordModel.moveToNextLearningWord();
        this.loadLearningWord();
    }

    loadKnowledgeWord() {
        const word = this.wordModel.getCurrentKnowledgeWord();
        if (word) {
            this.wordLearningView.renderKnowledgeWord(word.english);
        } else {
            if (this.wordLearningView.knowledgeWordDisplay) {
                this.wordLearningView.knowledgeWordDisplay.textContent = 'All words studied!';
            }
            if (this.wordLearningView.userTranslationInput) this.wordLearningView.userTranslationInput.disabled = true;
            if (this.wordLearningView.checkKnowledgeBtn) this.wordLearningBtn.checkKnowledgeBtn.disabled = true;
            if (this.wordLearningBtn.nextKnowledgeWordBtn) this.wordLearningBtn.nextKnowledgeWordBtn.style.display = 'none';
        }
    }

    handleCheckKnowledgeAnswer() {
        const currentWord = this.wordModel.getCurrentKnowledgeWord();
        const userTranslation = this.wordLearningView.getUserKnowledgeTranslation();

        if (!currentWord) return;

        if (userTranslation.toLowerCase() === currentWord.russian.toLowerCase()) {
            this.wordLearningView.displayKnowledgeFeedback(true);
            this.wordModel.addStudiedWord(currentWord);
            this.wordLearningView.renderStudiedWords(this.wordModel.getStudiedWords());
        } else {
            this.wordLearningView.displayKnowledgeFeedback(false, currentWord.russian);
        }
    }

    handleNextKnowledgeWord() {
        this.wordModel.moveToNextKnowledgeWord();
        this.loadKnowledgeWord();
    }
}