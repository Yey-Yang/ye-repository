// Theme toggle with localStorage
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const storedTheme = localStorage.getItem('theme') || 'dark';
if(storedTheme === 'light'){ root.setAttribute('data-theme','light'); themeBtn.textContent = '🌙'; }
else { root.removeAttribute('data-theme'); themeBtn.textContent = '🌞'; }

themeBtn.addEventListener('click', () => {
const isLight = root.getAttribute('data-theme') === 'light';
if(isLight){ root.removeAttribute('data-theme'); localStorage.setItem('theme','dark'); themeBtn.textContent = '🌞'; }
else { root.setAttribute('data-theme','light'); localStorage.setItem('theme','light'); themeBtn.textContent = '🌙'; }
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Typing effect
const roles = ['ນັກສຶກສາ', 'ສະມາຊິກ iATER'];
const typingEl = document.getElementById('typing');
let r = 0, c = 0, deleting = false;
function type(){
const word = roles[r % roles.length];
if(!deleting){
typingEl.textContent = word.slice(0, ++c);
if(c === word.length){ deleting = true; setTimeout(type, 1200); return; }
} else {
typingEl.textContent = word.slice(0, --c);
if(c === 0){ deleting = false; r++; }
}
setTimeout(type, deleting ? 40 : 80);
}
type();

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
for(const e of entries){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } }
},{ threshold: .2 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contact form (local demo validation)
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', (ev)=>{
ev.preventDefault();
const data = Object.fromEntries(new FormData(form));
if(!data.name || !data.email || !data.message){ formMsg.textContent = 'ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ'; return; }
// Fake success for demo
formMsg.textContent = 'ສົ່ງສຳເລັດ! (ຕົວຢ່າງ)';
form.reset();
});

// Back to top
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', ()=>{
if(scrollY > 400) toTop.classList.add('show'); else toTop.classList.remove('show');
});
toTop.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Helper: add some demo projects (optional)
const projectsGrid = document.getElementById('projectsGrid');
const demoProjects = [
{title:'Project One', desc:'ແອັບຄຳນວນຄ່າທີ່ຮຽນຂອງນັກຮຽນ ດ້ວຍ JavaScript ແລະ LocalStorage', tag:'JS • Web App'},
{title:'Project Two', desc:'ເວັບບລ໋ອກສ່ວນຕົວ ດ້ວຍ UI ແບບ Minimal', tag:'HTML • CSS'},
{title:'Project Three', desc:'Dashboard ສະແດງຂໍ້ມູນ ກັບການອັນຍະໂມດແລະກາຟ', tag:'Charts • UX'}
];
for(const p of demoProjects){
const a = document.createElement('article'); a.className='card reveal';
a.innerHTML = `<div class="thumb"></div>
<h3>${p.title}</h3>
<p class="hint">${p.desc}</p>
<div class="pill">${p.tag}</div>`;
projectsGrid.appendChild(a);
io.observe(a);
}