export function saveHighscore(score) {
    const highscores = getHighscore();
    const now = new Date();
    const newHighscore = {
        score: score,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    };

    highscores.push(newHighscore);
    highscores.sort((a, b) => b.score - a.score);

    if (highscores.length > 10) {
        highscores.pop();
    }

    localStorage.setItem('highscores', JSON.stringify(highscores));
}

export function getHighscore() {
    const highscores = localStorage.getItem('highscores');
    return highscores ? JSON.parse(highscores) : [];
}

export function displayHighscore(lbl) {
    const highscores = getHighscore();
    if (highscores.length > 0) {
        lbl.innerHTML = highscores.map((highscore, index) => 
            `${index + 1}. Score: ${highscore.score} - Am: ${highscore.date} - ${highscore.time}`
        ).join('<br>');
    } else {
        lbl.innerHTML = 'Keine Highscores vorhanden.';
    }
}