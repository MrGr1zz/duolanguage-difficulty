$(document).ready(function () {
    const easyWords = [
            { word: "cat", translation: "кіт" },
            { word: "dog", translation: "пес" },
            { word: "sun", translation: "сонце" },
            { word: "star", translation: "зірка" },
            { word: "book", translation: "книга" }
        ];
    const mediumWords = [
            { word: "always", translation: "завжди" },
            { word: "never", translation: "ніколи" },
            { word: "sometimes", translation: "інколи" },
            { word: "usually", translation: "зазвичай" },
            { word: "often", translation: "часто" }
        ];
    const hardWords = [
            { word: "nevertheless", translation: "проте" },
            { word: "furthermore", translation: "більше того" },
            { word: "consequently", translation: "внаслідок цього" },
            { word: "moreover", translation: "до того ж" },
            { word: "notwithstanding", translation: "незважаючи на" }
        ];
    

    let currentStep = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let shuffledWords = [];
    const totalSteps = 10;

    function shuffleWords() {
        const level = $('#difficulty-level').val();
        let selectedWords = [];

        if (level === 'easy') {
            selectedWords = easyWords;
        } else if (level === 'medium') {
            selectedWords = mediumWords;
        } else if (level === 'hard') {
            selectedWords = hardWords;
        }

        shuffledWords = selectedWords.sort(() => Math.random() - 0.5);
    }

    function showNextWord() {
        if (currentStep < totalSteps) {
            const currentWord = shuffledWords[currentStep % shuffledWords.length];
            $('#word').text(currentWord.word);
            $('#translation').val("");
            $('#step').text(currentStep + 1);
        } else {
            showResults();
        }
    }

    function checkTranslation() {
        const userInput = $('#translation').val().trim();
        const correctTranslation = shuffledWords[currentStep % shuffledWords.length].translation;

        if (userInput.toLowerCase() === correctTranslation.toLowerCase()) {
            correctCount++;
        } else {
            incorrectCount++;
        }

        currentStep++;
        updateStats();
        showNextWord();
    }

    function updateStats() {
        $('#correct').text(correctCount);
        $('#incorrect').text(incorrectCount);
    }

    function showResults() {
        const percentage = (correctCount / totalSteps) * 100;
        let message = '';

        if (percentage >= 80) {
            message = 'Excellent! You are very good at this.';
        } else if (percentage >= 50) {
            message = 'Good job! Keep practicing.';
        } else {
            message = 'You need more practice. Don\'t give up!';
        }

        $('#result-message').text(message);
        $('#resultModal').modal('show');
    }

    $('#check').click(checkTranslation);
    $('#difficulty-level').change(() => {
        shuffleWords();
        currentStep = 0;
        correctCount = 0;
        incorrectCount = 0;
        updateStats();
        showNextWord();
    });

    shuffleWords();
    showNextWord();
});
