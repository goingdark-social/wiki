// Enhanced mobile navigation for Going Dark Wiki
// Fixes UI/UX issues with mobile menu overlays and interactions

document.addEventListener('DOMContentLoaded', function () {
  // Get necessary elements
  const navToggle = document.querySelector('#nav-toggle');
  const overlay = document.querySelector('.hb-sidebar-mobile-menu');
  const sidebarContainer = document.querySelector('.hb-sidebar-container');
  const closeBtns = document.querySelectorAll('.mobile-sidebar-close');
  const hamburgerLabel = document.querySelector('label[for="nav-toggle"]');
  const body = document.body;

  // Check if we're on a page that has a sidebar
  const hasSidebar = overlay && sidebarContainer && navToggle && hamburgerLabel;

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
    hamburgerLabel.focus();
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
    focusableElements = Array.from(
      container.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]')
    ).filter(el => el.offsetParent !== null);
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
    if (firstFocusableElement) firstFocusableElement.focus();
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

  if (hamburgerLabel) {
    const toggleFromHamburger = event => {
      event.preventDefault();
      navToggle.checked = !isMenuOpen;
      navToggle.dispatchEvent(new Event('change'));
    };

    hamburgerLabel.addEventListener('click', toggleFromHamburger);
    hamburgerLabel.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        toggleFromHamburger(event);
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

  // Close mobile menu when navigating to a new page (mobile only)
  const sidebarLinks = sidebarContainer?.querySelectorAll('a[href]');
  sidebarLinks?.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href') || '';
      // Only for internal links that navigate away
      if (window.innerWidth < 1024 && !href.startsWith('http') && !href.startsWith('#')) {
        navToggle.checked = false;
        closeMobileMenu();
      }
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

      const ctrlId = button.getAttribute('aria-controls');
      const panel = document.getElementById(ctrlId);
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      if (panel) {
        panel.classList.toggle('hidden', isOpen);
        panel.classList.toggle('open', !isOpen);
      }

      const listItem = button.closest('li');
      if (listItem) {
        // Accordion: close siblings
        const parentList = listItem.parentElement;
        if (parentList) {
          const siblings = parentList.querySelectorAll(':scope > li.open');
          siblings.forEach(sibling => {
            if (sibling !== listItem) {
              sibling.classList.remove('open');
              // Also collapse their panels
              const sibBtn = sibling.querySelector('[data-hb-sidebar-toggle]');
              const sibCtrlId = sibBtn?.getAttribute('aria-controls');
              const sibPanel = sibCtrlId ? document.getElementById(sibCtrlId) : null;
              if (sibBtn) sibBtn.setAttribute('aria-expanded', 'false');
              if (sibPanel) {
                sibPanel.classList.add('hidden');
                sibPanel.classList.remove('open');
              }
            }
          });
        }
        // Toggle current section
        listItem.classList.toggle('open', !isOpen);
      }
    });
  });
});