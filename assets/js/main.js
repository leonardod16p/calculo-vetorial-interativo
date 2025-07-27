document.addEventListener("DOMContentLoaded", () => {
  const sidebarPlaceholder = document.getElementById("sidebar-placeholder");
  const toggleMenuBtn = document.getElementById("toggleMenuBtn");
  const container = document.getElementById("container");

  // Determina o caminho para a sidebar
  const isIndex = window.location.pathname.endsWith('/') || 
                 window.location.pathname.endsWith('index.html');
  const sidebarPath = isIndex ? 'partials/sidebar.html' : '../partials/sidebar.html';

  // 1. Carregar a sidebar dinamicamente com efeitos visuais
  if (sidebarPlaceholder) {
    fetch(sidebarPath)
      .then(response => response.text())
      .then(data => {
        sidebarPlaceholder.innerHTML = data;
        
        // Adiciona classe de animação após carregamento
        setTimeout(() => {
          const sidebar = document.querySelector('.sidebar');
          if (sidebar) {
            sidebar.classList.add('sidebar-loaded');
          }
          
          highlightActiveLink();
          setupSidebarHoverEffects();
        }, 100);
      })
      .catch(error => console.error('Erro ao carregar a sidebar:', error));
  }

  // 2. Controlar o menu responsivo com animação
  if (toggleMenuBtn && container) {
    toggleMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      container.classList.toggle("sidebar-visible");
      
      // Animação do botão
      toggleMenuBtn.classList.toggle('menu-active');
    });

    // Fechar o menu ao clicar fora
    document.addEventListener('click', (event) => {
      if (container.classList.contains('sidebar-visible') && 
          !event.target.closest('.sidebar') && 
          !event.target.closest('#toggleMenuBtn')) {
        container.classList.remove('sidebar-visible');
        toggleMenuBtn.classList.remove('menu-active');
      }
    });
  }

  // 3. Destacar link ativo com efeitos
  function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    
    sidebarLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath) {
        link.classList.add("active");
        
        // Adiciona ícone de destaque
        const highlightIcon = document.createElement('span');
        highlightIcon.className = 'active-highlight';
        link.prepend(highlightIcon);
      }
    });
  }

  // 4. Efeitos de hover avançados
  function setupSidebarHoverEffects() {
    const links = document.querySelectorAll('.sidebar a:not(.active)');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(8px)';
        link.style.boxShadow = '0 4px 12px rgba(79, 195, 247, 0.3)';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateX(0)';
        link.style.boxShadow = 'none';
      });
    });
  }
});

// Adicione isto ao seu CSS para complementar:
