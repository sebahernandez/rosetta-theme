/**
 * Utilidades adicionales para el sistema de Wishlist
 */

/**
 * Configuración global del wishlist
 */
const WishlistConfig = {
  // Selectores CSS
  selectors: {
    button: ".wishlist_button",
    container: ".js-wishlistBlock",
    productCard: ".product-card",
    quickAdd: ".quick-add__submit",
  },

  // Clases CSS
  classes: {
    active: "active",
    loading: "loading",
    error: "error",
    empty: "wishlist-empty",
  },

  // Iconos Font Awesome
  icons: {
    filled: '<i class="fa-solid fa-heart"></i>',
    empty: '<i class="fa-regular fa-heart"></i>',
    loading: '<i class="fa-solid fa-spinner fa-spin"></i>',
  },

  // Textos
  labels: {
    add: "Agregar a favoritos",
    remove: "Quitar de favoritos",
    loading: "Cargando...",
  },

  // Configuración de almacenamiento
  storage: {
    key: "wishlist",
    maxItems: 100,
    expirationDays: 30,
  },

  // Configuración de eventos
  events: {
    debounceTime: 300,
    animationDuration: 200,
  },
};

/**
 * Validador de datos del wishlist
 */
class WishlistValidator {
  static validateProduct(product) {
    const errors = [];

    if (!product || typeof product !== "object") {
      errors.push("Product must be an object");
      return { isValid: false, errors };
    }

    if (!product.productTitle || typeof product.productTitle !== "string") {
      errors.push("Product title is required and must be a string");
    }

    if (product.productTitle && product.productTitle.trim().length === 0) {
      errors.push("Product title cannot be empty");
    }

    if (product.productTitle && product.productTitle.length > 200) {
      errors.push("Product title is too long (max 200 characters)");
    }

    if (product.productUrl && !this.isValidUrl(product.productUrl)) {
      errors.push("Product URL is not valid");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static isValidUrl(url) {
    try {
      new URL(url, window.location.origin);
      return true;
    } catch {
      return url.startsWith("/products/") && url.length > 10;
    }
  }

  static validateWishlistData(data) {
    if (!Array.isArray(data)) {
      return { isValid: false, errors: ["Wishlist data must be an array"] };
    }

    if (data.length > WishlistConfig.storage.maxItems) {
      return {
        isValid: false,
        errors: [`Too many items (max ${WishlistConfig.storage.maxItems})`],
      };
    }

    const errors = [];
    data.forEach((item, index) => {
      const validation = this.validateProduct(item);
      if (!validation.isValid) {
        errors.push(`Item ${index}: ${validation.errors.join(", ")}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Utilidades para animaciones y efectos visuales
 */
class WishlistAnimations {
  static fadeIn(element, duration = WishlistConfig.events.animationDuration) {
    return new Promise((resolve) => {
      element.style.opacity = "0";
      element.style.transition = `opacity ${duration}ms ease-in-out`;

      requestAnimationFrame(() => {
        element.style.opacity = "1";
        setTimeout(resolve, duration);
      });
    });
  }

  static fadeOut(element, duration = WishlistConfig.events.animationDuration) {
    return new Promise((resolve) => {
      element.style.transition = `opacity ${duration}ms ease-in-out`;
      element.style.opacity = "0";
      setTimeout(resolve, duration);
    });
  }

  static heartBeat(button) {
    button.style.transform = "scale(1.2)";
    button.style.transition = "transform 0.1s ease-in-out";

    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 100);
  }

  static pulse(element, color = "#ff6b6b") {
    const originalColor = element.style.color;
    element.style.color = color;
    element.style.transition = "color 0.2s ease-in-out";

    setTimeout(() => {
      element.style.color = originalColor;
    }, 200);
  }
}

/**
 * Sistema de notificaciones para el wishlist
 */
class WishlistNotifications {
  constructor(options = {}) {
    this.container = options.container || document.body;
    this.position = options.position || "top-right";
    this.duration = options.duration || 3000;
  }

  show(message, type = "info") {
    const notification = this.createNotification(message, type);
    this.container.appendChild(notification);

    // Animar entrada
    WishlistAnimations.fadeIn(notification);

    // Auto-remove
    setTimeout(() => {
      this.remove(notification);
    }, this.duration);

    return notification;
  }

  createNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `wishlist-notification wishlist-notification--${type}`;
    notification.style.cssText = `
      position: fixed;
      ${this.position.includes("top") ? "top: 20px" : "bottom: 20px"};
      ${this.position.includes("right") ? "right: 20px" : "left: 20px"};
      background: ${this.getBackgroundColor(type)};
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-size: 14px;
      max-width: 300px;
    `;

    notification.innerHTML = `
      <div class="wishlist-notification__content">
        ${this.getIcon(type)}
        <span>${message}</span>
      </div>
    `;

    return notification;
  }

  getBackgroundColor(type) {
    const colors = {
      success: "#4caf50",
      error: "#f44336",
      warning: "#ff9800",
      info: "#2196f3",
    };
    return colors[type] || colors.info;
  }

  getIcon(type) {
    const icons = {
      success: "✅",
      error: "❌",
      warning: "⚠️",
      info: "ℹ️",
    };
    return icons[type] || icons.info;
  }

  async remove(notification) {
    await WishlistAnimations.fadeOut(notification);
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }
}

/**
 * Utilidades para debugging y desarrollo
 */
class WishlistDebugger {
  constructor(enabled = false) {
    this.enabled = enabled;
    this.logs = [];
  }

  log(message, data = null) {
    if (!this.enabled) return;

    const logEntry = {
      timestamp: new Date().toISOString(),
      message,
      data,
    };

    this.logs.push(logEntry);
    console.log(`[Wishlist Debug] ${message}`, data || "");
  }

  error(message, error = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type: "error",
      message,
      error,
    };

    this.logs.push(logEntry);
    console.error(`[Wishlist Error] ${message}`, error || "");
  }

  exportLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }

  analyzePerformance() {
    const errorCount = this.logs.filter((log) => log.type === "error").length;
    const totalLogs = this.logs.length;

    return {
      totalLogs,
      errorCount,
      errorRate: totalLogs > 0 ? (errorCount / totalLogs) * 100 : 0,
      timespan:
        this.logs.length > 0
          ? {
              start: this.logs[0].timestamp,
              end: this.logs[this.logs.length - 1].timestamp,
            }
          : null,
    };
  }
}

/**
 * Utilidades de migración para datos legacy
 */
class WishlistMigration {
  static migrateFromLegacy() {
    const legacyData = localStorage.getItem("wishlist");
    if (!legacyData) return null;

    try {
      const data = JSON.parse(legacyData);
      const migratedData = data.map((item) => ({
        ...item,
        id: item.productUrl
          ? item.productUrl.split("/").pop()
          : item.productTitle.toLowerCase().replace(/\s+/g, "-"),
        timestamp: item.timestamp || Date.now(),
        version: "2.0",
      }));

      return migratedData;
    } catch (error) {
      console.error("Error migrating legacy wishlist data:", error);
      return null;
    }
  }

  static backupData() {
    const data = localStorage.getItem("wishlist");
    if (data) {
      const backup = {
        data: JSON.parse(data),
        timestamp: Date.now(),
        version: "2.0",
      };

      localStorage.setItem("wishlist_backup", JSON.stringify(backup));
      return backup;
    }
    return null;
  }

  static restoreFromBackup() {
    const backup = localStorage.getItem("wishlist_backup");
    if (backup) {
      try {
        const backupData = JSON.parse(backup);
        localStorage.setItem("wishlist", JSON.stringify(backupData.data));
        return true;
      } catch (error) {
        console.error("Error restoring from backup:", error);
        return false;
      }
    }
    return false;
  }
}

/**
 * Sistema de caché para mejorar rendimiento
 */
class WishlistCache {
  constructor(maxAge = 5 * 60 * 1000) {
    // 5 minutos por defecto
    this.cache = new Map();
    this.maxAge = maxAge;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }

  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.maxAge) {
        this.cache.delete(key);
      }
    }
  }
}

// Exportar utilidades
if (typeof window !== "undefined") {
  window.WishlistConfig = WishlistConfig;
  window.WishlistValidator = WishlistValidator;
  window.WishlistAnimations = WishlistAnimations;
  window.WishlistNotifications = WishlistNotifications;
  window.WishlistDebugger = WishlistDebugger;
  window.WishlistMigration = WishlistMigration;
  window.WishlistCache = WishlistCache;
}

// Para uso en módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    WishlistConfig,
    WishlistValidator,
    WishlistAnimations,
    WishlistNotifications,
    WishlistDebugger,
    WishlistMigration,
    WishlistCache,
  };
}
