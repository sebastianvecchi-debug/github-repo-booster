# 🤝 Guida ai Contributi

Grazie per il tuo interesse nel contribuire a **GitHub Repo Booster**! 

Questo documento fornisce linee guida per contribuire al progetto.

---

## 🌟 Come Puoi Contribuire

Ci sono molti modi per contribuire:

- 🐛 **Segnalare bug**
- 💡 **Suggerire nuove funzionalità**
- 📝 **Migliorare la documentazione**
- 🔧 **Scrivere codice**
- 🎨 **Migliorare il design**
- 🌍 **Tradurre l'estensione**

---

## 🐛 Segnalare Bug

Prima di segnalare un bug:

1. ✅ Controlla che non sia già stato segnalato nelle [Issues](https://github.com/yourusername/github-repo-booster/issues)
2. ✅ Usa l'ultima versione dell'estensione
3. ✅ Verifica che non sia un problema di configurazione

### Come Segnalare

Crea una nuova issue includendo:

- **Titolo chiaro** del problema
- **Descrizione dettagliata** di cosa hai riscontrato
- **Passi per riprodurre** il bug
- **Comportamento atteso** vs **comportamento effettivo**
- **Screenshot** se possibile
- **Versione** dell'estensione
- **Browser** e versione
- **Sistema operativo**

**Template:**
```markdown
## Descrizione del Bug
[Descrizione chiara del problema]

## Passi per Riprodurre
1. Vai su '...'
2. Clicca su '....'
3. Vedi errore

## Comportamento Atteso
[Cosa ti aspettavi che accadesse]

## Comportamento Effettivo
[Cosa è accaduto invece]

## Screenshot
[Se applicabile]

## Ambiente
- Versione Estensione: [es. 1.0.0]
- Browser: [es. Chrome 120]
- OS: [es. Windows 11]
```

---

## 💡 Suggerire Funzionalità

Abbiamo idee per migliorare l'estensione!

### Prima di Suggerire

1. ✅ Controlla la [roadmap](CHANGELOG.md#unreleased)
2. ✅ Cerca nelle issues esistenti
3. ✅ Considera se è in linea con gli obiettivi del progetto

### Come Suggerire

Crea una issue con label `enhancement` includendo:

- **Titolo chiaro** della funzionalità
- **Problema** che risolve
- **Soluzione proposta**
- **Alternative** considerate
- **Mockup** o esempi (se applicabile)

---

## 🔧 Contribuire con Codice

### Setup Ambiente di Sviluppo

1. **Fork** il repository
2. **Clone** il tuo fork localmente:
   ```bash
   git clone https://github.com/tuo-username/github-repo-booster.git
   cd github-repo-booster
   ```
3. **Crea un branch** per la tua feature:
   ```bash
   git checkout -b feature/nome-feature
   ```

### Linee Guida per il Codice

#### JavaScript
- Usa **ES6+** syntax
- Segui lo stile del codice esistente
- Commenta codice complesso
- Usa nomi variabili descrittivi
- Evita variabili globali

#### Esempio di Stile
```javascript
// ✅ Buono
async function fetchRepositoryData(owner, repo) {
  try {
    const response = await fetch(`${API_BASE}/repos/${owner}/${repo}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// ❌ Evitare
function getData(o, r) {
  return fetch(API + '/repos/' + o + '/' + r).then(r => r.json())
}
```

#### CSS
- Usa **variabili CSS** per colori e dimensioni
- Segui il naming convention BEM-like
- Supporta dark mode
- Mobile-first approach

#### Commit Messages
Usa [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: aggiunge analisi PR intelligence
fix: corregge cache non funzionante
docs: aggiorna README con esempi
style: migliora styling pannello overlay
refactor: riorganizza API calls
test: aggiunge test per calcolo stato
chore: aggiorna dipendenze
```

### Pull Request Process

1. **Assicurati** che il codice funzioni
2. **Testa** in locale l'estensione
3. **Aggiorna** la documentazione se necessario
4. **Crea** una Pull Request con:
   - Titolo chiaro
   - Descrizione dettagliata delle modifiche
   - Link alle issue correlate
   - Screenshot/video se modifiche UI

#### Template PR
```markdown
## Descrizione
[Descrizione delle modifiche]

## Tipo di Modifica
- [ ] Bug fix
- [ ] Nuova funzionalità
- [ ] Breaking change
- [ ] Documentazione

## Checklist
- [ ] Il codice segue le linee guida del progetto
- [ ] Ho testato le modifiche localmente
- [ ] Ho aggiornato la documentazione
- [ ] Non ci sono warning in console
- [ ] Il design è coerente con GitHub

## Screenshot
[Se applicabile]

## Issue Correlate
Closes #123
```

---

## 📝 Contribuire alla Documentazione

La documentazione è fondamentale! Puoi aiutare:

- Correggendo errori grammaticali
- Aggiungendo esempi
- Migliorando spiegazioni
- Traducendo in altre lingue
- Creando guide video

---

## 🌍 Traduzioni

Vogliamo rendere l'estensione accessibile a tutti!

### Lingue Prioritarie
1. Inglese (EN) - Necessaria
2. Spagnolo (ES)
3. Tedesco (DE)
4. Francese (FR)
5. Portoghese (PT)

### Come Tradurre

1. Crea una cartella `locales/[lingua]`
2. Traduci i file seguendo la struttura di `locales/it`
3. Testa la traduzione
4. Crea una PR

---

## 🎨 Contribuire al Design

Se sei un designer:

- Migliora le icone
- Proponi miglioramenti UI/UX
- Crea mockup per nuove feature
- Suggerisci animazioni

---

## 🧪 Testing

Prima di inviare una PR:

1. ✅ Testa su almeno 3 repository diverse
2. ✅ Verifica light mode e dark mode
3. ✅ Controlla la console per errori
4. ✅ Testa su dimensioni schermo diverse
5. ✅ Verifica che la cache funzioni

---

## 📋 Priorità per Contributi

### Alta Priorità 🔴
- Bug critici
- Problemi di sicurezza
- Problemi di performance
- Documentazione mancante

### Media Priorità 🟡
- Nuove funzionalità FREE
- Miglioramenti UI/UX
- Traduzioni
- Test automatici

### Bassa Priorità 🟢
- Funzionalità PRO (roadmap futura)
- Ottimizzazioni minori
- Refactoring

---

## ⚖️ Codice di Condotta

### Il Nostro Impegno

Ci impegniamo a rendere questo progetto un'esperienza priva di molestie per tutti, indipendentemente da:

- Età
- Corporatura
- Disabilità
- Etnia
- Identità ed espressione di genere
- Livello di esperienza
- Nazionalità
- Aspetto personale
- Razza
- Religione
- Identità e orientamento sessuale

### Standard della Community

**Comportamenti Positivi:**
- ✅ Linguaggio accogliente e inclusivo
- ✅ Rispetto per punti di vista diversi
- ✅ Feedback costruttivo
- ✅ Focus sul bene della community
- ✅ Empatia verso altri membri

**Comportamenti Inaccettabili:**
- ❌ Linguaggio o immagini sessualizzati
- ❌ Trolling, insulti o commenti offensivi
- ❌ Molestie pubbliche o private
- ❌ Pubblicazione di informazioni private altrui
- ❌ Comportamenti inappropriati in contesto professionale

---

## 📞 Domande?

Se hai domande:

1. Controlla le [FAQ](README.md#-faq)
2. Cerca nelle [Issues](https://github.com/yourusername/github-repo-booster/issues)
3. Apri una [nuova issue](https://github.com/yourusername/github-repo-booster/issues/new)

---

## 🙏 Riconoscimenti

Tutti i contributors saranno menzionati nel file [CONTRIBUTORS.md](CONTRIBUTORS.md)!

---

**Grazie per aver contribuito a GitHub Repo Booster! 💙**

Il tuo supporto rende questo progetto migliore per tutti.
