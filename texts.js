function showText() {
    // Speichert den aktuellen Inhalt, falls er noch nicht gespeichert wurde
    let contentDiv = document.getElementById("content");

    // Originalen Inhalt speichern, falls nicht schon geschehen
    if (!contentDiv.dataset.original) {
        contentDiv.dataset.original = contentDiv.innerHTML;
    }

    // Neuen Text setzen
    contentDiv.innerHTML = `
        <h2>Bellum Gallicum</h2>
        <p>"Gallia est omnis divisa in partes tres..."</p>
        <button onclick="restoreContent()">Zurück</button>
    `;
}

function restoreContent() {
    let contentDiv = document.getElementById("content");

    // Ursprünglichen Inhalt wiederherstellen
    contentDiv.innerHTML = contentDiv.dataset.original;
}
