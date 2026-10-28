const byId = (id) => document.getElementById(id);

function renderSkills() {
  const root = byId("skillsGrid");
  if (!root || !Array.isArray(skills)) return;
  root.innerHTML = skills.map((skill) => `
    <article class="skill-card">
     <div class="card-index">${skill.number}</div><h3>${skill.title}</h3>
      <div class="tag-list">${skill.items.map(item => `<span>${item}</span>`).join("")}</div>
    </article>`).join("");
}
function renderExperience() {
  const root = byId("experienceTimeline");
  if (!root || !Array.isArray(experience)) return;
  root.innerHTML = experience.map(item => `
    <article class="timeline-item"><div class="timeline-marker"></div>
      <div class="timeline-period">${item.period}</div><div class="timeline-main">
        <h3>${item.role}</h3><div class="timeline-company">${item.company}</div><p>${item.description}</p>
      </div><span class="timeline-arrow">↗</span>
    </article>`).join("");
}
function renderProjects() {
  const root = byId("projectGrid");
  if (!root || !Array.isArray(projects)) return;
  root.innerHTML = projects.map(project => `
   <article class="project-card">${project.image ? `<img class="project-img" src="${project.image}" alt="${project.title}">` : ""}<div class="project-top">
   <span>${project.number}</span><span class="project-arrow">↗</span></div>
      <div class="project-category">${project.category}</div><h3>${project.title}</h3><p>${project.description}</p>
      <div class="tag-list">${project.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
      <div class="project-outcome">${project.outcome}</div>
    </article>`).join("");
}
function renderCertifications() {
  const root = byId("certList");
  if (!root || !Array.isArray(certifications)) return;
  root.innerHTML = certifications.map((cert, index) => `
    <article class="cert-row"><span class="cert-number">0${index + 1}</span>
      <div><h3>${cert.name}</h3><p>${cert.note}</p></div><span class="cert-code">${cert.code}</span>
    </article>`).join("");
}
const toggle = byId("menuToggle");
const nav = byId("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}
byId("year").textContent = new Date().getFullYear();
renderSkills(); renderExperience(); renderProjects(); renderCertifications();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".skill-card, .project-card, .timeline-item, .cert-row, .stats-row > div").forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});