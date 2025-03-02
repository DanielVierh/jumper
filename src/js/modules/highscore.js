export function saveHighscore(score) {
    const highscore = getHighscore();
    if (!highscore || score > highscore.score) {
        const now = new Date();
        const newHighscore = {
            score: score,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString()
        };
        localStorage.setItem('highscore', JSON.stringify(newHighscore));
    }
}

export function getHighscore() {
    const highscore = localStorage.getItem('highscore');
    return highscore ? JSON.parse(highscore) : null;
}

export function displayHighscore(lbl) {
    const highscore = getHighscore();
    if (highscore) {
        lbl.innerHTML = `Highscore: ${highscore.score} - Datum: ${highscore.date} - Uhrzeit: ${highscore.time}`
    }
}