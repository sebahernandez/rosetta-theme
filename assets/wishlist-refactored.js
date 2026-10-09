/**
 * Wishlist Management System - Refactored Version
 * Clase principal para manejar toda la funcionalidad del wishlist
 */
class WishlistManager {
  constructor(options = {}) {
    this.storageKey = options.storageKey || "wishlist";
    this.buttonSelector = options.buttonSelector || ".wishlist_button";
    this.containerSelector = options.containerSelector || ".js-wishlistBlock";
    this.debug = options.debug || false;

    // Event emitter personalizado
    this.eventTarget = new EventTarget();

    this.init();
  }

  /**
   * Inicialización del sistema
   */
  init() {
    this.cleanupInvalidProducts();
    this.initializeButtons();
    this.setupEventListeners();
    this.displayWishlist();
    this.updateFloatingCounter(); // Initialize floating counter

    if (this.debug) {
      console.log("🚀 WishlistManager initialized");
    }
  }

  /**
   * Gestión de datos del localStorage
   */
  getWishlistData() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch (error) {
      console.error("Error parsing wishlist data:", error);
      return [];
    }
  }

  saveWishlistData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error saving wishlist data:", error);
      return false;
    }
  }

  /**
   * Limpia productos inválidos del wishlist
   */
  cleanupInvalidProducts() {
    const wishlistData = this.getWishlistData();
    const filteredData = wishlistData.filter(
      (item) => item && item.productTitle && item.productTitle.trim() !== ""
    );

    if (filteredData.length !== wishlistData.length) {
      this.saveWishlistData(filteredData);
      if (this.debug) {
        console.log(
          `🧹 Cleaned ${
            wishlistData.length - filteredData.length
          } invalid products`
        );
      }
    }

    return filteredData;
  }

  /**
   * Verifica si un producto está en el wishlist
   */
  isInWishlist(productTitle) {
    const wishlistData = this.getWishlistData();
    return wishlistData.some((item) => item.productTitle === productTitle);
  }

  /**
   * Agrega un producto al wishlist
   */
  addToWishlist(productData) {
    if (!this.validateProductData(productData)) {
      return false;
    }

    const wishlistData = this.getWishlistData();

    // Verificar si ya existe
    if (this.isInWishlist(productData.productTitle)) {
      if (this.debug) {
        console.log("Product already in wishlist:", productData.productTitle);
      }
      return false;
    }

    // Agregar timestamp y datos adicionales
    const enrichedData = {
      ...productData,
      timestamp: Date.now(),
      id: this.generateProductId(productData),
    };

    wishlistData.push(enrichedData);

    if (this.saveWishlistData(wishlistData)) {
      this.emitEvent("productAdded", { product: enrichedData });
      this.updateButtonsForProduct(productData.productTitle, true);
      this.updateFloatingCounter(); // Update floating counter

      if (this.debug) {
        console.log("✅ Product added to wishlist:", productData.productTitle);
      }

      return true;
    }

    return false;
  }

  /**
   * Remueve un producto del wishlist
   */
  removeFromWishlist(productTitle) {
    const wishlistData = this.getWishlistData();
    const filteredData = wishlistData.filter(
      (item) => item.productTitle !== productTitle
    );

    if (filteredData.length === wishlistData.length) {
      if (this.debug) {
        console.log("Product not found in wishlist:", productTitle);
      }
      return false;
    }

    if (this.saveWishlistData(filteredData)) {
      this.emitEvent("productRemoved", { productTitle });
      this.updateButtonsForProduct(productTitle, false);
      this.updateFloatingCounter(); // Update floating counter

      if (this.debug) {
        console.log("❌ Product removed from wishlist:", productTitle);
      }

      return true;
    }

    return false;
  }

  /**
   * Toggle de producto en wishlist
   */
  toggleProduct(productData, event = null) {
    if (!this.validateProductData(productData)) {
      return false;
    }

    const isCurrentlyInWishlist = this.isInWishlist(productData.productTitle);
    const success = isCurrentlyInWishlist
      ? this.removeFromWishlist(productData.productTitle)
      : this.addToWishlist(productData);

    if (success) {
      this.displayWishlist();
      this.emitEvent("wishlistToggled", {
        product: productData,
        inWishlist: !isCurrentlyInWishlist,
        event,
      });
    }

    return success;
  }

  /**
   * Validación de datos del producto
   */
  validateProductData(productData) {
    if (!productData || typeof productData !== "object") {
      console.error("❌ Invalid product data");
      return false;
    }

    if (!productData.productTitle || productData.productTitle.trim() === "") {
      console.error("❌ Product title is required");
      return false;
    }

    return true;
  }

  /**
   * Genera un ID único para el producto
   */
  generateProductId(productData) {
    return productData.productUrl
      ? productData.productUrl.split("/").pop()
      : productData.productTitle.toLowerCase().replace(/\s+/g, "-");
  }

  /**
   * Búsqueda inteligente de botones
   */
  findButtonsForProduct(productTitle) {
    const buttons = new Set();

    // 1. Buscar por data-product-title
    document
      .querySelectorAll(
        `${this.buttonSelector}[data-product-title="${productTitle}"]`
      )
      .forEach((btn) => buttons.add(btn));

    // 2. Buscar por onclick que contenga el título
    document.querySelectorAll(this.buttonSelector).forEach((btn) => {
      const onclick = btn.getAttribute("onclick") || "";
      if (
        onclick.includes(`'${productTitle}'`) ||
        onclick.includes(`"${productTitle}"`)
      ) {
        buttons.add(btn);
      }
    });

    return Array.from(buttons);
  }

  /**
   * Actualiza los botones asociados a un producto
   */
  updateButtonsForProduct(productTitle, isInWishlist) {
    const buttons = this.findButtonsForProduct(productTitle);
    let updatedCount = 0;

    buttons.forEach((button) => {
      if (this.updateButtonState(button, isInWishlist, productTitle)) {
        updatedCount++;
      }
    });

    if (this.debug && updatedCount > 0) {
      console.log(`⚡ Updated ${updatedCount} buttons for "${productTitle}"`);
    }

    return updatedCount;
  }

  /**
   * Actualiza el estado visual de un botón
   */
  updateButtonState(button, isInWishlist, productTitle) {
    if (!button) return false;

    try {
      // Actualizar contenido
      button.innerHTML = isInWishlist
        ? '<i class="fa-solid fa-heart"></i>'
        : '<i class="fa-regular fa-heart"></i>';

      // Actualizar atributos
      button.setAttribute(
        "aria-label",
        isInWishlist ? "Quitar de favoritos" : "Agregar a favoritos"
      );

      button.classList.toggle("active", isInWishlist);

      // Asegurar atributos de datos
      button.setAttribute("data-product-title", productTitle);

      return true;
    } catch (error) {
      console.error("Error updating button state:", error);
      return false;
    }
  }

  /**
   * Inicializa todos los botones en la página
   */
  initializeButtons() {
    const buttons = document.querySelectorAll(this.buttonSelector);
    let initializedCount = 0;

    buttons.forEach((button) => {
      const productTitle = button.getAttribute("data-product-title");

      if (productTitle && productTitle.trim()) {
        const isInWishlist = this.isInWishlist(productTitle);
        if (this.updateButtonState(button, isInWishlist, productTitle)) {
          initializedCount++;
        }
      }
    });

    if (this.debug) {
      console.log(`✅ Initialized ${initializedCount} wishlist buttons`);
    }

    return initializedCount;
  }

  /**
   * Configura los event listeners
   */
  setupEventListeners() {
    // Listener global para eventos de wishlist
    document.addEventListener("wishlistUpdated", (e) => {
      if (e.detail && e.detail.productTitle) {
        this.updateButtonsForProduct(
          e.detail.productTitle,
          e.detail.inWishlist
        );
      }
    });

    // Cleanup al cargar la página
    document.addEventListener("DOMContentLoaded", () => {
      this.cleanupInvalidProducts();
      this.initializeButtons();
    });
  }

  /**
   * Sistema de eventos personalizado
   */
  emitEvent(eventName, detail) {
    try {
      const event = new CustomEvent(eventName, { detail });
      document.dispatchEvent(event);

      if (this.debug) {
        console.log(`🔔 Event emitted: ${eventName}`, detail);
      }
    } catch (error) {
      console.error(`Error emitting event ${eventName}:`, error);
    }
  }

  /**
   * Suscribirse a eventos
   */
  on(eventName, callback) {
    document.addEventListener(eventName, callback);
  }

  /**
   * Renderiza la lista de wishlist
   */
  async displayWishlist() {
    const container = document.querySelector(this.containerSelector);
    if (!container) return;

    const wishlistData = this.getWishlistData();

    if (wishlistData.length === 0) {
      container.innerHTML =
        '<p class="wishlist-empty">Tu lista de favoritos está vacía</p>';
      return;
    }

    try {
      const productCards = await this.fetchProductCards(wishlistData);
      const validCards = productCards.filter((card) => card.trim() !== "");

      if (validCards.length > 0) {
        container.innerHTML = `
          <div class="wishlist-products-grid">
            ${validCards.join("")}
          </div>
        `;

        // Reinicializar botones después de cargar las cards
        setTimeout(() => {
          this.initializeButtons();
        }, 100);
      } else {
        container.innerHTML =
          '<p class="wishlist-error">No se pudieron cargar los productos</p>';
      }
    } catch (error) {
      console.error("Error displaying wishlist:", error);
      container.innerHTML =
        '<p class="wishlist-error">Error al cargar la lista de favoritos</p>';
    }
  }

  /**
   * Obtiene las cards de productos desde el servidor
   */
  async fetchProductCards(wishlistData) {
    const productHandles = this.extractProductHandles(wishlistData);

    if (productHandles.length === 0) {
      return [];
    }

    const fetchPromises = productHandles.map((handle) =>
      this.fetchSingleProductCard(handle)
    );

    return Promise.all(fetchPromises);
  }

  /**
   * Extrae los handles de productos de los datos del wishlist
   */
  extractProductHandles(wishlistData) {
    return wishlistData
      .map((item) => {
        if (item.productUrl) {
          const urlParts = item.productUrl.split("/");
          const handleIndex = urlParts.indexOf("products");
          return handleIndex !== -1 && urlParts[handleIndex + 1]
            ? urlParts[handleIndex + 1]
            : null;
        }
        return null;
      })
      .filter((handle) => handle !== null);
  }

  /**
   * Obtiene una card individual de producto
   */
  async fetchSingleProductCard(handle) {
    try {
      const response = await fetch(
        `/products/${handle}?section_id=product-card`
      );
      const responseText = await response.text();

      const html = new DOMParser().parseFromString(responseText, "text/html");
      const productCard = html.querySelector(".shopify-section");

      return productCard ? productCard.innerHTML : "";
    } catch (error) {
      console.error(`Error fetching product ${handle}:`, error);
      return "";
    }
  }

  /**
   * Métodos utilitarios públicos
   */
  getWishlistCount() {
    return this.getWishlistData().length;
  }

  /**
   * Actualiza el contador flotante del botón de wishlist
   */
  updateFloatingCounter() {
    const counter = document.querySelector(".wishlist-floating-counter");
    const floatingButton = document.querySelector(".button-floating");

    if (this.debug) {
      console.log("🔍 Debugging floating counter...");
      console.log("Counter element found:", !!counter);
      console.log("Floating button found:", !!floatingButton);
      if (floatingButton) {
        const styles = window.getComputedStyle(floatingButton);
        console.log("Button visibility:", styles.visibility);
        console.log("Button display:", styles.display);
        console.log("Button z-index:", styles.zIndex);
        console.log("Button position:", styles.position);
      }
    }

    if (counter) {
      const count = this.getWishlistCount();
      counter.textContent = count;

      // Mostrar/ocultar el contador basado en si hay items
      if (count > 0) {
        counter.style.display = "flex";
        counter.classList.add("visible");
      } else {
        counter.style.display = "none";
        counter.classList.remove("visible");
      }

      if (this.debug) {
        console.log(`🔄 Floating counter updated: ${count} items`);
      }
    } else if (this.debug) {
      console.log("❌ Floating counter element not found");
    }
  }

  clearWishlist() {
    if (this.saveWishlistData([])) {
      this.emitEvent("wishlistCleared", {});
      this.initializeButtons();
      this.displayWishlist();
      this.updateFloatingCounter(); // Update floating counter
      return true;
    }
    return false;
  }

  exportWishlist() {
    return this.getWishlistData();
  }

  importWishlist(data) {
    if (Array.isArray(data)) {
      const validData = data.filter((item) => this.validateProductData(item));
      if (this.saveWishlistData(validData)) {
        this.initializeButtons();
        this.displayWishlist();
        this.emitEvent("wishlistImported", { count: validData.length });
        return true;
      }
    }
    return false;
  }
}

/**
 * Factory para crear instancias de productos
 */
class ProductDataFactory {
  static createFromPDP() {
    return {
      productTitle: "{{ product.title | escape }}",
      productImg: "{{ product.featured_image | img_url: '' }}",
      productPrice: "{{ product.price | money | remove_first: '' }}",
      productUrl: "{{ product.url }}",
    };
  }

  static createFromAttributes(
    title,
    img = "",
    price = "",
    url = "",
    id = null
  ) {
    return {
      productTitle: title,
      productImg: img,
      productPrice: price,
      productUrl: url,
      productId: id,
    };
  }

  static createFromElement(element) {
    return {
      productTitle: element.getAttribute("data-product-title") || "",
      productImg: element.getAttribute("data-product-img") || "",
      productPrice: element.getAttribute("data-product-price") || "",
      productUrl: element.getAttribute("data-product-url") || "",
      productId: element.getAttribute("data-product-id") || null,
    };
  }
}

/**
 * Funciones legacy para mantener compatibilidad
 */
let wishlistManager;

// Inicializar el manager cuando se carga el DOM
document.addEventListener("DOMContentLoaded", () => {
  wishlistManager = new WishlistManager({
    debug: true, // Habilitado para debugging del botón flotante
  });

  // Initialize floating counter on page load
  setTimeout(() => {
    if (wishlistManager) {
      wishlistManager.updateFloatingCounter();
    }
  }, 100); // Small delay to ensure DOM is fully loaded
});

// Funciones de compatibilidad hacia atrás
function toggleWishlist(event) {
  if (!wishlistManager) {
    console.error("WishlistManager not initialized");
    return false;
  }

  const productData = ProductDataFactory.createFromPDP();
  return wishlistManager.toggleProduct(productData, event);
}

function toggleOfferWishlist(
  productTitle,
  productImg,
  productPrice,
  productUrl,
  event
) {
  if (!wishlistManager) {
    console.error("WishlistManager not initialized");
    return false;
  }

  const productData = ProductDataFactory.createFromAttributes(
    productTitle,
    productImg,
    productPrice,
    productUrl
  );
  return wishlistManager.toggleProduct(productData, event);
}

function removeFromWishlist(productTitle) {
  if (!wishlistManager) {
    console.error("WishlistManager not initialized");
    return false;
  }

  return wishlistManager.removeFromWishlist(productTitle);
}

function displayWishlist() {
  if (!wishlistManager) {
    console.error("WishlistManager not initialized");
    return;
  }

  wishlistManager.displayWishlist();
}

function initProductWishlistState(productId, productTitle, options = {}) {
  if (!wishlistManager) {
    console.error("WishlistManager not initialized");
    return false;
  }

  const isInWishlist = wishlistManager.isInWishlist(productTitle);
  return (
    wishlistManager.updateButtonsForProduct(productTitle, isInWishlist) > 0
  );
}

// Exportar para uso en módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WishlistManager, ProductDataFactory };
}
