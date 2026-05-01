document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("is-open");
});

navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    history.replaceState(null, "", href);
  });
});

const copyCaBtn = document.getElementById("copy-ca-btn");
const caText = document.getElementById("ca-text");
const buyBtn = document.getElementById("buy-btn");
copyCaBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(caText.textContent.trim());
    copyCaBtn.textContent = "Copied";
    setTimeout(() => {
      copyCaBtn.textContent = "Copy";
    }, 1200);
  } catch (_error) {
    copyCaBtn.textContent = "Failed";
    setTimeout(() => {
      copyCaBtn.textContent = "Copy";
    }, 1200);
  }
});

buyBtn.addEventListener("click", () => {
  window.alert("Buy link goes live soon.");
});

function updateScrollMood() {
  const maxScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, window.scrollY / maxScrollable);
  const mood = (progress * 0.7).toFixed(3);
  document.documentElement.style.setProperty("--mood", mood);
}

window.addEventListener("scroll", updateScrollMood, { passive: true });
window.addEventListener("resize", updateScrollMood);
updateScrollMood();

const roadmapData = {
  "1": {
    phase: "Phase 1",
    icon: `<svg viewBox="0 0 24 24" role="img" focusable="false" aria-hidden="true">
      <path d="M12 3l7 7-7 11-7-11 7-7z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"></path>
      <path d="M12 7.5v5.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
    </svg>`,
    title: "Ignition",
    description: "Brand reveal, social push, and first wave believers onboard.",
    points: [
      "Hero campaign and visual identity launch",
      "X growth sprint and meme distribution",
      "Community channels activated"
    ]
  },
  "2": {
    phase: "Phase 2",
    icon: `<svg viewBox="0 0 24 24" role="img" focusable="false" aria-hidden="true">
      <path d="M13 2L6 13h5l-1 9 8-12h-5l0-8z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"></path>
    </svg>`,
    title: "Momentum",
    description: "Expand reach and increase daily conversion across every touchpoint.",
    points: [
      "Partner creator drops",
      "Live community sessions",
      "Daily growth dashboard tracking"
    ]
  },
  "3": {
    phase: "Phase 3",
    icon: `<svg viewBox="0 0 24 24" role="img" focusable="false" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"></circle>
      <path d="M3.7 12h16.6M12 3.5c2.4 2.3 3.8 5.4 3.8 8.5s-1.4 6.2-3.8 8.5M12 3.5c-2.4 2.3-3.8 5.4-3.8 8.5s1.4 6.2 3.8 8.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"></path>
    </svg>`,
    title: "Expansion",
    description: "Scale market presence and strengthen ecosystem utility.",
    points: [
      "Liquidity depth improvements",
      "Cross-community collaborations",
      "Brand-led campaign waves"
    ]
  },
  "4": {
    phase: "Phase 4",
    icon: `<svg viewBox="0 0 24 24" role="img" focusable="false" aria-hidden="true">
      <path d="M4 8l4 4 4-6 4 6 4-4-2 10H6L4 8z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"></path>
      <path d="M7 18h10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
    </svg>`,
    title: "Legacy",
    description: "Long-term positioning with continuous narrative and product upgrades.",
    points: [
      "Sustained roadmap releases",
      "Culture-first ecosystem building",
      "Broader market positioning"
    ]
  }
};

const roadmapPills = document.querySelectorAll(".roadmap-pill");
const roadmapPanel = document.getElementById("roadmap-panel");

function renderRoadmap(phaseKey) {
  const item = roadmapData[phaseKey];
  if (!item) return;
  roadmapPanel.classList.add("is-transitioning");
  setTimeout(() => {
  roadmapPanel.innerHTML = `
    <span class="roadmap-phase-tag">${item.phase}</span>
    <span class="roadmap-icon" aria-hidden="true">${item.icon}</span>
    <h3>${item.title}</h3>
    <p>${item.description}</p>
    <ul>${item.points.map((point) => `<li>${point}</li>`).join("")}</ul>
  `;
  roadmapPanel.classList.remove("is-transitioning");
  }, 120);
}

roadmapPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    roadmapPills.forEach((otherPill) => otherPill.classList.remove("is-active"));
    pill.classList.add("is-active");
    renderRoadmap(pill.dataset.roadmap);
  });
});

const dexscreenerContainer = document.getElementById("dexscreener-widget");

// Fill these when the contract address goes live.
const dexChain = "solana";
const contractAddress = "";

if (contractAddress.trim().length > 0) {
  const iframe = document.createElement("iframe");
  iframe.title = "Dexscreener chart widget";
  iframe.src = `https://dexscreener.com/${dexChain}/${contractAddress}?embed=1&theme=light&trades=0&info=0`;
  iframe.allow = "clipboard-write";
  dexscreenerContainer.appendChild(iframe);
} else {
  dexscreenerContainer.innerHTML = `
    <div class="widget-placeholder">
      <p>
        Dexscreener widget will appear here once the official contract address is set in <code>script.js</code>.<br />
        Open <a href="https://dexscreener.com" target="_blank" rel="noreferrer">dexscreener.com</a> for market discovery in the meantime.
      </p>
    </div>
  `;
}
