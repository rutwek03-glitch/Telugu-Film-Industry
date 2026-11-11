document.addEventListener("DOMContentLoaded", () => {
  let currentSortColumn = "gross";
  let currentSortAsc = false;

  // Initialize
  initTabs();
  renderHeroProfiles(tfiData2.heroes);
  populateDropdowns();
  renderMovieTable(tfiData2.movies);
  renderComparison();
  bindEvents();

  // 1. Tab Switcher
  function initTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

        btn.classList.add("active");
        const targetTab = btn.getAttribute("data-tab");
        document.getElementById(targetTab).classList.add("active");
      });
    });
  }

  // 2. Render Hero Profiles with DOB, Bio & Images
  function renderHeroProfiles(heroesList) {
    const grid = document.getElementById("heroes-cards-grid");
    if (heroesList.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No heroes found.</div>`;
      return;
    }

    grid.innerHTML = heroesList
      .map(
        (h) => `
      <div class="hero-profile-card">
        <div class="hero-card-header">
          <img src="${h.image}" alt="${h.name}" class="hero-avatar" />
          <div class="hero-header-details">
            <span class="era-tag">${h.era}</span>
            <h3>${h.name}</h3>
            <div class="hero-title-sub">${h.title}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-solid fa-user"></i> Real: <strong>${h.realName}</strong></div>
          </div>
        </div>

        <div class="hero-card-body">
          <div class="bio-meta-list">
            <div><i class="fa-solid fa-cake-candles text-gold"></i> DOB: <strong>${h.dob}</strong></div>
            <div><i class="fa-solid fa-location-dot text-gold"></i> Origin: <strong>${h.birthPlace}</strong></div>
            <div><i class="fa-solid fa-users text-gold"></i> Dynasty: <strong>${h.dynasty}</strong></div>
            <div><i class="fa-solid fa-chart-line text-gold"></i> Career Gross: <strong>${h.totalGross}</strong></div>
          </div>

          <p class="wiki-snippet">${h.bio}</p>

          <button class="view-full-btn" onclick="openBioModal('${h.id}')">
            <i class="fa-solid fa-book-open"></i> Full Wiki Bio & Sacnilk Films
          </button>
        </div>
      </div>
    `
      )
      .join("");
  }

  // 3. Populate Dropdowns
  function populateDropdowns() {
    const movieHeroFilter = document.getElementById("movie-hero-filter");
    const hero1Select = document.getElementById("hero-1-select");
    const hero2Select = document.getElementById("hero-2-select");

    tfiData2.heroes.forEach((h, index) => {
      const opt1 = document.createElement("option");
      opt1.value = h.name;
      opt1.textContent = h.name;
      movieHeroFilter.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = h.id;
      opt2.textContent = h.name;
      if (index === 8) opt2.selected = true; // Default Prabhas
      hero1Select.appendChild(opt2);

      const opt3 = document.createElement("option");
      opt3.value = h.id;
      opt3.textContent = h.name;
      if (index === 11) opt3.selected = true; // Default Allu Arjun
      hero2Select.appendChild(opt3);
    });
  }

  // 4. Render Movies Table (IMDb & Sacnilk)
  function renderMovieTable(data) {
    const tbody = document.getElementById("movies-tbody");
    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem; color: var(--text-muted);">No movies match criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = data
      .map(
        (m) => `
      <tr>
        <td style="font-weight: 700; color: #fff;">${m.title}</td>
        <td>${m.hero}</td>
        <td>${m.director}</td>
        <td>${m.year}</td>
        <td><span style="color: #fbbf24; font-weight:700;"><i class="fa-solid fa-star"></i> ${m.imdbRating}</span></td>
        <td style="font-weight: 800; color: var(--accent-gold);">₹${m.gross} Cr</td>
        <td><span class="verdict-badge verdict-${m.verdict.toLowerCase().replace(/\s+/g, '-')}">${m.verdict}</span></td>
      </tr>
    `
      )
      .join("");
  }

  // 5. Filter & Sort Logic
  function bindEvents() {
    // Hero Search & Era Filter
    document.getElementById("hero-search").addEventListener("input", filterHeroes);
    document.getElementById("era-filter").addEventListener("change", filterHeroes);

    // Movie Search & Filters
    document.getElementById("movie-search").addEventListener("input", filterMovies);
    document.getElementById("movie-hero-filter").addEventListener("change", filterMovies);
    document.getElementById("verdict-filter").addEventListener("change", filterMovies);

    // Sort Headers
    document.querySelectorAll(".data-table th").forEach((th) => {
      th.addEventListener("click", () => {
        const col = th.getAttribute("data-sort");
        if (currentSortColumn === col) {
          currentSortAsc = !currentSortAsc;
        } else {
          currentSortColumn = col;
          currentSortAsc = false;
        }
        filterMovies();
      });
    });

    // Comparison Change
    document.getElementById("hero-1-select").addEventListener("change", renderComparison);
    document.getElementById("hero-2-select").addEventListener("change", renderComparison);

    // Modal Close
    document.getElementById("modal-close").addEventListener("click", closeModal);
  }

  function filterHeroes() {
    const query = document.getElementById("hero-search").value.toLowerCase();
    const era = document.getElementById("era-filter").value;

    const filtered = tfiData2.heroes.filter((h) => {
      const matchesSearch =
        h.name.toLowerCase().includes(query) ||
        h.realName.toLowerCase().includes(query) ||
        h.birthPlace.toLowerCase().includes(query);
      const matchesEra = era === "ALL" || h.era === era;
      return matchesSearch && matchesEra;
    });

    renderHeroProfiles(filtered);
  }

  function filterMovies() {
    const searchVal = document.getElementById("movie-search").value.toLowerCase();
    const selectedHero = document.getElementById("movie-hero-filter").value;
    const selectedVerdict = document.getElementById("verdict-filter").value;

    let filtered = tfiData2.movies.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(searchVal) || m.director.toLowerCase().includes(searchVal);
      const matchesHero = selectedHero === "ALL" || m.hero.includes(selectedHero);
      const matchesVerdict = selectedVerdict === "ALL" || m.verdict === selectedVerdict;
      return matchesSearch && matchesHero && matchesVerdict;
    });

    filtered.sort((a, b) => {
      let valA = a[currentSortColumn];
      let valB = b[currentSortColumn];
      if (typeof valA === "string") {
        return currentSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return currentSortAsc ? valA - valB : valB - valA;
    });

    renderMovieTable(filtered);
  }

  // 6. Side-by-Side Hero Battle Matrix
  function renderComparison() {
    const id1 = document.getElementById("hero-1-select").value;
    const id2 = document.getElementById("hero-2-select").value;
    const h1 = tfiData2.heroes.find((h) => h.id === id1);
    const h2 = tfiData2.heroes.find((h) => h.id === id2);

    const container = document.getElementById("compare-grid");
    container.innerHTML = [h1, h2]
      .map((h) => {
        const heroMovies = tfiData2.movies.filter((m) => m.hero.includes(h.name));
        const topMovie = heroMovies.reduce((max, m) => (m.gross > (max?.gross || 0) ? m : max), null);

        return `
        <div class="compare-card">
          <img src="${h.image}" alt="${h.name}" style="width: 100px; height: 120px; border-radius: 12px; object-fit: cover; border: 2px solid var(--accent-gold); margin-bottom: 0.8rem;" />
          <h3 style="font-family: var(--font-heading); color: var(--accent-gold);">${h.name}</h3>
          <p style="color: var(--text-muted); font-size: 0.82rem; margin-bottom: 1rem;">${h.title}</p>

          <div style="background: rgba(255,255,255,0.03); padding: 0.8rem; border-radius: 8px; margin-bottom: 0.6rem; text-align: left; font-size: 0.85rem;">
            <div><i class="fa-solid fa-cake-candles text-gold"></i> DOB: <strong>${h.dob}</strong></div>
            <div><i class="fa-solid fa-masks-theater text-gold"></i> Debut: <strong>${h.debut}</strong></div>
            <div><i class="fa-solid fa-crown text-gold"></i> Era: <strong>${h.era}</strong></div>
          </div>

          <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid var(--accent-gold); padding: 0.8rem; border-radius: 8px;">
            <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Highest Sacnilk Gross Film</span>
            <strong style="font-size: 1.1rem; color: #fff;">${topMovie ? `${topMovie.title} (₹${topMovie.gross} Cr)` : "Historical Benchmark"}</strong>
          </div>
        </div>
      `;
      })
      .join("");
  }

  // 7. Full Wiki Bio Modal
  window.openBioModal = function (heroId) {
    const hero = tfiData2.heroes.find((h) => h.id === heroId);
    const heroMovies = tfiData2.movies.filter((m) => m.hero.includes(hero.name));

    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
      <div style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 1.5rem;">
        <img src="${hero.image}" style="width: 110px; height: 130px; border-radius: 12px; object-fit: cover; border: 2px solid var(--accent-gold);" />
        <div>
          <span class="era-tag">${hero.era}</span>
          <h2 style="font-family: var(--font-heading); color: var(--accent-gold); font-size: 1.6rem;">${hero.name}</h2>
          <div style="font-size: 0.9rem; color: var(--text-muted);">${hero.title}</div>
          <div style="font-size: 0.85rem; margin-top: 0.3rem;"><i class="fa-solid fa-signature"></i> Real Name: <strong>${hero.realName}</strong></div>
        </div>
      </div>

      <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; font-size: 0.88rem;">
        <div style="margin-bottom: 0.4rem;"><i class="fa-solid fa-cake-candles text-gold"></i> <strong>Date of Birth:</strong> ${hero.dob}</div>
        <div style="margin-bottom: 0.4rem;"><i class="fa-solid fa-location-dot text-gold"></i> <strong>Birthplace:</strong> ${hero.birthPlace}</div>
        <div style="margin-bottom: 0.4rem;"><i class="fa-solid fa-sitemap text-gold"></i> <strong>Dynasty / Family:</strong> ${hero.dynasty}</div>
        <div><i class="fa-solid fa-clapperboard text-gold"></i> <strong>Debut Movie:</strong> ${hero.debut}</div>
      </div>

      <h4 style="font-family: var(--font-heading); color: #fff; margin-bottom: 0.6rem;"><i class="fa-brands fa-wikipedia-w text-gold"></i> Wikipedia Biography</h4>
      <p style="font-size: 0.9rem; color: #d1d5db; line-height: 1.6; margin-bottom: 1.5rem;">${hero.bio}</p>

      <h4 style="font-family: var(--font-heading); color: #fff; margin-bottom: 0.8rem;"><i class="fa-solid fa-chart-line text-gold"></i> Sacnilk & IMDb Tracked Blockbusters</h4>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        ${
          heroMovies.length > 0
            ? heroMovies
                .map(
                  (m) => `
          <div style="display: flex; justify-content: space-between; background: rgba(0,0,0,0.4); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color);">
            <div>
              <strong style="color: #fff;">${m.title}</strong> (${m.year})
              <div style="font-size: 0.78rem; color: var(--text-muted);">Director: ${m.director} | IMDb: ⭐ ${m.imdbRating}</div>
            </div>
            <div style="text-align: right;">
              <span style="color: var(--accent-gold); font-weight: 800;">₹${m.gross} Cr</span>
              <div><span class="verdict-badge verdict-${m.verdict.toLowerCase().replace(/\s+/g, '-')}">${m.verdict}</span></div>
            </div>
          </div>
        `
                )
                .join("")
            : `<div style="color: var(--text-muted); font-size: 0.85rem;">Historical benchmark star (classic records tracked under pioneer era statistics).</div>`
        }
      </div>
    `;

    document.getElementById("bio-modal").classList.add("active");
  };

  function closeModal() {
    document.getElementById("bio-modal").classList.remove("active");
  }
});
