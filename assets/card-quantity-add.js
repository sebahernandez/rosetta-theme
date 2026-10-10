if (!customElements.get('card-quantity-add')) {
  const MESSAGE_TIMEOUT = 4000;
  let cartRequest = null;

  // Shared by every card on the page so one cart change costs a single request
  const fetchCart = () => {
    if (!cartRequest) {
      cartRequest = fetch(`${routes.cart_url}.js`, { headers: { Accept: 'application/json' } })
        .then((response) => response.json())
        .finally(() => {
          cartRequest = null;
        });
    }
    return cartRequest;
  };

  customElements.define(
    'card-quantity-add',
    class CardQuantityAdd extends HTMLElement {
      constructor() {
        super();

        this.variantId = parseInt(this.dataset.variantId);
        this.max = this.dataset.max ? parseInt(this.dataset.max) : null;
        this.confirmedQuantity = parseInt(this.dataset.quantity) || 0;
        this.quantity = this.confirmedQuantity;
        this.pending = false;
        this.requestStarted = false;

        this.addButton = this.querySelector('.card-qty__add');
        this.minusButton = this.querySelector('.card-qty__button[name="minus"]');
        this.plusButton = this.querySelector('.card-qty__button[name="plus"]');
        this.value = this.querySelector('.card-qty__value');
        this.message = this.querySelector('.card-qty__message');

        this.debouncedSend = debounce(() => this.send(), ON_CHANGE_DEBOUNCE_TIMER);

        this.addButton.addEventListener('click', () => {
          this.change(1);
          this.plusButton.focus();
        });
        this.plusButton.addEventListener('click', () => this.change(this.quantity + 1));
        this.minusButton.addEventListener('click', () => {
          this.change(this.quantity - 1);
          if (this.quantity === 0) this.addButton.focus();
        });
      }

      cartUpdateUnsubscriber = undefined;

      connectedCallback() {
        this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
          if (this.pending) return;

          const isFullCart = event.source === 'card-quantity-add' || event.source === 'cart-items';
          if (isFullCart && event.cartData && Array.isArray(event.cartData.items)) {
            this.syncFromCart(event.cartData);
          } else {
            this.refresh();
          }
        });
      }

      disconnectedCallback() {
        if (this.cartUpdateUnsubscriber) {
          this.cartUpdateUnsubscriber();
        }
      }

      countInCart(cart) {
        return (cart.items || [])
          .filter((item) => item.variant_id === this.variantId)
          .reduce((total, item) => total + item.quantity, 0);
      }

      syncFromCart(cart) {
        if (this.pending) return;
        this.confirmedQuantity = this.countInCart(cart);
        this.render(this.confirmedQuantity);
      }

      refresh() {
        return fetchCart()
          .then((cart) => this.syncFromCart(cart))
          .catch((e) => console.error(e));
      }

      render(quantity) {
        const hadFocus = this.contains(document.activeElement);

        this.quantity = quantity;
        this.value.textContent = quantity;
        this.dataset.state = quantity > 0 ? 'stepper' : 'add';
        this.plusButton.disabled = this.max !== null && quantity >= this.max;

        // Focus would otherwise fall back to <body> when the focused control gets hidden or disabled
        const focusLost = !this.contains(document.activeElement) || document.activeElement.disabled;
        if (hadFocus && focusLost) {
          (quantity > 0 ? this.minusButton : this.addButton).focus();
        }
      }

      change(quantity) {
        if (quantity < 0 || (this.max !== null && quantity > this.max)) return;

        this.showMessage(false);
        this.pending = true;
        this.render(quantity);
        this.debouncedSend();
      }

      send() {
        if (this.requestStarted) {
          this.sendAgain = true;
          return;
        }

        const requestedQuantity = this.quantity;
        if (requestedQuantity === this.confirmedQuantity) {
          this.pending = false;
          return;
        }

        this.requestStarted = true;
        const cartDrawer = document.querySelector('cart-drawer');
        const sections = cartDrawer ? ['cart-drawer', 'cart-icon-bubble'] : ['cart-icon-bubble'];
        const body = JSON.stringify({
          updates: { [this.variantId]: requestedQuantity },
          sections,
          sections_url: window.location.pathname,
        });

        fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } })
          .then((response) => response.json())
          .then((state) => {
            if (state.status) {
              this.showMessage(state.description || state.message || window.cartStrings.error);
              return fetchCart().then((cart) => {
                this.confirmedQuantity = this.countInCart(cart);
                this.sendAgain = false;
                this.render(this.confirmedQuantity);
              });
            }

            this.confirmedQuantity = this.countInCart(state);
            this.renderSections(state, cartDrawer);
            publish(PUB_SUB_EVENTS.cartUpdate, { source: 'card-quantity-add', cartData: state });

            // The visitor kept tapping while the request was in flight: the next request settles it
            if (this.quantity !== requestedQuantity) {
              this.sendAgain = true;
              return;
            }

            if (this.confirmedQuantity < requestedQuantity) {
              this.showMessage(window.cartStrings.quantityError.replace('[quantity]', this.confirmedQuantity));
            }
            this.render(this.confirmedQuantity);
          })
          .catch((e) => {
            console.error(e);
            this.sendAgain = false;
            this.render(this.confirmedQuantity);
            this.showMessage(window.cartStrings.error);
          })
          .finally(() => {
            this.requestStarted = false;
            if (this.sendAgain) {
              this.sendAgain = false;
              this.send();
            } else {
              this.pending = false;
            }
          });
      }

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

  // Pages restored from the back/forward cache keep the quantities they had when the visitor left
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    document.querySelectorAll('card-quantity-add').forEach((element) => element.refresh());
  });
}
