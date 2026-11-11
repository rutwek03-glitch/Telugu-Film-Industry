document.addEventListener("DOMContentLoaded", () => {
  let currentSortColumn = "gross";
  let currentSortAsc = false;

  // Initialize UI Components
  initSplashScreen();
  renderHeroCards();
  populateDropdowns();
  renderTable(tfiData.movies);
  renderComparison();
  bindEvents();

  // 1. Splash Screen Logic
  function initSplashScreen() {
    const enterBtn = document.getElementById("enter-btn");
    const splash = document.getElementById("intro-splash");
    enterBtn.addEventListener("click", () => {
      splash.classList.add("hide");
    });
  }

  // 2. Render Hero Cards Grid
  function renderHeroCards() {
    const grid = document.getElementById("heroes-grid");
    grid.innerHTML = tfiData.heroes
      .map(
        (hero) => `
        <div class="hero-card" onclick="openHeroModal('${hero.id}')">
          <div class="hero-img-box">
            <img src="${hero.image}" alt="${hero.name}" />
          </div>
          <div class="hero-card-info">
            <span class="hero-title-tag">${hero.title}</span>
            <h3 class="hero-name">${hero.name}</h3>
            <div class="hero-stat-pill" style="margin-top: 0.8rem;">
              Debut: <strong>${hero.debut}</strong>
            </div>
            <div class="hero-stat-pill" style="margin-top: 0.4rem;">
              Career Gross: <strong>₹${hero.totalGross} Cr+</strong>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  // 3. Populate Filter & Comparison Dropdowns
  function populateDropdowns() {
    const heroFilter = document.getElementById("hero-filter");
    const hero1Select = document.getElementById("hero-1-select");
    const hero2Select = document.getElementById("hero-2-select");

    tfiData.heroes.forEach((h, index) => {
      // Hero Filter
      const opt1 = document.createElement("option");
      opt1.value = h.name;
      opt1.textContent = h.name;
      heroFilter.appendChild(opt1);

      // Hero Compare 1 & 2
      const opt2 = document.createElement("option");
      opt2.value = h.id;
      opt2.textContent = h.name;
      if (index === 0) opt2.selected = true;
      hero1Select.appendChild(opt2);

      const opt3 = document.createElement("option");
      opt3.value = h.id;
      opt3.textContent = h.name;
      if (index === 1) opt3.selected = true;
      hero2Select.appendChild(opt3);
    });
  }

  // 4. Render Movie Data Table
  function renderTable(data) {
    const tbody = document.getElementById("movies-tbody");
    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem; color: var(--text-muted);">No movies match the search criteria.</td></tr>`;
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
        <td style="font-weight: 700; color: var(--accent-gold);">₹${m.gross} Cr</td>
        <td><span class="verdict-badge verdict-${m.verdict.toLowerCase().replace(/\s+/g, '-')}">${m.verdict}</span></td>
      </tr>
    `
      )
      .join("");
  }

  // 5. Filter & Sort Engine
  function filterAndSortData() {
    const searchVal = document.getElementById("search-input").value.toLowerCase();
    const selectedHero = document.getElementById("hero-filter").value;
    const selectedVerdict = document.getElementById("verdict-filter").value;

    let filtered = tfiData.movies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchVal) ||
        movie.director.toLowerCase().includes(searchVal);
      const matchesHero = selectedHero === "ALL" || movie.hero === selectedHero;
      const matchesVerdict = selectedVerdict === "ALL" || movie.verdict === selectedVerdict;
      return matchesSearch && matchesHero && matchesVerdict;
    });

    // Sorting
    filtered.sort((a, b) => {
      let valA = a[currentSortColumn];
      let valB = b[currentSortColumn];

      if (typeof valA === "string") {
        return currentSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return currentSortAsc ? valA - valB : valB - valA;
    });

    renderTable(filtered);
  }

  // 6. Bind Event Listeners
  function bindEvents() {
    document.getElementById("search-input").addEventListener("input", filterAndSortData);
    document.getElementById("hero-filter").addEventListener("change", filterAndSortData);
    document.getElementById("verdict-filter").addEventListener("change", filterAndSortData);

    // Table Header Click Sorting
    document.querySelectorAll(".data-table th").forEach((th) => {
      th.addEventListener("click", () => {
        const col = th.getAttribute("data-sort");
        if (currentSortColumn === col) {
          currentSortAsc = !currentSortAsc;
        } else {
          currentSortColumn = col;
          currentSortAsc = false;
        }
        filterAndSortData();
      });
    });

    // Hero Comparison Listeners
    document.getElementById("hero-1-select").addEventListener("change", renderComparison);
    document.getElementById("hero-2-select").addEventListener("change", renderComparison);

    // Modal Close
    document.getElementById("modal-close").addEventListener("click", closeModal);
  }

  // 7. Render Side-by-Side Hero Comparison
  function renderComparison() {
    const id1 = document.getElementById("hero-1-select").value;
    const id2 = document.getElementById("hero-2-select").value;
    const h1 = tfiData.heroes.find((h) => h.id === id1);
    const h2 = tfiData.heroes.find((h) => h.id === id2);

    const container = document.getElementById("compare-grid");
    container.innerHTML = [h1, h2]
      .map((h) => {
        const heroMovies = tfiData.movies.filter((m) => m.hero === h.name);
        const topMovie = heroMovies.reduce(
          (max, m) => (m.gross > (max?.gross || 0) ? m : max),
          null
        );
        const totalBlockbusters = heroMovies.filter(
          (m) => m.verdict.includes("Blockbuster") || m.verdict.includes("Industry Hit")
        ).length;

        return `
        <div class="compare-card">
          <h3>${h.name}</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">${h.title}</p>
          
          <div class="compare-metric">
            <span>Career Worldwide Gross</span>
            <strong>₹${h.totalGross} Cr+</strong>
          </div>
          <div class="compare-metric">
            <span>Highest Single Movie Gross</span>
            <strong>${topMovie ? `${topMovie.title} (₹${topMovie.gross} Cr)` : "N/A"}</strong>
          </div>
          <div class="compare-metric">
            <span>Blockbusters / Industry Hits Tracked</span>
            <strong>${totalBlockbusters}</strong>
          </div>
          <div class="compare-metric">
            <span>Debut Year & Film</span>
            <strong>${h.debut}</strong>
          </div>
        </div>
      `;
      })
      .join("");
  }

  // 8. Global Hero Modal Popup Function
  window.openHeroModal = function (heroId) {
    const hero = tfiData.heroes.find((h) => h.id === heroId);
    const heroMovies = tfiData.movies.filter((m) => m.hero === hero.name);

    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <h2 style="font-family: var(--font-heading); color: var(--accent-gold); font-size: 1.8rem;">${hero.name}</h2>
        <p style="color: var(--text-muted);">${hero.title}</p>
      </div>
      <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">${hero.description}</p>
      
      <h4 style="font-family: var(--font-heading); color: #fff; margin-bottom: 1rem;">Tracked Box Office Records</h4>
      <div style="display: flex; flex-direction: column; gap: 0.6rem;">
        ${heroMovies
          .map(
            (m) => `
          <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.03); padding: 0.8rem; border-radius: 8px;">
            <div>
              <strong style="color: #fff;">${m.title}</strong> (${m.year})
              <div style="font-size: 0.8rem; color: var(--text-muted);">Dir: ${m.director}</div>
            </div>
            <div style="text-align: right;">
              <span style="color: var(--accent-gold); font-weight: 700;">₹${m.gross} Cr</span>
              <div><span class="verdict-badge verdict-${m.verdict.toLowerCase().replace(/\s+/g, '-')}">${m.verdict}</span></div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    document.getElementById("hero-modal").classList.add("active");
  };

  function closeModal() {
    document.getElementById("hero-modal").classList.remove("active");
  }
});