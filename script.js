document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const themeToggle = document.getElementById('themeToggle');
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const modalTags = document.getElementById('modalTags');
  const projectDetails = {
    'ink-bamboo': { title: '《墨色竹韵》', text: '以“墨竹韵”为主题的商业人像摄影小组项目。主导创意策划、团队任务分配与协作，并负责 Photoshop 后期，包括色彩调整、图像合成与特效添加。作品荣获第十三届未来设计师·全国高校数字艺术设计大赛湖北省本科组三等奖。', tags: ['商业人像', 'Photoshop', '省赛三等奖'] },
    'street-life': { title: '《市井烟火》', text: '聚焦民生议题的新闻摄影小组项目。主导主题策划，负责社会调研、现场拍摄、Illustrator 版面编辑，以及课堂最终展示与成果展览。', tags: ['新闻摄影', '社会调研', '版面设计'] },
    'field-study': { title: '外景采风', text: '以兰州市藏区文化展示为主题的风光摄影田野调查小组项目。负责七天拍摄任务的主题设定、行程规划与执行，并通过 Photoshop 完成后期处理和版面编辑，最终以视觉作品集形式展出。', tags: ['风光摄影', '田野调查', '作品集'] }
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
    modalTitle.textContent = detail.title;
    modalText.textContent = detail.text;
    modalTags.innerHTML = detail.tags.map((tag) => `<span>${tag}</span>`).join('');
    modal.showModal();
    document.body.classList.add('modal-open');
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
