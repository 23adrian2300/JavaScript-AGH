// Napisz funkcję, która czterokrotnie wykonuje następujący kod:
// Za pomocą window.prompt() wczytuje wartość
// Za pomocą console.log() wypisuje informację postaci: wczytanaWartość:typWczytanejWartości

// Sprawdź, co jest wypisywane dla następujących czterech przypadków:
// Użytkownik wprowadził wartość będącą liczbą i nacisnął klawisz 'Enter' lub przycisk 'OK'
// Użytkownik wprowadził wartość będącą napisem i nacisnął klawisz 'Enter' lub przycisk 'OK'
// Użytkownik nie wprowadził wartości, a następnie nacisnął powyższy klawisz / przycisk
// Użytkownik wprowadził wartość, a następnie nacisnął przycisk 'Anuluj'



function readAndLogValues() {
    for (let i = 0; i < 4; i++) {
        const value = window.prompt("Wprowadź wartość:");
        const type = typeof value;
        console.log(`${value}:${type}`);
    }
}

function printValues() {
    const poleTekstowe = document.forms[0].elements["pole_tekstowe"].value;
    const poleLiczbowe = document.forms[0].elements["pole_liczbowe"].value;
    console.log(`${poleTekstowe}:${typeof poleTekstowe}`);
    console.log(`${poleLiczbowe}:${typeof poleLiczbowe}`);
}