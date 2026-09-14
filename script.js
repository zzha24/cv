// script for animations, mobile menu and interactions
document.addEventListener('DOMContentLoaded', ()=>{
  // Mobile nav toggle
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', ()=>{
    nav.classList.toggle('open');
    const expanded = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', expanded);
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav after click
        if(nav.classList.contains('open')) nav.classList.remove('open');
      }
    })
  });

  // IntersectionObserver for reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    })
  },{threshold:0.12});
  revealEls.forEach(el=>io.observe(el));

  // subtle parallax tilt on avatar
  const avatar = document.getElementById('avatar');
  if(avatar){
    avatar.addEventListener('pointermove', (e)=>{
      const r = avatar.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      avatar.style.transform = `rotateX(${ -py * 6 }deg) rotateY(${ px * 8 }deg) translateZ(6px)`;
    });
    avatar.addEventListener('pointerleave', ()=>{
      avatar.style.transform = '';
    });
  }
});
