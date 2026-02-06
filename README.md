# Hotel Arezzo - Sito Web

Sito statico moderno e responsive per un hotel ad Arezzo (Italia).

File principali

- `index.html` - pagina principale con tutte le sezioni richieste
- `css/styles.css` - foglio di stile principale
- `js/script.js` - script per navigazione e validazione dei form

Come usare

1. Apri `index.html` in un browser moderno.
2. Per sviluppo locale, puoi usare un semplice server statico, ad esempio Python:

```bash
# Python 3
python -m http.server 8000
# poi visita http://localhost:8000
```

Note

- Il sito usa immagini esterne (Unsplash). Per produzione, sostituisci le immagini con file locali in `images/`.
- Il form di prenotazione invia i dati via email (mailto) al browser del cliente. L'indirizzo email è configurabile modificando `data-booking-email` nel form booking.
- La mappa è incorporata tramite Google Maps embed con query sull'indirizzo.
