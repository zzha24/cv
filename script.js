document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const themeToggle = document.getElementById('themeToggle');
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const modalTags = document.getElementById('modalTags');
  const projectDetails = {
    dashboard: { title: '可视化数据看板', text: '为业务团队设计并实现的实时数据看板。通过信息层级、筛选逻辑和渐进式渲染，让复杂数据真正参与决策。', tags: ['React', 'D3', '性能优化'] },
    system: { title: '一套会生长的设计系统', text: '从设计 Token、组件规范到 Storybook 文档，建立一套设计与工程共享的语言，帮助 6 个产品团队保持一致又不失灵活。', tags: ['UI Kit', 'Storybook', 'Tokens'] },
    mobile: { title: '一场轻盈的移动体验', text: '一组移动端活动页面的体验升级。通过动效节奏、触控反馈和资源策略，让低网络环境下的体验依然轻快。', tags: ['Mobile', 'Motion', 'UX'] }
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
      await navigator.clipboard.writeText('zhangzhao@example.com');
      button.innerHTML = 'zhangzhao@example.com <span>已复制 ✓</span>';
      window.setTimeout(() => { button.innerHTML = 'zhangzhao@example.com <span>复制邮箱 ↗</span>'; }, 2200);
    } catch (error) {
      button.innerHTML = 'zhangzhao@example.com <span>请手动复制</span>';
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
