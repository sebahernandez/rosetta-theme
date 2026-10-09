// Remove box-shadow from quick-add buttons dynamically
document.addEventListener("DOMContentLoaded", function () {
  function removeShadowsFromButtons() {
    // Find all quick-add submit buttons
    const buttons = document.querySelectorAll(".quick-add__submit");

    buttons.forEach((button) => {
      // Remove box-shadow from the button itself
      button.style.setProperty("box-shadow", "none", "important");
      button.style.setProperty("-webkit-box-shadow", "none", "important");
      button.style.setProperty("-moz-box-shadow", "none", "important");
      button.style.setProperty("filter", "none", "important");

      // Create style rules for pseudo-elements
      const styleId =
        "remove-button-shadows-" + Math.random().toString(36).substr(2, 9);
      let style = document.getElementById(styleId);

      if (!style) {
        style = document.createElement("style");
        style.id = styleId;
        document.head.appendChild(style);
      }

      // Add CSS rules to completely eliminate pseudo-element shadows
      const css = `
        .quick-add__submit::before,
        .quick-add__submit::after {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          box-shadow: none !important;
          -webkit-box-shadow: none !important;
          -moz-box-shadow: none !important;
          filter: none !important;
          content: none !important;
          background: none !important;
          background-image: none !important;
          background-color: transparent !important;
          position: absolute !important;
          left: -99999px !important;
          top: -99999px !important;
          width: 0 !important;
          height: 0 !important;
          transform: scale(0) !important;
          z-index: -1 !important;
        }
        
        .quick-add__submit:focus::before,
        .quick-add__submit:focus::after,
        .quick-add__submit:hover::before,
        .quick-add__submit:hover::after,
        .quick-add__submit:active::before,
        .quick-add__submit:active::after {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          box-shadow: none !important;
          -webkit-box-shadow: none !important;
          -moz-box-shadow: none !important;
          filter: none !important;
          content: none !important;
        }
      `;

      style.textContent = css;
    });
  }

  // Run immediately
  removeShadowsFromButtons();

  // Run again after a short delay to catch dynamically loaded content
  setTimeout(removeShadowsFromButtons, 100);
  setTimeout(removeShadowsFromButtons, 500);
  setTimeout(removeShadowsFromButtons, 1000);

  // Run when new content is added (for AJAX loading)
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length > 0) {
        removeShadowsFromButtons();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

// Also run on window load as a fallback
window.addEventListener("load", function () {
  setTimeout(function () {
    const buttons = document.querySelectorAll(".quick-add__submit");
    buttons.forEach((button) => {
      button.style.setProperty("box-shadow", "none", "important");
      button.style.setProperty("-webkit-box-shadow", "none", "important");
      button.style.setProperty("-moz-box-shadow", "none", "important");
    });
  }, 100);
});
