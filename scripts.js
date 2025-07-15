const container = document.getElementById('container');
const btn = document.getElementById('toggleMenuBtn');
btn.addEventListener('click', () => {
  container.classList.toggle('sidebar-closed');
});

// Marca link ativo automaticamente
const links = document.querySelectorAll('nav.sidebar a');
const current = location.pathname.split('/').pop() || 'index.html';
links.forEach(link => {
  if(link.getAttribute('href') === current) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// Canvas demo
const canvas = document.getElementById('canvas');
if(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(20, 20, 560, 260);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px EB Garamond, serif';
  ctx.textAlign = 'center';
  ctx.fillText('Canvas Interativo', canvas.width / 2, canvas.height / 2);
}

// Carregar sidebar dinamicamente
fetch('/components/sidebar.html') // ajuste o caminho se estiver em outro lugar
  .then(response => response.text())
  .then(data => {
    document.getElementById('sidebar-placeholder').innerHTML = data;
  });
