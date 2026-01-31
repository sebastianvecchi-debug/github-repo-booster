# 📦 Guida all'Installazione

## GitHub Repo Booster - Chrome Extension

Questa guida ti mostrerà come installare l'estensione sul tuo browser Chrome.

---

## 🚀 Installazione Rapida (Developer Mode)

### Passo 1: Scarica l'Estensione

Puoi scaricare l'estensione in due modi:

**Opzione A - Download ZIP:**
1. Vai su https://github.com/yourusername/github-repo-booster
2. Clicca sul pulsante verde "Code"
3. Seleziona "Download ZIP"
4. Estrai il file ZIP in una cartella sul tuo computer

**Opzione B - Git Clone:**
```bash
git clone https://github.com/yourusername/github-repo-booster.git
```

---

### Passo 2: Apri Chrome Extensions

1. Apri Google Chrome
2. Digita nella barra degli indirizzi: `chrome://extensions/`
3. Oppure vai su Menu (⋮) → Altri strumenti → Estensioni

---

### Passo 3: Attiva la Modalità Sviluppatore

1. In alto a destra, attiva il toggle **"Modalità sviluppatore"**
2. Appariranno nuovi pulsanti nella parte superiore

---

### Passo 4: Carica l'Estensione

1. Clicca sul pulsante **"Carica estensione non pacchettizzata"**
2. Naviga fino alla cartella `github-repo-booster` che hai scaricato
3. Seleziona la cartella e clicca su "Seleziona"

---

### Passo 5: Verifica l'Installazione

✅ L'estensione apparirà nella lista con il nome **"GitHub Repo Booster"**

✅ Vedrai l'icona a scudo nella toolbar di Chrome

✅ Se non vedi l'icona, clicca sull'icona puzzle (🧩) e fissa l'estensione

---

## 🧪 Test dell'Estensione

Per testare se funziona:

1. Vai su qualsiasi repository GitHub (es. https://github.com/facebook/react)
2. Dovresti vedere un'icona a scudo in alto a destra
3. Clicca sull'icona per aprire il pannello di analisi

---

## 🔧 Risoluzione Problemi

### L'icona non compare su GitHub

**Soluzione:**
1. Ricarica la pagina GitHub (F5)
2. Controlla che l'estensione sia attiva in `chrome://extensions/`
3. Verifica che l'URL sia una repository valida (github.com/user/repo)

### Errore "Manifest file is missing or unreadable"

**Soluzione:**
1. Assicurati di aver selezionato la cartella corretta
2. Verifica che il file `manifest.json` sia presente nella cartella
3. Controlla che il file non sia corrotto

### I dati non si caricano

**Soluzione:**
1. Controlla la console browser (F12 → Console)
2. Potrebbe essere un limite rate dell'API GitHub
3. Prova a ricaricare dopo qualche minuto

### L'estensione non funziona su certe pagine

**Comportamento normale:**
- L'estensione funziona SOLO su pagine repository (github.com/user/repo)
- NON funziona su:
  - Homepage GitHub
  - Profili utente
  - Impostazioni
  - Marketplace

---

## 🔄 Aggiornamento dell'Estensione

1. Scarica la nuova versione
2. Vai su `chrome://extensions/`
3. Clicca su "Rimuovi" sotto l'estensione vecchia
4. Segui nuovamente i passi di installazione

---

## 🗑️ Disinstallazione

1. Vai su `chrome://extensions/`
2. Trova "GitHub Repo Booster"
3. Clicca su "Rimuovi"
4. Conferma la rimozione

---

## 📋 Requisiti di Sistema

- **Browser:** Google Chrome 88+, Microsoft Edge 88+, Brave 1.20+
- **Sistema Operativo:** Windows, macOS, Linux
- **Connessione:** Internet (per chiamate API GitHub)

---

## 🔒 Permessi Richiesti

L'estensione richiede i seguenti permessi:

- **storage**: Per salvare la cache dei dati
- **activeTab**: Per interagire con la pagina GitHub corrente
- **host_permissions (github.com)**: Per rilevare quando sei su GitHub
- **host_permissions (api.github.com)**: Per chiamare le API GitHub

**Nessun permesso viene utilizzato per raccogliere dati personali.**

---

## ❓ FAQ

### È sicura?
Sì, il codice è completamente open source e non raccoglie dati personali.

### Funziona offline?
I dati vengono salvati in cache, quindi una volta caricati possono essere visualizzati offline.

### Quante chiamate API fa?
Circa 3-4 chiamate per repository (rispettando i limiti di GitHub).

### Supporta GitHub Enterprise?
Non ancora, ma è previsto nella roadmap.

---

## 📞 Supporto

Se hai problemi:

1. Controlla questa guida
2. Cerca tra le [Issues](https://github.com/yourusername/github-repo-booster/issues)
3. Apri una nuova issue descrivendo il problema

---

**Buon utilizzo! 🚀**
