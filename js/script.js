(() => {
  'use strict';
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  const syncNav = () => { if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20); };
  syncNav(); window.addEventListener('scroll', syncNav, { passive: true });
  if (toggle && menu) {
    const closeMenu = () => { menu.classList.remove('open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open navigation'); document.body.classList.remove('menu-open'); };
    toggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); toggle.classList.toggle('open',open); toggle.setAttribute('aria-expanded',String(open)); toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation'); document.body.classList.toggle('menu-open',open); });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu)); window.addEventListener('resize', () => { if (window.innerWidth >= 820) closeMenu(); });
  }
  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold:.12, rootMargin:'0px 0px -60px 0px' }); reveal.forEach(el => observer.observe(el)); } else reveal.forEach(el => el.classList.add('is-visible'));
  document.querySelectorAll('.service-row').forEach(row => { const button=row.querySelector('.service-toggle'); if(!button)return; button.addEventListener('click',()=>{ const opening=!row.classList.contains('open'); document.querySelectorAll('.service-row.open').forEach(other=>{other.classList.remove('open');other.querySelector('.service-toggle')?.setAttribute('aria-expanded','false');}); row.classList.toggle('open',opening); button.setAttribute('aria-expanded',String(opening)); }); });
  const form=document.getElementById('quoteForm'); const status=document.getElementById('formStatus'); const submitButton=form?.querySelector('button[type="submit"]');
  if(form&&status){ form.addEventListener('submit', async event=>{ event.preventDefault(); if(!form.checkValidity()){form.reportValidity();status.textContent='Please complete the required fields.';return;} if(submitButton){submitButton.disabled=true;submitButton.setAttribute('aria-busy','true');} status.textContent='Sending your quote request…'; const formData=new FormData(form); const email=String(formData.get('email')||'').trim(); const name=String(formData.get('name')||'').trim(); formData.set('_replyto',email); formData.set('_subject',`Contractors Supply quote request from ${name}`); try{ const response=await fetch('https://formspree.io/f/moeakoaq',{method:'POST',headers:{Accept:'application/json'},body:formData}); if(!response.ok){let detail='';try{const result=await response.json();detail=result?.errors?.map(error=>error.message).join(' ')||'';}catch(_){} throw new Error(detail||'Form submission failed.');} form.reset(); status.textContent='Thanks — your quote request was sent successfully.'; }catch(error){console.error(error);status.textContent='We could not send the request. Please call (352) 372-6315 instead.';}finally{if(submitButton){submitButton.disabled=false;submitButton.removeAttribute('aria-busy');}} }); }
})();
