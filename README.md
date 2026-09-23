# Viva

Diario personale di alimentazione e routine, in italiano, senza framework.

Acqua, caffè, pasti e macronutrienti, alimenti personali, integratori e biometria. I dati inseriti sono conservati esclusivamente nel localStorage del browser: nessun account, backend, tracciamento o sincronizzazione con GitHub. Il repository contiene il codice e un catalogo alimentare pubblico, non i dati del diario.

## Avvio

Su iPhone aprire il sito in Safari e scegliere Condividi → Aggiungi alla schermata Home. L’uso offline è disponibile dopo il primo caricamento completo su HTTPS. Gli avvisi programmati funzionano ad app aperta; notifiche affidabili in background richiederebbero un servizio aggiuntivo o una versione nativa, non inclusi.

Il diario appartiene a questo indirizzo e al browser/dispositivo utilizzato. Cancellare i dati del sito lo elimina. Il sito non offre backup o sincronizzazione. I valori alimentari sono per 100 g; verificare marca, preparazione e relativa fonte mostrata nell’app.

## Sviluppo

`npm test` esegue i controlli. `python3 scripts/build.py` genera `dist/` con i soli file pubblici. Per una prova locale: `python3 -m http.server 8080 --directory dist`, poi aprire http://localhost:8080.

Gli aggiornamenti su `main` vengono verificati e pubblicati automaticamente con GitHub Pages. Le pull request eseguono solo i controlli. La cache offline cambia versione automaticamente quando cambiano i file. Il sito statico non raccoglie il diario; GitHub, come hosting, gestisce le normali richieste web e i relativi metadati di connessione.
