// GitHub Repo Booster - Content Script
// Runs on every GitHub repository page

class GitHubRepoBooster {
  constructor() {
    this.repoData = null;
    this.overlayOpen = false;
    this.init();
  }

  init() {
    // Check if we're on a valid repository page
    if (!this.isRepoPage()) {
      return;
    }

    // Inject the booster logo/button
    this.injectBoosterButton();

    // Load repository data
    this.loadRepoData();
  }

  isRepoPage() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(p => p);
    
    // Must have at least user/repo
    if (parts.length < 2) return false;
    
    // Exclude certain paths
    const excluded = ['settings', 'notifications', 'explore', 'marketplace'];
    if (excluded.includes(parts[0])) return false;
    
    return true;
  }

  getRepoInfo() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(p => p);
    
    return {
      owner: parts[0],
      repo: parts[1]
    };
  }

  injectBoosterButton() {
    // Create the floating button
    const button = document.createElement('div');
    button.id = 'repo-booster-btn';
    button.className = 'repo-booster-button';
    button.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31-.91-6-4.66-6-8.5V7.89l6-3.27 6 3.27V11.5c0 3.84-2.69 7.59-6 8.5z"/>
        <path d="M9.5 11L8 12.5l3 3 6-6L15.5 8l-4.5 4.5z"/>
      </svg>
      <span class="repo-booster-status-indicator"></span>
    `;
    
    button.addEventListener('click', () => this.toggleOverlay());
    
    document.body.appendChild(button);
  }

  async loadRepoData() {
    const { owner, repo } = this.getRepoInfo();
    
    // Check cache first
    const cacheKey = `repo_${owner}_${repo}`;
    const cached = await this.getFromCache(cacheKey);
    
    if (cached && this.isCacheValid(cached)) {
      this.repoData = cached.data;
      this.updateButtonStatus();
      return;
    }

    // Fetch from GitHub API
    try {
      const data = await this.fetchRepoData(owner, repo);
      this.repoData = data;
      
      // Cache the result
      await this.saveToCache(cacheKey, data);
      
      this.updateButtonStatus();
    } catch (error) {
      console.error('GitHub Repo Booster: Error fetching data', error);
    }
  }

  async fetchRepoData(owner, repo) {
    // Send message to background script to fetch data
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { action: 'fetchRepoData', owner, repo },
        response => {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.data);
          }
        }
      );
    });
  }

  async getFromCache(key) {
    return new Promise(resolve => {
      chrome.storage.local.get([key], result => {
        resolve(result[key] || null);
      });
    });
  }

  async saveToCache(key, data) {
    return new Promise(resolve => {
      chrome.storage.local.set({
        [key]: {
          data,
          timestamp: Date.now()
        }
      }, resolve);
    });
  }

  isCacheValid(cached) {
    const ONE_HOUR = 60 * 60 * 1000;
    return (Date.now() - cached.timestamp) < ONE_HOUR;
  }

  updateButtonStatus() {
    if (!this.repoData) return;
    
    const status = this.calculateRepoStatus();
    const indicator = document.querySelector('.repo-booster-status-indicator');
    
    if (indicator) {
      indicator.className = `repo-booster-status-indicator status-${status.level}`;
      indicator.title = status.text;
    }
  }

  calculateRepoStatus() {
    const { lastCommitDays, openIssues, closedIssues, totalCommits } = this.repoData.analysis;
    
    // Active: committed in last 30 days
    if (lastCommitDays <= 30) {
      return { level: 'active', text: 'Repository attiva', emoji: '🟢' };
    }
    
    // Low activity: committed in last 6 months
    if (lastCommitDays <= 180) {
      return { level: 'low', text: 'Poco attiva', emoji: '🟡' };
    }
    
    // Abandoned: no commits in 6+ months
    return { level: 'abandoned', text: 'Repository abbandonata', emoji: '🔴' };
  }

  toggleOverlay() {
    if (this.overlayOpen) {
      this.closeOverlay();
    } else {
      this.openOverlay();
    }
  }

  openOverlay() {
    // Remove existing overlay if any
    this.closeOverlay();
    
    const overlay = document.createElement('div');
    overlay.id = 'repo-booster-overlay';
    overlay.className = 'repo-booster-overlay';
    
    overlay.innerHTML = this.renderOverlayContent();
    
    document.body.appendChild(overlay);
    this.overlayOpen = true;
    
    // Add event listeners
    this.attachOverlayListeners();
    
    // Animate in
    setTimeout(() => overlay.classList.add('visible'), 10);
  }

  closeOverlay() {
    const overlay = document.getElementById('repo-booster-overlay');
    if (overlay) {
      overlay.classList.remove('visible');
      setTimeout(() => overlay.remove(), 300);
    }
    this.overlayOpen = false;
  }

  renderOverlayContent() {
    if (!this.repoData) {
      return `
        <div class="repo-booster-panel">
          <div class="panel-header">
            <h2>GitHub Repo Booster</h2>
            <button class="close-btn" id="close-overlay">&times;</button>
          </div>
          <div class="panel-body">
            <div class="loading">Caricamento dati...</div>
          </div>
        </div>
      `;
    }
    
    const status = this.calculateRepoStatus();
    const { owner, repo } = this.getRepoInfo();
    const analysis = this.repoData.analysis;
    
    return `
      <div class="repo-booster-panel">
        <div class="panel-header">
          <div class="header-content">
            <h2>${owner}/${repo}</h2>
            <span class="version-badge">FREE</span>
          </div>
          <button class="close-btn" id="close-overlay">&times;</button>
        </div>
        
        <div class="panel-body">
          <!-- Status Section -->
          <div class="status-section">
            <div class="status-badge status-${status.level}">
              <span class="status-emoji">${status.emoji}</span>
              <span class="status-text">${status.text}</span>
            </div>
            <div class="status-message">
              ${this.getStatusMessage(status.level, analysis)}
            </div>
          </div>
          
          <!-- Stats Grid -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Ultimo commit</div>
              <div class="stat-value">${this.formatDaysAgo(analysis.lastCommitDays)}</div>
            </div>
            
            <div class="stat-card">
              <div class="stat-label">Commit totali</div>
              <div class="stat-value">${analysis.totalCommits}</div>
            </div>
            
            <div class="stat-card">
              <div class="stat-label">Issue aperte</div>
              <div class="stat-value">${analysis.openIssues}</div>
            </div>
            
            <div class="stat-card">
              <div class="stat-label">Contributors</div>
              <div class="stat-value">${analysis.contributors || 'N/A'}</div>
            </div>
          </div>
          
          <!-- Repository Info -->
          <div class="repo-info">
            <div class="info-row">
              <span class="info-icon">${analysis.hasReadme ? '✅' : '❌'}</span>
              <span>README presente</span>
            </div>
            <div class="info-row">
              <span class="info-icon">${analysis.hasLicense ? '✅' : '❌'}</span>
              <span>LICENSE presente</span>
            </div>
          </div>
          
          <!-- PRO Features Preview -->
          <div class="pro-features-section">
            <div class="pro-header">
              <h3>🚀 Funzionalità PRO</h3>
              <span class="pro-badge">PROSSIMAMENTE</span>
            </div>
            
            <div class="pro-features-list">
              <div class="pro-feature locked">
                <div class="feature-icon">📊</div>
                <div class="feature-content">
                  <div class="feature-name">Repo Health Score</div>
                  <div class="feature-desc">Punteggio 0-100 sulla salute del progetto</div>
                </div>
                <div class="lock-icon">🔒</div>
              </div>
              
              <div class="pro-feature locked">
                <div class="feature-icon">👥</div>
                <div class="feature-content">
                  <div class="feature-name">Maintainer Analysis</div>
                  <div class="feature-desc">Analisi attività e affidabilità maintainer</div>
                </div>
                <div class="lock-icon">🔒</div>
              </div>
              
              <div class="pro-feature locked">
                <div class="feature-icon">🎯</div>
                <div class="feature-content">
                  <div class="feature-name">Should I Use This?</div>
                  <div class="feature-desc">Risposta diretta: YES / MAYBE / NO</div>
                </div>
                <div class="lock-icon">🔒</div>
              </div>
              
              <div class="pro-feature locked">
                <div class="feature-icon">⚠️</div>
                <div class="feature-content">
                  <div class="feature-name">Update Risk Detector</div>
                  <div class="feature-desc">Rileva rischio breaking changes</div>
                </div>
                <div class="lock-icon">🔒</div>
              </div>
            </div>
            
            <button class="pro-cta-btn" disabled>
              <span>Disponibile a breve</span>
            </button>
          </div>
        </div>
        
        <div class="panel-footer">
          <a href="https://github.com/yourusername/github-repo-booster" target="_blank" class="footer-link">
            Segnala un problema
          </a>
          <span class="footer-separator">•</span>
          <a href="#" class="footer-link">v1.0.0</a>
        </div>
      </div>
    `;
  }

  getStatusMessage(level, analysis) {
    switch (level) {
      case 'active':
        return `Repository aggiornata di recente. ${analysis.totalCommits > 100 ? 'Buona attività di sviluppo.' : 'Progetto attivo.'}`;
      case 'low':
        return `Repository poco attiva negli ultimi mesi. Verifica se il progetto è stabile o sta rallentando.`;
      case 'abandoned':
        return `Nessun commit da oltre 6 mesi. La repository potrebbe essere abbandonata o conclusa.`;
      default:
        return 'Analisi in corso...';
    }
  }

  formatDaysAgo(days) {
    if (days === 0) return 'Oggi';
    if (days === 1) return 'Ieri';
    if (days < 7) return `${days} giorni fa`;
    if (days < 30) return `${Math.floor(days / 7)} settimane fa`;
    if (days < 365) return `${Math.floor(days / 30)} mesi fa`;
    return `${Math.floor(days / 365)} anni fa`;
  }

  attachOverlayListeners() {
    const closeBtn = document.getElementById('close-overlay');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeOverlay());
    }
    
    const overlay = document.getElementById('repo-booster-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeOverlay();
        }
      });
    }
    
    // ESC key to close
    const escHandler = (e) => {
      if (e.key === 'Escape' && this.overlayOpen) {
        this.closeOverlay();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new GitHubRepoBooster();
  });
} else {
  new GitHubRepoBooster();
}
