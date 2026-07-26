
(() => {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const categories = window.PORTFOLIO_CATEGORIES || ["全部"];
  const grid = document.querySelector("#project-grid");
  const filters = document.querySelector("#filters");
  const count = document.querySelector("#work-count");
  const modal = document.querySelector("#project-modal");
  const modalContent = document.querySelector("#modal-content");
  const closeButton = document.querySelector(".modal-close");
  const videoGrid = document.querySelector("#video-grid");
  const videoCount = document.querySelector("#video-count");
  const videoDialog = document.querySelector("#video-dialog");
  const videoModalContent = document.querySelector("#video-modal-content");
  const videoDialogClose = document.querySelector(".video-dialog-close");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");

  let activeCategory = "全部";

  const escapeHtml = (value = "") =>
    value.replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));

  function renderFilters() {
    filters.innerHTML = categories.map(category => `
      <button class="filter-button ${category === activeCategory ? "active" : ""}"
        data-category="${escapeHtml(category)}" aria-pressed="${category === activeCategory}">
        ${escapeHtml(category)}
      </button>
    `).join("");

    filters.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.category;
        renderFilters();
        renderProjects();
      });
    });
  }

  function renderProjects() {
    const nonVideoProjects = projects.filter(project => project.category !== "视频剪辑");
    const visible = activeCategory === "全部"
      ? nonVideoProjects
      : nonVideoProjects.filter(project => project.category === activeCategory);

    count.textContent = `${String(visible.length).padStart(2, "0")} ITEMS`;

    grid.innerHTML = visible.map((project, index) => `
      <article class="project-card reveal" tabindex="0" role="button"
        aria-label="打开项目：${escapeHtml(project.title)}" data-project-id="${escapeHtml(project.id)}">
        <div class="project-media">
          <img src="${escapeHtml(project.cover)}" alt="${escapeHtml(project.title)}作品预览" loading="lazy">
          <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="project-type">${escapeHtml(project.category)}</span>
        </div>
        <div class="project-body">
          <div class="project-meta"><span>${escapeHtml(project.year)}</span><span>${escapeHtml(project.subtitle)}</span></div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.summary)}</p>
          <div class="project-tags">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      </article>
    `).join("");

    grid.querySelectorAll(".project-card").forEach(card => {
      const open = () => openProject(card.dataset.projectId);
      card.addEventListener("click", open);
      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      });
    });
    observeReveals();
  }


  function renderVideoShowcase() {
    if (!videoGrid) return;
    const videos = projects.filter(project => project.category === "视频剪辑");
    if (videoCount) videoCount.textContent = `${String(videos.length).padStart(2, "0")} ITEMS`;

    videoGrid.innerHTML = videos.map((project, index) => `
      <article class="video-card reveal">
        <div class="video-shell">
          <img src="${escapeHtml(project.media?.poster || project.cover)}"
            alt="${escapeHtml(project.title)}视频封面" loading="lazy">
          <button class="video-play" data-video-id="${escapeHtml(project.id)}"
            aria-label="播放${escapeHtml(project.title)}">
            <span>▶</span>
          </button>
          <span class="video-index">${String(index + 1).padStart(2, "0")}</span>
        </div>
        <div class="video-card-copy">
          <div class="video-card-meta">
            <span>${escapeHtml(project.subtitle)}</span>
            <span>${escapeHtml(project.year)}</span>
          </div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.summary)}</p>
          <div class="video-card-tags">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      </article>
    `).join("");

    videoGrid.querySelectorAll(".video-play").forEach(button => {
      button.addEventListener("click", () => openVideo(button.dataset.videoId));
    });
    observeReveals();
  }

  function videoMissingMarkup(project) {
    return `
      <div class="video-missing">
        <img src="${escapeHtml(project.media?.poster || project.cover)}" alt="">
        <div>
          <span class="eyebrow">VIDEO FILE PENDING</span>
          <h2>${escapeHtml(project.title)}</h2>
          <p>播放器接口已经接好。把对应 MP4 放进 <code>assets/videos/</code>，或在 <code>assets/data/projects.js</code> 中填写云端 <code>embedUrl</code>，这里即可直接播放。</p>
          <code>${escapeHtml(project.media?.src || "尚未填写视频地址")}</code>
        </div>
      </div>
    `;
  }

  function openVideo(id) {
    const project = projects.find(item => item.id === id);
    if (!project || !videoDialog || !videoModalContent) return;
    const media = project.media || {};

    if (media.embedUrl) {
      videoModalContent.innerHTML = `
        <iframe class="video-embed" src="${escapeHtml(media.embedUrl)}"
          title="${escapeHtml(project.title)}" allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen loading="lazy"></iframe>
      `;
    } else if (media.src) {
      videoModalContent.innerHTML = `
        <video class="video-direct-player" controls autoplay playsinline preload="metadata"
          poster="${escapeHtml(media.poster || project.cover)}">
          <source src="${escapeHtml(media.src)}" type="video/mp4">
          当前浏览器不支持视频播放。
        </video>
      `;
      const player = videoModalContent.querySelector("video");
      player.addEventListener("error", () => {
        videoModalContent.innerHTML = videoMissingMarkup(project);
      }, { once: true });
    } else {
      videoModalContent.innerHTML = videoMissingMarkup(project);
    }

    videoDialog.showModal();
    document.body.style.overflow = "hidden";
  }

  if (videoDialogClose) {
    videoDialogClose.addEventListener("click", () => videoDialog.close());
  }
  if (videoDialog) {
    videoDialog.addEventListener("click", event => {
      if (event.target === videoDialog) videoDialog.close();
    });
    videoDialog.addEventListener("close", () => {
      videoModalContent.innerHTML = "";
      if (!modal.open) document.body.style.overflow = "";
    });
  }

  function mediaMarkup(project) {
    const media = project.media || {};
    if (media.type === "article") {
      return `<div class="article-scroll"><img src="${escapeHtml(media.src)}" alt="${escapeHtml(project.title)}长图文预览"></div>`;
    }
    if (media.type === "image") {
      return `<img src="${escapeHtml(media.src)}" alt="${escapeHtml(project.title)}作品大图">`;
    }
    if (media.type === "video") {
      if (media.embedUrl) {
        return `<iframe class="video-frame" src="${escapeHtml(media.embedUrl)}" title="${escapeHtml(project.title)}视频" allowfullscreen loading="lazy"></iframe>`;
      }
      if (media.src) {
        return `<video class="video-player" controls playsinline preload="metadata" poster="${escapeHtml(media.poster || project.cover)}">
          <source src="${escapeHtml(media.src)}" type="video/mp4">
          当前浏览器不支持视频播放。
        </video>`;
      }
      return `<div class="video-placeholder">
        <img src="${escapeHtml(media.poster || project.cover)}" alt="">
        <div>
          <strong>视频接口已预留</strong>
          <p>在 <code>assets/data/projects.js</code> 中填写 <code>media.src</code>（MP4直链）或 <code>media.embedUrl</code>（B站/云点播嵌入地址），这里就会自动变成播放器。</p>
        </div>
      </div>`;
    }
    return `<img src="${escapeHtml(project.cover)}" alt="${escapeHtml(project.title)}作品预览">`;
  }

  function openProject(id) {
    const project = projects.find(item => item.id === id);
    if (!project) return;

    modalContent.innerHTML = `
      <div class="modal-layout">
        <div class="modal-media">${mediaMarkup(project)}</div>
        <div class="modal-info">
          <span class="eyebrow">${escapeHtml(project.category)} / ${escapeHtml(project.year)}</span>
          <h2>${escapeHtml(project.title)}</h2>
          <p class="modal-summary">${escapeHtml(project.summary)}</p>
          <dl class="detail-list">
            <div><dt>定位</dt><dd>${escapeHtml(project.subtitle)}</dd></div>
            <div><dt>职责</dt><dd>${escapeHtml(project.role)}</dd></div>
            <div><dt>工具</dt><dd>${escapeHtml(project.tools)}</dd></div>
          </dl>
          <div class="modal-tags">${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      </div>
    `;
    modal.showModal();
    document.body.style.overflow = "hidden";
  }

  closeButton.addEventListener("click", () => modal.close());
  modal.addEventListener("click", event => {
    if (event.target === modal) modal.close();
  });
  modal.addEventListener("close", () => {
    document.body.style.overflow = "";
    modalContent.innerHTML = "";
  });

  document.querySelectorAll(".js-open-project").forEach(button => {
    button.addEventListener("click", () => openProject(button.dataset.projectId));
  });

  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));

  document.querySelector("#copy-email").addEventListener("click", async event => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText(button.dataset.email);
      const original = button.textContent;
      button.textContent = "已复制";
      setTimeout(() => button.textContent = original, 1600);
    } catch {
      window.location.href = `mailto:${button.dataset.email}`;
    }
  });

  const progress = document.querySelector(".reading-progress span");
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }, { passive: true });

  function observeReveals() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
  }

  document.querySelector("#year").textContent = new Date().getFullYear();
  renderFilters();
  renderVideoShowcase();
  renderProjects();
  observeReveals();
})();
