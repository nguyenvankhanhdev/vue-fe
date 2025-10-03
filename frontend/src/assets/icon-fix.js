// Icon compatibility layer for ensuring all FontAwesome icons display correctly
document.addEventListener('DOMContentLoaded', function() {
  // Function to ensure icons are loaded and displayed
  function ensureIconsLoaded() {
    const icons = document.querySelectorAll('.fas, .far, .fab, .fal, .fad, .fat, .fass');
    
    icons.forEach(icon => {
      // Apply consistent font family
      if (!icon.style.fontFamily) {
        icon.style.fontFamily = '"Font Awesome 6 Free", "Font Awesome 6 Pro", "Font Awesome 6 Brands", monospace';
        icon.style.fontWeight = '900';
        icon.style.fontStyle = 'normal';
      }
      
      // Check if icon is displaying properly
      const computedStyle = window.getComputedStyle(icon);
      if (computedStyle.fontFamily.indexOf('Font Awesome') === -1) {
        // Fallback to inline style
        icon.style.fontFamily = '"Font Awesome 6 Free" !important';
        icon.style.fontWeight = '900 !important';
      }
    });
  }
  
  // Run immediately
  ensureIconsLoaded();
  
  // Re-run when new content is added (for Vue components)
  const observer = new MutationObserver(function(mutations) {
    let shouldRerun = false;
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && (
            node.classList?.contains('fas') || 
            node.classList?.contains('far') || 
            node.classList?.contains('fab') ||
            node.querySelector && node.querySelector('.fas, .far, .fab')
          )) {
            shouldRerun = true;
          }
        });
      }
    });
    
    if (shouldRerun) {
      setTimeout(ensureIconsLoaded, 100);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Force reload icons when FontAwesome CSS is loaded
  const fontAwesomeLinks = document.querySelectorAll('link[href*="font-awesome"]');
  fontAwesomeLinks.forEach(link => {
    link.addEventListener('load', () => {
      setTimeout(ensureIconsLoaded, 200);
    });
  });
});

// Vue directive for ensuring icons display
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.directive('icon-fix', {
    mounted(el) {
      if (el.classList.contains('fas') || el.classList.contains('far') || el.classList.contains('fab')) {
        el.style.fontFamily = '"Font Awesome 6 Free", "Font Awesome 6 Pro", "Font Awesome 6 Brands", monospace';
        el.style.fontWeight = '900';
        el.style.fontStyle = 'normal';
      }
    },
    updated(el) {
      if (el.classList.contains('fas') || el.classList.contains('far') || el.classList.contains('fab')) {
        el.style.fontFamily = '"Font Awesome 6 Free", "Font Awesome 6 Pro", "Font Awesome 6 Brands", monospace';
        el.style.fontWeight = '900';
        el.style.fontStyle = 'normal';
      }
    }
  });
}

// Icon fallback function
window.iconFallback = function(iconClass) {
  const iconMap = {
    'fa-tachometer-alt': '📊',
    'fa-boxes': '📦',
    'fa-tags': '🏷️',
    'fa-shopping-cart': '🛒',
    'fa-users': '👥',
    'fa-chart-bar': '📊',
    'fa-cog': '⚙️',
    'fa-store': '🏪',
    'fa-bars': '☰',
    'fa-times': '✕',
    'fa-user-circle': '👤',
    'fa-sign-out-alt': '🚪',
    'fa-bell': '🔔',
    'fa-envelope': '✉️',
    'fa-user': '👤',
    'fa-question-circle': '❓',
    'fa-plus': '➕',
    'fa-edit': '✏️',
    'fa-eye': '👁️',
    'fa-trash': '🗑️',
    'fa-search': '🔍',
    'fa-check-square': '☑️',
    'fa-angle-left': '‹',
    'fa-angle-right': '›',
    'fa-angle-double-left': '«',
    'fa-angle-double-right': '»'
  };
  
  return iconMap[iconClass] || '●';
};