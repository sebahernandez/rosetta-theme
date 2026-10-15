if (!customElements.get('seleccionado-add')) {
  const MESSAGE_TIMEOUT = 4000;

  customElements.define(
    'seleccionado-add',
    class SeleccionadoAdd extends HTMLElement {
      constructor() {
        super();

        this.variantId = parseInt(this.dataset.variantId);
        this.button = this.querySelector('button');
        this.message = this.querySelector('.seleccionado__message');
        this.pending = false;

        this.button.addEventListener('click', () => this.add());
      }

      add() {
        if (this.pending || this.button.disabled) return;

        this.pending = true;
        this.button.setAttribute('aria-disabled', 'true');
        this.classList.add('is-loading');
        this.showMessage(false);

        const cartDrawer = document.querySelector('cart-drawer');
        const sections = cartDrawer ? ['cart-drawer', 'cart-icon-bubble'] : ['cart-icon-bubble'];
        const body = JSON.stringify({
          items: [{ id: this.variantId, quantity: 1 }],
          sections,
          sections_url: window.location.pathname,
        });

        fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), ...{ body } })
          .then((response) => response.json())
          .then((state) => {
            if (state.status) {
              this.showMessage(state.description || state.message || window.cartStrings.error);
              return;
            }

            this.renderSections(state, cartDrawer);
            publish(PUB_SUB_EVENTS.cartUpdate, {
              source: 'seleccionado-add',
              productVariantId: this.variantId,
              cartData: state,
            });
          })
          .catch((e) => {
            console.error(e);
            this.showMessage(window.cartStrings.error);
          })
          .finally(() => {
            this.pending = false;
            this.button.removeAttribute('aria-disabled');
            this.classList.remove('is-loading');
          });
      }

      // The drawer is refreshed but never opened: only the header cart icon opens it
      renderSections(state, cartDrawer) {
        if (!state.sections) return;

        if (cartDrawer) {
          cartDrawer.renderContents(state);
          return;
        }

        const cartIconBubble = document.getElementById('cart-icon-bubble');
        const html = state.sections['cart-icon-bubble'];
        if (!cartIconBubble || !html) return;
        cartIconBubble.innerHTML = new DOMParser()
          .parseFromString(html, 'text/html')
          .querySelector('.shopify-section').innerHTML;
      }

      showMessage(text) {
        clearTimeout(this.messageTimer);
        this.message.toggleAttribute('hidden', !text);
        this.message.textContent = text ? new DOMParser().parseFromString(text, 'text/html').body.textContent : '';
        if (text) this.messageTimer = setTimeout(() => this.showMessage(false), MESSAGE_TIMEOUT);
      }
    }
  );
}
