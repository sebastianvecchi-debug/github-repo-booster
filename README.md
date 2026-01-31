# 🛡️ GitHub Repo Booster

**Scopri quanto è davvero affidabile una repository GitHub, direttamente mentre la stai visitando.**

GitHub mostra i numeri. Repo Booster ti spiega cosa significano.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Chrome](https://img.shields.io/badge/Chrome-Extension-yellow)

---

## 🔍 Cosa fa

GitHub Repo Booster è una Chrome Extension che analizza automaticamente ogni repository GitHub che visiti e ti fornisce informazioni chiare e immediate sulla sua affidabilità, stato di manutenzione e qualità generale.

Quando sei su una repository GitHub, un piccolo indicatore compare nella parte alta della pagina. Con un click ottieni una panoramica completa sullo stato del progetto.

---

## ✨ Caratteristiche

### ✅ Versione FREE (Attuale)

- **🟢 Stato Repository**: Analisi automatica (Attiva / Poco attiva / Abbandonata)
- **📅 Ultimo Aggiornamento**: Data ultimo commit in formato leggibile
- **📊 Statistiche Base**:
  - Commit totali (stimati)
  - Issue aperte
  - Numero contributors
  - Presenza README
  - Presenza LICENSE
- **💬 Messaggi Chiari**: Spiegazioni semplici dello stato della repository
- **💾 Cache Intelligente**: Dati salvati localmente per limitare chiamate API

### 🚀 Versione PRO (In Arrivo)

- **📈 Repo Health Score**: Punteggio 0-100 sulla salute del progetto
- **👥 Maintainer Analysis**: Analisi attività e affidabilità dei maintainer
- **🔍 Issue & PR Intelligence**: 
  - Issue ignorate
  - Pull Request chiuse senza review
- **⚠️ Update Risk Detector**: Rilevamento rischio breaking changes
- **🌟 Community Quality Score**: Valutazione della qualità della community
- **🎯 "Should I Use This?"**: Risposta diretta YES / MAYBE / NO

---

## 📥 Installazione

### Da Chrome Web Store (Consigliato)
*In arrivo...*

### Installazione Manuale (Developer Mode)

1. **Scarica o clona questa repository**
   ```bash
   git clone https://github.com/yourusername/github-repo-booster.git
   cd github-repo-booster
   ```

2. **Apri Chrome e vai su `chrome://extensions/`**

3. **Attiva la "Modalità sviluppatore"** (toggle in alto a destra)

4. **Clicca su "Carica estensione non pacchettizzata"**

5. **Seleziona la cartella del progetto**

6. **L'estensione è installata!** 🎉

---

## 🎯 Come si usa

1. **Visita una repository GitHub** (es. `github.com/facebook/react`)

2. **Vedrai un'icona a scudo** in alto a destra nella pagina

3. **Clicca sull'icona** per aprire il pannello di analisi

4. **Esplora i dati** e scopri se la repository è affidabile

---

## 🏗️ Struttura del Progetto

```
github-repo-booster/
├── manifest.json          # Configurazione Chrome Extension (Manifest V3)
├── background.js          # Service Worker per API calls
├── content.js             # Script iniettato nelle pagine GitHub
├── styles.css             # Styling coerente con GitHub
├── popup.html             # Popup dell'estensione
├── icons/                 # Icone dell'estensione
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # Questo file
```

---

## 🔧 Tecnologie Utilizzate

- **Manifest V3** (Chrome Extensions)
- **Vanilla JavaScript** (ES6+)
- **GitHub REST API**
- **Chrome Storage API** (per la cache)
- **CSS3** (design system GitHub-like)

---

## 🎨 Design

L'estensione segue fedelmente il design system di GitHub:
- Colori coerenti con il tema GitHub (light/dark mode)
- Typography e spacing identici
- Animazioni fluide e non invasive
- UI pulita e professionale

---

## 📊 Come Funziona l'Analisi

### Calcolo dello Stato

L'estensione determina lo stato di una repository basandosi su:

- **🟢 Attiva**: Commit negli ultimi 30 giorni
- **🟡 Poco Attiva**: Commit negli ultimi 6 mesi
- **🔴 Abbandonata**: Nessun commit da oltre 6 mesi

### Dati Raccolti (FREE Version)

1. Data ultimo commit
2. Numero totale commit (stimato)
3. Issue aperte/chiuse
4. Numero contributors
5. Presenza README
6. Presenza LICENSE

### Futura Analisi PRO

- Activity Score ponderato
- Velocità di risposta alle issue
- Stabilità degli aggiornamenti
- Pattern di attività dei maintainer
- Rischio breaking changes

---

## 🔒 Privacy e Sicurezza

- **Nessun dato personale raccolto**
- **Solo API pubbliche GitHub**
- **Cache locale (Chrome Storage)**
- **Nessun server esterno**
- **Open Source** - codice completamente trasparente

---

## 🤝 Contribuire

Contributi, issues e feature requests sono benvenuti!

1. Fork il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

---

## 🎯 Roadmap

### Versione 1.0 ✅
- [x] Analisi base repository
- [x] Indicatore stato
- [x] Cache dati
- [x] UI/UX GitHub-like

### Versione 1.5 (Prossima)
- [ ] Supporto GitHub Enterprise
- [ ] Più lingue (EN, ES, DE)
- [ ] Export dati in JSON/CSV

### Versione 2.0 (PRO Features)
- [ ] Health Score Algorithm
- [ ] Maintainer Analysis
- [ ] Update Risk Detector
- [ ] Community Quality Score
- [ ] "Should I Use This?" AI

---

## 📝 License

MIT License - vedi file [LICENSE](LICENSE)

---

## 🙏 Crediti

Creato con ❤️ da sviluppatori, per sviluppatori.

Basato sulle API pubbliche di GitHub.

---

## 📧 Contatti

- **Issues**: [GitHub Issues](https://github.com/yourusername/github-repo-booster/issues)
- **Email**: your.email@example.com
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)

---

## 🌟 Se ti piace il progetto

⭐ Lascia una stella su GitHub!

Aiutaci a migliorare segnalando bug o suggerendo nuove funzionalità.

---

**GitHub Repo Booster** - Scegli consapevolmente le tue dipendenze.
