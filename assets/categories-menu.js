/**
 * <categories-menu>: two-column category panel for the header second row.
 * Markup is rendered server-side (snippets/header-categories-menu.liquid);
 * this element only handles open/close, active category and keyboard support.
 */
class CategoriesMenu extends HTMLElement {
  constructor() {
    super();
    this.button = this.querySelector('[data-categories-button]');
    this.panel = this.querySelector('.categories-panel');
    this.links = Array.from(this.querySelectorAll('.categories-list__link'));
    this.contents = Array.from(this.querySelectorAll('.categories-content'));
    this.header = document.querySelector('.header-wrapper');
    this.hoverTimer = null;
    this.hoverDelay = 80;

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onKeydown = this.onKeydown.bind(this);

    this.button.addEventListener('click', () => this.toggle());
    this.button.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' && this.isOpen) {
        event.preventDefault();
        this.getActiveLink().focus();
      }
    });
    this.addEventListener('keydown', this.onKeydown);
    this.addEventListener('focusout', (event) => {
      if (this.isOpen && event.relatedTarget && !this.contains(event.relatedTarget)) this.close();
    });

    this.links.forEach((link) => {
      // Hover switches the category after a short delay to avoid flicker on diagonal moves
      link.addEventListener('mouseenter', () => {
        clearTimeout(this.hoverTimer);
        this.hoverTimer = setTimeout(() => this.activate(link), this.hoverDelay);
      });
      link.addEventListener('mouseleave', () => clearTimeout(this.hoverTimer));
      link.addEventListener('focus', () => this.activate(link));
    });
  }

  get isOpen() {
    return this.button.getAttribute('aria-expanded') === 'true';
  }

  getActiveLink() {
    return this.links.find((link) => link.classList.contains('is-active')) || this.links[0];
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.panel.hidden = false;
    this.button.setAttribute('aria-expanded', 'true');
    if (this.header) this.header.preventHide = true;
    document.addEventListener('click', this.onDocumentClick);
  }

  close(returnFocus = false) {
    clearTimeout(this.hoverTimer);
    this.panel.hidden = true;
    this.button.setAttribute('aria-expanded', 'false');
    if (this.header) this.header.preventHide = false;
    document.removeEventListener('click', this.onDocumentClick);
    if (returnFocus) this.button.focus();
  }

  activate(link) {
    if (!link || link.classList.contains('is-active')) return;
    this.links.forEach((item) => item.classList.toggle('is-active', item === link));
    this.contents.forEach((content) => {
      const isTarget = content.id === link.dataset.target;
      content.hidden = !isTarget;
      content.classList.toggle('is-active', isTarget);
    });
  }

  onDocumentClick(event) {
    if (!this.contains(event.target)) this.close();
  }

  onKeydown(event) {
    if (event.key === 'Escape' && this.isOpen) {
      event.preventDefault();
      this.close(true);
      return;
    }

    const index = this.links.indexOf(document.activeElement);
    if (index === -1) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      const next = (index + step + this.links.length) % this.links.length;
      this.links[next].focus();
    }
  }
}

if (!customElements.get('categories-menu')) customElements.define('categories-menu', CategoriesMenu);
