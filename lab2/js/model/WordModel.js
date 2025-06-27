// js/model/WordModel.js

class WordModel {
    constructor() {
        this.words = JSON.parse(localStorage.getItem('wordsData')) || [
            { english: 'Hello', russian: 'Привет' },
            { english: 'World', russian: 'Мир' },
            { english: 'Cat', russian: 'Кот' },
            { english: 'Dog', russian: 'Собака' },
            { english: 'House', russian: 'Дом' },
            { english: 'Water', russian: 'Вода' },
            { english: 'Sun', russian: 'Солнце' },
            { english: 'Tree', russian: 'Дерево' },
            { english: 'Computer', russian: 'Компьютер' }
        ];
        this.currentLearningWordIndex = 0;
        this.currentKnowledgeWordIndex = 0;
        this.studiedWords = JSON.parse(localStorage.getItem('studiedWords')) || [];
    }

    getAllWords() {
        return this.words;
    }

    getCurrentLearningWord() {
        if (this.words.length === 0) return null;
        return this.words[this.currentLearningWordIndex];
    }

    moveToNextLearningWord() {
        this.currentLearningWordIndex = (this.currentLearningWordIndex + 1) % this.words.length;
    }
    moveToPreviousLearningWord() {
        this.currentLearningWordIndex = (this.currentLearningWordIndex - 1 + this.words.length) % this.words.length;
    }

    getCurrentKnowledgeWord() {
        if (this.words.length === 0) return null;
        return this.words[this.currentKnowledgeWordIndex];
    }

    moveToNextKnowledgeWord() {
        this.currentKnowledgeWordIndex = (this.currentKnowledgeWordIndex + 1) % this.words.length;
    }

    addStudiedWord(word) {
        if (!this.studiedWords.some(sw => sw.english.toLowerCase() === word.english.toLowerCase())) {
            this.studiedWords.push(word);
            localStorage.setItem('studiedWords', JSON.stringify(this.studiedWords));
        }
    }

    getStudiedWords() {
        return this.studiedWords;
    }
}