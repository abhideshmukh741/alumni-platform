document.addEventListener('DOMContentLoaded', () => {
  // --- DATA ---
  const alumniData = [
    { id: 1, name: 'John Doe', year: 2010, major: 'Computer Science' },
    { id: 2, name: 'Jane Smith', year: 2012, major: 'Business' },
    { id: 3, name: 'Peter Jones', year: 2008, major: 'Engineering' }
  ];

  const eventsData = [
    { id: 1, title: 'Annual Homecoming Gala', date: 'October 25, 2025' },
    { id: 2, title: 'Tech Networking Night', date: 'November 12, 2025' },
  ];

  const newsData = [
    { id: 1, author: 'Jane Smith', update: 'Promoted to Senior Manager at TechCorp.' },
    { id: 2, author: 'John Doe', update: 'Published a new research paper on AI.' }
  ];

  // --- DOM ELEMENTS ---
  const appInterface = document.getElementById('app-interface');
  const params = new URLSearchParams(window.location.search);
  const role = params.get('role');

  if (!role) {
    window.location.href = 'index.html';
    return;
  }

  // --- TEMPLATES ---
  // Note: SVGs are used for icons directly in the HTML
  const userTemplates = {
    header: `<header class="app-header user-theme"><div class="container header-container"><h1>Alumni Portal</h1><nav><a href="#" class="nav-link active" data-page="home">Home</a><a href="#" class="nav-link" data-page="directory">Directory</a><a href="#" class="nav-link" data-page="events">Events</a><a href="#" class="nav-link logout-btn">Logout</a></nav></div></header>`,
    pages: {
      home: `
        <div class="page-content user-theme">
          <h2>Welcome Back, Alumnus!</h2>
          <div class="dashboard-grid">
            <div class="dashboard-card" style="animation-delay: 100ms;">
              <h3 class="card-title">
                <svg class="card-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>
                My Profile
              </h3>
              <p>Keep your information up to date for the directory.</p>
              <a href="#" class="card-link">Update Profile &rarr;</a>
            </div>
            <div class="dashboard-card" style="animation-delay: 200ms;">
              <h3 class="card-title">
                <svg class="card-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"></path></svg>
                Upcoming Events
              </h3>
              <p class="card-main-stat">${eventsData.length}</p>
              <a href="#" class="card-link" onclick="document.querySelector('[data-page=events]').click()">View Events &rarr;</a>
            </div>
            <div class="dashboard-card" style="animation-delay: 300ms;">
              <h3 class="card-title">
                <svg class="card-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1z"></path></svg>
                New Members
              </h3>
              <p class="card-main-stat">+5 This Month</p>
              <a href="#" class="card-link" onclick="document.querySelector('[data-page=directory]').click()">Browse Directory &rarr;</a>
            </div>
          </div>
        </div>`,
      directory: `<div class="page-content user-theme"><h2>Alumni Directory</h2><ul>${alumniData.map(a => `<li><b>${a.name}</b> - ${a.major} (${a.year})</li>`).join('')}</ul></div>`,
      events: `<div class="page-content user-theme"><h2>Upcoming Events</h2><div class="events-grid">${eventsData.map(e => `<div class="event-card"><div class="event-card-content"><h3>${e.title}</h3><p>${e.date}</p></div></div>`).join('')}</div></div>`
    }
  };

  const adminTemplates = {
    header: `<header class="app-header admin-theme"><div class="container header-container"><h1>Admin Dashboard</h1><nav><a href="#" class="nav-link active" data-page="dashboard">Dashboard</a><a href="#" class="nav-link" data-page="manage-alumni">Manage Alumni</a><a href="#" class="nav-link logout-btn">Logout</a></nav></div></header>`,
    pages: {
      dashboard: `
        <div class="page-content admin-theme">
          <h2>Dashboard Overview</h2>
          <div class="dashboard-grid">
            <div class="dashboard-card" style="animation-delay: 100ms;">
              <h3 class="card-title">
                <svg class="card-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.293 5.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l6-6a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293z"></path></svg>
                Total Alumni
              </h3>
              <p class="card-main-stat">${alumniData.length}</p>
              <a href="#" class="card-link" onclick="document.querySelector('[data-page=manage-alumni]').click()">Manage &rarr;</a>
            </div>
            <div class="dashboard-card" style="animation-delay: 200ms;">
              <h3 class="card-title">
                <svg class="card-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"></path></svg>
                Scheduled Events
              </h3>
              <p class="card-main-stat">${eventsData.length}</p>
              <a href="#" class="card-link">Post New Event &rarr;</a>
            </div>
            <div class="dashboard-card" style="animation-delay: 300ms;">
              <h3 class="card-title">
                <svg class="card-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                News Submissions
              </h3>
              <p class="card-main-stat">${newsData.length} Pending</p>
              <a href="#" class="card-link">Review Submissions &rarr;</a>
            </div>
          </div>
          <div class="dashboard-card card-list" style="margin-top: 25px; animation-delay: 400ms;">
            <h3 class="card-title">Recent Activity</h3>
            <ul>
              ${newsData.map(n => `<li><b>${n.author}</b>: ${n.update}</li>`).join('')}
            </ul>
          </div>
        </div>`,
      'manage-alumni': `<div class="page-content admin-theme"><h2>Manage Alumni</h2><table class="manage-table"><thead><tr><th>Name</th><th>Year</th><th>Major</th></tr></thead><tbody>${alumniData.map(a => `<tr><td>${a.name}</td><td>${a.year}</td><td>${a.major}</td></tr>`).join('')}</tbody></table></div>`
    }
  };

  // --- LOGIC ---
  function renderApp(pageId) {
    const templates = (role === 'user') ? userTemplates : adminTemplates;
    const initialPage = (role === 'user') ? 'home' : 'dashboard';
    const currentPage = pageId || initialPage;

    appInterface.innerHTML = `
      ${templates.header}
      <main class="container">
        ${templates.pages[currentPage]}
      </main>
    `;

    // Re-attach listeners
    appInterface.querySelector('.logout-btn').addEventListener('click', () => { window.location.href = 'index.html'; });
    appInterface.querySelector('nav').addEventListener('click', (e) => {
      if (e.target.matches('.nav-link') && e.target.dataset.page) {
        e.preventDefault();
        renderApp(e.target.dataset.page);
      }
    });

    // Update active nav link
    const activeLink = appInterface.querySelector(`nav .nav-link[data-page="${currentPage}"]`);
    if (appInterface.querySelector('nav .active')) {
      appInterface.querySelector('nav .active').classList.remove('active');
    }
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  // --- INITIALIZE ---
  renderApp();
});