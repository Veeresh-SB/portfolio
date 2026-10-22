document.addEventListener('DOMContentLoaded', () => {
  const roleElement = document.getElementById('typed-roles');
  if (roleElement) {
    const roles = ['Data Analyst', 'SQL & Python Enthusiast', 'Power BI Learner'];
    let roleIndex = 0;
    roleElement.textContent = roles[0];
    setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleElement.style.opacity = '0';
      setTimeout(() => {
        roleElement.textContent = roles[roleIndex];
        roleElement.style.opacity = '1';
      }, 180);
    }, 2600);
    roleElement.style.transition = 'opacity .18s ease';
  }
  loadGitHubRepos('Veeresh-SB');
});

async function loadGitHubRepos(username) {
  const container = document.getElementById('github-repos');
  if (!container) return;
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error('GitHub repositories could not be loaded');
    const repos = await response.json();
    if (!repos.length) {
      container.innerHTML = `<div class="glass-card p-6"><p>No public repositories found yet. Visit <a class="highlight" href="https://github.com/${username}" target="_blank" rel="noopener">my GitHub profile</a>.</p></div>`;
      return;
    }
    container.innerHTML = repos.map(repo => `
      <article class="glass-card p-6" style="display:flex;flex-direction:column;gap:.7rem">
        <h3><i class="fab fa-github highlight"></i> ${escapeHTML(repo.name)}</h3>
        <p class="subtitle" style="min-height:2.5rem">${escapeHTML(repo.description || 'Public repository on GitHub.')}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;margin-top:auto">
          <span class="tag">${escapeHTML(repo.language || 'Code')}</span>
          <span class="small-note"><i class="fas fa-star" style="color:#fbbf24"></i> ${repo.stargazers_count}</span>
        </div>
        <a class="btn btn-outline" href="${repo.html_url}" target="_blank" rel="noopener">View Code</a>
      </article>`).join('');
  } catch (error) {
    container.innerHTML = `<div class="glass-card p-6"><p>Visit <a class="highlight" href="https://github.com/${username}" target="_blank" rel="noopener">my GitHub profile</a> to explore repositories.</p></div>`;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
