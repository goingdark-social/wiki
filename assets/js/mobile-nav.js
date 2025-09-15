// Enhanced mobile navigation for Going Dark Wiki
// Fixes UI/UX issues with mobile menu overlays and interactions

document.addEventListener('DOMContentLoaded', function () {
  // Get necessary elements
  const navToggle = document.querySelector('#nav-toggle');
  const overlay = document.querySelector('.hb-sidebar-mobile-menu');
  const sidebarContainer = document.querySelector('.hb-sidebar-container');
  const closeBtns = document.querySelectorAll('.mobile-sidebar-close');
  const body = document.body;

  // Check if we're on a page that has a sidebar
  const hasSidebar = overlay && sidebarContainer;

  if (!hasSidebar) {
    return; // Exit early if no sidebar functionality needed
  }

  // Mobile menu state management
  let isMenuOpen = false;

  function openMobileMenu() {
    if (isMenuOpen) return;
    
    isMenuOpen = true;
    
    // Show overlay
    overlay.classList.remove('hidden');
    overlay.classList.add('block');
    
    // Slide in sidebar
    sidebarContainer.classList.remove('-translate-x-full');
    sidebarContainer.classList.add('translate-x-0');
    
    // Prevent body scrolling
    body.classList.add('overflow-hidden');
    body.style.paddingRight = getScrollbarWidth() + 'px';
    
    // Set focus trap
    trapFocus(sidebarContainer);
    
    // Update hamburger button state
    updateHamburgerButton(true);
  }

  function closeMobileMenu() {
    if (!isMenuOpen) return;
    
    isMenuOpen = false;
    
    // Hide overlay
    overlay.classList.add('hidden');
    overlay.classList.remove('block');
    
    // Slide out sidebar
    sidebarContainer.classList.add('-translate-x-full');
    sidebarContainer.classList.remove('translate-x-0');
    
    // Restore body scrolling
    body.classList.remove('overflow-hidden');
    body.style.paddingRight = '';
    
    // Remove focus trap
    removeFocusTrap();
    
    // Update hamburger button state
    updateHamburgerButton(false);
    
    // Return focus to hamburger button
    const hamburgerLabel = document.querySelector('label[for="nav-toggle"]');
    if (hamburgerLabel) {
      hamburgerLabel.focus();
    }
  }

  function updateHamburgerButton(isOpen) {
    const showButton = document.querySelector('#show-button');
    const hideButton = document.querySelector('#hide-button');
    
    if (isOpen) {
      showButton?.classList.add('hidden');
      showButton?.classList.remove('block');
      hideButton?.classList.remove('hidden');
      hideButton?.classList.add('block');
    } else {
      showButton?.classList.remove('hidden');
      showButton?.classList.add('block');
      hideButton?.classList.add('hidden');
      hideButton?.classList.remove('block');
    }
  }

  function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  // Focus trap functionality for accessibility
  let focusableElements = [];
  let firstFocusableElement = null;
  let lastFocusableElement = null;

  function trapFocus(container) {
    focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  }

  function removeFocusTrap() {
    focusableElements = [];
    firstFocusableElement = null;
    lastFocusableElement = null;
  }

  // Event listeners
  
  // Hamburger menu toggle
  if (navToggle) {
    navToggle.addEventListener('change', function() {
      if (this.checked) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });
  }

  // Overlay click to close
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        navToggle.checked = false;
        closeMobileMenu();
      }
    });
  }

  // Close button in mobile sidebar
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      navToggle.checked = false;
      closeMobileMenu();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!isMenuOpen) return;

    // Escape key closes menu
    if (e.key === 'Escape') {
      navToggle.checked = false;
      closeMobileMenu();
      return;
    }

    // Tab key focus trapping
    if (e.key === 'Tab') {
      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement?.focus();
          e.preventDefault();
        }
      }
    }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024 && isMenuOpen) { // lg breakpoint
      navToggle.checked = false;
      closeMobileMenu();
    }
  });

  // Accordion behavior for sidebar sections
  const toggleButtons = document.querySelectorAll('[data-hb-sidebar-toggle]');
  toggleButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent navigation
      
      const listItem = button.closest('li');
      if (listItem) {
        const isOpen = listItem.classList.contains('open');
        
        // Close all other sections at the same level for accordion behavior
        const parentList = listItem.parentElement;
        if (parentList) {
          const siblings = parentList.querySelectorAll(':scope > li.open');
          siblings.forEach(sibling => {
            if (sibling !== listItem) {
              sibling.classList.remove('open');
            }
          });
        }
        
        // Toggle current section
        listItem.classList.toggle('open', !isOpen);
      }
    });
  });

  // Close mobile menu when navigating to a new page
  const sidebarLinks = sidebarContainer?.querySelectorAll('a[href]');
  sidebarLinks?.forEach(link => {
    link.addEventListener('click', function() {
      // Only close if it's an internal link and we're on mobile
      if (window.innerWidth < 1024 && !this.getAttribute('href').startsWith('http')) {
        setTimeout(() => {
          navToggle.checked = false;
          closeMobileMenu();
        }, 100);
      }
    });
  });
});

// Improved mobile touch targets and spacing
document.addEventListener('DOMContentLoaded', function() {
  // Add proper touch targets to all interactive elements
  const interactiveElements = document.querySelectorAll('button, a, input[type="checkbox"], input[type="radio"]');
  
  interactiveElements.forEach(element => {
    const style = window.getComputedStyle(element);
    const minHeight = parseInt(style.minHeight) || 0;
    const minWidth = parseInt(style.minWidth) || 0;
    
    // Ensure minimum 44px touch targets on mobile
    if (window.innerWidth < 768) {
      if (minHeight < 44) {
        element.style.minHeight = '44px';
      }
      if (minWidth < 44) {
        element.style.minWidth = '44px';
      }
    }
  });
});

// Handle safe area insets for mobile devices
document.addEventListener('DOMContentLoaded', function() {
  // Add CSS custom properties for safe area handling
  const root = document.documentElement;
  
  if (CSS.supports('padding: env(safe-area-inset-top)')) {
    root.style.setProperty('--safe-area-top', 'env(safe-area-inset-top)');
    root.style.setProperty('--safe-area-bottom', 'env(safe-area-inset-bottom)');
    root.style.setProperty('--safe-area-left', 'env(safe-area-inset-left)');
    root.style.setProperty('--safe-area-right', 'env(safe-area-inset-right)');
  } else {
    root.style.setProperty('--safe-area-top', '0px');
    root.style.setProperty('--safe-area-bottom', '0px');
    root.style.setProperty('--safe-area-left', '0px');
    root.style.setProperty('--safe-area-right', '0px');
  }
});