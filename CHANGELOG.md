# Changelog

Tutte le modifiche importanti a questo progetto saranno documentate in questo file.

Il formato è basato su [Keep a Changelog](https://keepachangelog.com/it/1.0.0/),
e questo progetto aderisce a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-01-31

### 🎉 Rilascio Iniziale

#### Aggiunto
- ✅ Analisi automatica repository GitHub
- ✅ Indicatore stato repository (Attiva/Poco attiva/Abbandonata)
- ✅ Pannello overlay con statistiche dettagliate
- ✅ Cache locale dei dati (1 ora di validità)
- ✅ Integrazione con GitHub REST API
- ✅ Design coerente con GitHub (light/dark mode)
- ✅ Floating button discreto in alto a destra
- ✅ Statistiche base:
  - Data ultimo commit
  - Commit totali (stimati)
  - Issue aperte
  - Numero contributors
  - Presenza README
  - Presenza LICENSE
- ✅ Messaggi esplicativi in linguaggio semplice
- ✅ Preview funzionalità PRO (bloccate)
- ✅ Supporto responsive (mobile/desktop)
- ✅ Animazioni fluide
- ✅ Gestione errori API
- ✅ Rispetto rate limiting GitHub

#### Caratteristiche Tecniche
- Manifest V3 (Chrome Extensions)
- Service Worker per background tasks
- Content Script per injection
- Chrome Storage API per cache
- Vanilla JavaScript (ES6+)
- CSS3 con variabili CSS
- Supporto dark mode automatico

---

## [Unreleased]

### 🔮 In Arrivo

#### Pianificato per v1.5
- [ ] Supporto GitHub Enterprise
- [ ] Internazionalizzazione (EN, ES, DE, FR)
- [ ] Export dati (JSON/CSV)
- [ ] Confronto tra repository
- [ ] Cronologia analisi
- [ ] Notifiche di aggiornamento repository
- [ ] Filtri e ricerca avanzata
- [ ] Temi personalizzabili

#### Pianificato per v2.0 (PRO)
- [ ] Health Score Algorithm (0-100)
- [ ] Maintainer Activity Analysis
- [ ] Issue & PR Intelligence
- [ ] Update Risk Detector
- [ ] Breaking Changes Prediction
- [ ] Community Quality Score
- [ ] "Should I Use This?" Decision Engine
- [ ] Trending Repositories Alert
- [ ] Dependency Security Check
- [ ] License Compatibility Check

---

## Linee Guida per i Contributi

### Tipi di Modifiche
- **Aggiunto** per nuove funzionalità
- **Modificato** per cambiamenti a funzionalità esistenti
- **Deprecato** per funzionalità che saranno rimosse
- **Rimosso** per funzionalità rimosse
- **Corretto** per bug fix
- **Sicurezza** per vulnerabilità corrette

---

## Versioning

Usiamo [SemVer](http://semver.org/) per il versioning:

- **MAJOR**: Cambiamenti incompatibili con versioni precedenti
- **MINOR**: Nuove funzionalità retrocompatibili
- **PATCH**: Bug fix retrocompatibili

---

## [1.0.0] - 2026-01-31

Prima release pubblica! 🎉
