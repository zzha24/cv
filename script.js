document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const themeToggle = document.getElementById('themeToggle');
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const modalTags = document.getElementById('modalTags');
  const projectDetails = {
    'ink-bamboo': { title: '《墨色竹韵》', url: 'projects/ink-bamboo.html' },
    'street-life': { title: '《市井烟火》', url: 'projects/street-life.html' },
    'field-study': { title: '外景采风', url: 'projects/field-study.html' }
  };

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

  const openProject = (card) => {
    const detail = projectDetails[card.dataset.project];
    window.location.href = detail.url;
  };

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => openProject(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject(card);
      }
    });
  });
  const closeModal = () => { modal.close(); document.body.classList.remove('modal-open'); };
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });

  document.getElementById('copyEmail').addEventListener('click', async (event) => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText('jinmeizhang@In.hk');
      button.innerHTML = 'jinmeizhang@In.hk <span>已复制 ✓</span>';
      window.setTimeout(() => { button.innerHTML = 'jinmeizhang@In.hk <span>复制邮箱 ↗</span>'; }, 2200);
    } catch (error) {
      button.innerHTML = 'jinmeizhang@In.hk <span>请手动复制</span>';
    }
  });

  const avatar = document.getElementById('avatar');
  avatar.addEventListener('pointermove', (event) => {
    const bounds = avatar.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    avatar.style.transform = `rotateX(${-y * 8}deg) rotateY(${x * 10}deg)`;
  });
  avatar.addEventListener('pointerleave', () => { avatar.style.transform = ''; });
});
