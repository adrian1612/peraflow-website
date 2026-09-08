document.getElementById('year').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 8
    ? '0 8px 28px rgba(15, 23, 42, 0.08)'
    : 'none';
});
