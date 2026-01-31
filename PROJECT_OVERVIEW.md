# 🛡️ GitHub Repo Booster - Project Overview

## Riepilogo Esecutivo

**GitHub Repo Booster** è una Chrome Extension che analizza automaticamente le repository GitHub per fornire agli sviluppatori informazioni immediate sulla loro affidabilità, stato di manutenzione e qualità.

---

## 🎯 Obiettivo del Progetto

Aiutare sviluppatori, studenti e contributor open-source a:
- ✅ Valutare rapidamente l'affidabilità di una repository
- ✅ Evitare dipendenze abbandonate o mal gestite
- ✅ Prendere decisioni tecniche informate
- ✅ Risparmiare tempo nella ricerca di progetti open source

---

## 📦 Cosa Contiene Questo Progetto

### File Principali dell'Estensione

1. **manifest.json**
   - Configurazione Chrome Extension (Manifest V3)
   - Permessi e host permissions
   - Definizione content scripts e background service worker

2. **content.js** (~400 righe)
   - Script iniettato nelle pagine GitHub
   - Gestione UI (button, overlay, panel)
   - Logica di visualizzazione dati
   - Calcolo stato repository

3. **background.js** (~200 righe)
   - Service Worker per chiamate API
   - Fetch dati da GitHub REST API
   - Processing e analisi dati
   - Gestione rate limiting

4. **styles.css** (~500 righe)
   - Styling completo dell'interfaccia
   - Design coerente con GitHub
   - Supporto dark mode
   - Responsive design

5. **popup.html**
   - Popup estensione quando si clicca l'icona
   - Informazioni rapide e link utili

### Documentazione

1. **README.md**
   - Panoramica completa del progetto
   - Istruzioni di installazione
   - Caratteristiche e roadmap
   - FAQ e contatti

2. **INSTALLATION.md**
   - Guida passo-passo all'installazione
   - Troubleshooting
   - Requisiti di sistema

3. **CONTRIBUTING.md**
   - Linee guida per contribuire
   - Code style e best practices
   - Process per PR e issues
   - Codice di condotta

4. **EXAMPLES.md**
   - Esempi pratici di utilizzo
   - Repository di test consigliate
   - Interpretazione risultati
   - Casi d'uso

5. **CHANGELOG.md**
   - Storico versioni
   - Roadmap funzionalità future
   - Versionamento semantico

### Risorse Aggiuntive

1. **icons/**
   - icon16.png, icon48.png, icon128.png
   - icon-reference.svg (template)
   - ICONS_README.md (guida icone)

2. **LICENSE**
   - MIT License

3. **.gitignore**
   - File da escludere da Git

---

## 🏗️ Architettura Tecnica

### Stack Tecnologico

- **Frontend:** Vanilla JavaScript (ES6+)
- **Styling:** CSS3 con variabili CSS
- **API:** GitHub REST API
- **Storage:** Chrome Storage API
- **Manifest:** Chrome Extension Manifest V3

### Flusso di Lavoro

```
1. Utente visita github.com/user/repo
2. Content Script rileva la repository
3. Estrae owner e repo name dall'URL
4. Controlla cache locale (Chrome Storage)
5. Se non in cache o scaduto:
   - Background Worker fa chiamate a GitHub API
   - Recupera dati repository, commits, contributors
   - Processa e analizza i dati
6. Calcola stato repository (Active/Low/Abandoned)
7. Mostra indicatore su floating button
8. Al click, visualizza overlay con analisi completa
```

### Chiamate API GitHub

Per ogni repository, vengono effettuate ~4 chiamate API:

1. `GET /repos/:owner/:repo` - Dati repository
2. `GET /repos/:owner/:repo/commits?per_page=1` - Ultimo commit
3. `GET /repos/:owner/:repo/contributors?per_page=1` - Contributors
4. `GET /repos/:owner/:repo/readme` - Check README

**Rate Limiting:** 
- GitHub: 60 req/hour (non autenticato)
- Cache: 1 ora di validità per ridurre chiamate

---

## ✨ Funzionalità Implementate (v1.0)

### Versione FREE (100% Funzionante)

✅ **Analisi Automatica**
- Rilevamento repository GitHub
- Fetch dati via API pubblica
- Cache intelligente (1 ora)

✅ **Calcolo Stato Repository**
- 🟢 Attiva (commit < 30 giorni)
- 🟡 Poco attiva (commit < 6 mesi)
- 🔴 Abbandonata (commit > 6 mesi)

✅ **Statistiche Base**
- Data ultimo commit
- Commit totali (stimati)
- Issue aperte
- Numero contributors
- Presenza README
- Presenza LICENSE

✅ **Interfaccia Utente**
- Floating button discreto
- Overlay modale
- Design GitHub-like
- Dark mode support
- Responsive

✅ **Preview PRO**
- Visualizzazione funzioni future
- Lock state su features PRO

---

## 🚀 Roadmap Funzionalità Future

### Versione 1.5 (Prossima)

Funzionalità pianificate:

- [ ] **Multi-lingua**
  - Inglese, Spagnolo, Tedesco, Francese
  - Sistema i18n

- [ ] **Export Dati**
  - JSON export
  - CSV export
  - Confronto repository

- [ ] **Cronologia**
  - Storia analisi precedenti
  - Tracking cambiamenti

- [ ] **GitHub Enterprise Support**
  - Supporto istanze private
  - Configurazione custom API endpoint

### Versione 2.0 (PRO Features)

Funzionalità avanzate a pagamento:

- [ ] **Repo Health Score (0-100)**
  - Algoritmo ponderato multi-fattoriale
  - Breakdown dettagliato score

- [ ] **Maintainer Analysis**
  - Attività maintainer nel tempo
  - Affidabilità e pattern
  - Velocity di response

- [ ] **Issue & PR Intelligence**
  - Issue ignorate/abbandonate
  - PR chiuse senza review
  - Tempo medio di risoluzione

- [ ] **Update Risk Detector**
  - Analisi breaking changes
  - Prediction rischio aggiornamenti
  - Compatibility check

- [ ] **Community Quality Score**
  - Engagement community
  - Qualità discussioni
  - Tossicità (sentiment analysis)

- [ ] **"Should I Use This?" AI**
  - Risposta diretta: YES/MAYBE/NO
  - Reasoning dettagliato
  - Alternative suggestions

---

## 🎨 Design System

### Colori Principali

```css
--booster-primary: #238636      /* GitHub green */
--booster-danger: #da3633        /* Red */
--booster-warning: #bf8700       /* Yellow */
--booster-text: #1f2328          /* Text color */
--booster-border: #d0d7de        /* Border color */
```

### Typography

```
Font Family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial
```

### Layout

- Floating button: 48x48px, top-right
- Overlay: max-width 600px, centered
- Border radius: 6px (standard), 12px (panel)
- Spacing: Multipli di 4px

---

## 🔒 Privacy e Sicurezza

### Cosa NON Fa l'Estensione

- ❌ NON raccoglie dati personali
- ❌ NON traccia comportamento utente
- ❌ NON invia dati a server esterni
- ❌ NON richiede autenticazione GitHub

### Cosa FA l'Estensione

- ✅ Usa solo API pubbliche GitHub
- ✅ Cache locale (Chrome Storage)
- ✅ Nessun analytics
- ✅ Codice open source verificabile

### Permessi Richiesti

- `storage`: Cache dati localmente
- `activeTab`: Interazione pagina corrente
- `host_permissions (github.com)`: Rilevamento GitHub
- `host_permissions (api.github.com)`: Chiamate API

---

## 📊 Metriche di Successo (KPI)

### Metriche Tecniche

- Tempo caricamento dati: < 2 secondi
- Chiamate API per repository: ~4
- Dimensione estensione: < 1MB
- Cache hit rate: > 70%

### Metriche Utente (Future)

- Installazioni totali
- Retention rate (30 giorni)
- Daily active users
- Feedback positivi

---

## 🧪 Testing

### Test Consigliati

1. **Repository Attive**
   - facebook/react
   - microsoft/vscode
   - nodejs/node

2. **Repository Poco Attive**
   - jashkenas/backbone
   - jashkenas/underscore

3. **Repository Abbandonate**
   - jquery/jquery-mobile

### Scenari di Test

- ✅ Caricamento dati
- ✅ Calcolo stato corretto
- ✅ Cache funzionante
- ✅ UI responsive
- ✅ Dark mode
- ✅ Gestione errori API

---

## 📝 Stato del Progetto

### Completato ✅

- [x] Core functionality (v1.0)
- [x] UI/UX design
- [x] Documentazione completa
- [x] Icons (placeholder)
- [x] Caching system
- [x] Error handling
- [x] Dark mode support

### In Progress 🔄

- [ ] Chrome Web Store submission
- [ ] Icon design professionale
- [ ] Video demo
- [ ] Landing page

### Planned 📋

- [ ] Unit tests
- [ ] Integration tests
- [ ] CI/CD pipeline
- [ ] Analytics (privacy-friendly)
- [ ] Internazionalizzazione
- [ ] PRO features development

---

## 🤝 Come Contribuire

Il progetto accoglie contributi di tutti i tipi:

1. **Sviluppatori:** Code, bug fixes, nuove features
2. **Designer:** Icons, UI improvements, UX
3. **Scrittori:** Documentation, translations
4. **Tester:** Bug reports, testing
5. **Community:** Feedback, ideas, support

Vedi [CONTRIBUTING.md](CONTRIBUTING.md) per dettagli.

---

## 📞 Supporto e Contatti

- **GitHub Issues:** Per bug e feature requests
- **Email:** [your.email@example.com]
- **Twitter:** [@yourhandle]
- **Discussions:** GitHub Discussions (abilitare)

---

## 🎓 Risorse di Apprendimento

### Chrome Extensions

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)

### GitHub API

- [GitHub REST API](https://docs.github.com/en/rest)
- [API Rate Limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)

### Open Source

- [Open Source Guides](https://opensource.guide/)
- [Choosing a License](https://choosealicense.com/)

---

## 📄 License

MIT License - Vedi [LICENSE](LICENSE) per dettagli.

---

## 🌟 Crediti

**Creato con ❤️ per la community open source**

Grazie a tutti i futuri contributors! 🙏

---

**GitHub Repo Booster** - *Scegli consapevolmente le tue dipendenze*

Versione: 1.0.0  
Data: Gennaio 2026  
Stato: Production Ready
