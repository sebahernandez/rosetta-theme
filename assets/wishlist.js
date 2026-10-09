// Wishlist feature: Add or remove the current product from the wishlist
function toggleWishlist(event) {
  // Si no se proporcionó evento, usamos el evento global
  if (!event || !event.currentTarget) {
    event = window.event;
  }

  // Verificar si hay un producto válido antes de continuar
  const productTitle = "{{ product.title | escape }}";

  if (!productTitle || productTitle.trim() === "") {
    console.error(
      "❌ No hay un producto válido en esta página. No se puede añadir al wishlist."
    );
    return; // Salir de la función si no hay producto
  }

  const pdpData = {
    productTitle: productTitle,
    productImg: "{{ product.featured_image | img_url: '' }}",
    productPrice: "{{ product.price | money | remove_first: '' }}",
    productUrl: "{{ product.url }}",
  };

  let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
  const isAlreadyInWishlist = wishlistData.some(
    (item) => item.productTitle === pdpData.productTitle
  );

  // Mejoramos la forma de obtener el botón - ahora usa el evento para ser más preciso
  let wishlistButton;
  if (event && (event.currentTarget || event.target)) {
    wishlistButton =
      event.currentTarget || event.target.closest(".wishlist_button");
  } else {
    wishlistButton = document.querySelector(".wishlist_button");
  }

  console.log("Button from event:", wishlistButton ? true : false);

  console.log("🔍 DEBUG toggleWishlist:");
  console.log("Product Title:", pdpData.productTitle);
  console.log("Current wishlist:", wishlistData);
  console.log("Is already in wishlist:", isAlreadyInWishlist);

  if (!isAlreadyInWishlist) {
    wishlistData.push(pdpData);
    localStorage.setItem("wishlist", JSON.stringify(wishlistData));
    console.log("✅ Added to wishlist");
    // Update button - SOLO íconos Font Awesome
    wishlistButton.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    wishlistButton.setAttribute("aria-label", "Quitar de favoritos");
  } else {
    const originalLength = wishlistData.length;
    const titleToRemove = pdpData.productTitle;
    console.log("🎯 Target product to remove:", titleToRemove);

    // Verificar cada elemento antes de filtrar
    wishlistData.forEach((item, index) => {
      console.log(
        `Item ${index}: "${
          item.productTitle
        }" - Match with "${titleToRemove}": ${
          item.productTitle === titleToRemove
        }`
      );
    });

    // Filtrar correctamente
    wishlistData = wishlistData.filter(
      (item) => item.productTitle !== titleToRemove
    );
    const newLength = wishlistData.length;

    console.log("❌ Removing from wishlist");
    console.log("Original length:", originalLength);
    console.log("New length:", newLength);
    console.log("Filtered wishlist:", wishlistData);

    localStorage.setItem("wishlist", JSON.stringify(wishlistData));
    console.log("📱 localStorage updated");

    // Update button - SOLO íconos Font Awesome
    wishlistButton.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    wishlistButton.setAttribute("aria-label", "Agregar a favoritos");
  }

  // Update the display after modifying the wishlist
  displayWishlist();
}

// Toggle wishlist for offer products - FUNCIÓN UNIFICADA Y MEJORADA
function toggleOfferWishlist(
  productTitle,
  productImg,
  productPrice,
  productUrl,
  e
) {
  // Capturar el evento explícitamente
  const evt = e || window.event;

  // Verificar que el título del producto no esté vacío
  if (!productTitle || productTitle.trim() === "") {
    console.error("❌ No se proporcionó un título de producto válido");
    return false; // Salir de la función
  }

  // Crear objeto de datos del producto con valores por defecto seguros
  const pdpData = {
    productTitle: productTitle,
    productImg: productImg || "",
    productPrice: productPrice || "",
    productUrl: productUrl || "",
    productId: evt?.currentTarget?.getAttribute("data-product-id") || null,
    productHandle: productUrl ? productUrl.split("/").pop() : null,
    timestamp: Date.now(), // Para futuras funcionalidades
  };

  let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Verificar si hay productos sin título y limpiarlos
  const initialLength = wishlistData.length;
  wishlistData = wishlistData.filter(
    (item) => item && item.productTitle && item.productTitle.trim() !== ""
  );

  if (initialLength !== wishlistData.length) {
    console.log("🧹 Se eliminaron productos inválidos del wishlist");
  }

  // Revisar exactitud comparando con igualdad estricta
  const isAlreadyInWishlist = wishlistData.some((item) => {
    return item.productTitle === pdpData.productTitle;
  });

  // MEJORA: Algoritmo más robusto para encontrar el botón
  let wishlistButton;

  // 1. Por evento - caso más común
  if (evt && evt.currentTarget) {
    wishlistButton = evt.currentTarget;
  } else if (evt && evt.target) {
    wishlistButton = evt.target.closest(".custom-btn-icon.wishlist_button");
  }

  // 2. Por atributos data - si no se encontró por evento
  if (!wishlistButton) {
    // Buscar por data-product-id
    const productId = evt?.currentTarget?.getAttribute("data-product-id");

    if (productId) {
      const productCard = document.querySelector(
        `[data-product-id="${productId}"]`
      );
      wishlistButton = productCard
        ? productCard.querySelector(".wishlist_button")
        : null;
    }

    // Si aún no se encontró, buscar por título exacto
    if (!wishlistButton) {
      wishlistButton = document.querySelector(
        `.wishlist_button[data-product-title="${productTitle}"]`
      );

      // Última opción: buscar en todos los botones
      if (!wishlistButton) {
        const allButtons = document.querySelectorAll(".wishlist_button");
        for (const btn of allButtons) {
          const onclickAttr = btn.getAttribute("onclick") || "";
          const btnTitle = btn.getAttribute("data-product-title");

          if (onclickAttr.includes(productTitle) || btnTitle === productTitle) {
            wishlistButton = btn;
            break;
          }
        }
      }
    }
  }

  console.log("🔍 DEBUG toggleOfferWishlist:");
  console.log("Product Title:", pdpData.productTitle);
  console.log("Is already in wishlist:", isAlreadyInWishlist);
  console.log("Button found:", wishlistButton ? true : false);

  // MEJORA: Crear función para actualizar todos los botones asociados al mismo producto
  function updateAllButtonsForProduct(title, isInWishlist) {
    // Buscar todos los botones que podrían corresponder a este producto
    const allPossibleButtons = document.querySelectorAll(".wishlist_button");
    let updatedButtons = 0;

    allPossibleButtons.forEach((btn) => {
      const btnTitle = btn.getAttribute("data-product-title");
      const onclickAttr = btn.getAttribute("onclick") || "";

      // Si el botón corresponde a este producto, actualizarlo
      if (btnTitle === title || onclickAttr.includes(`'${title}'`)) {
        if (isInWishlist) {
          btn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
          btn.setAttribute("aria-label", "Quitar de favoritos");
          btn.classList.add("active");
        } else {
          btn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
          btn.setAttribute("aria-label", "Agregar a favoritos");
          btn.classList.remove("active");
        }
        updatedButtons++;
      }
    });

    console.log(`⚡ Actualizado ${updatedButtons} botones para "${title}"`);
    return updatedButtons;
  }

  if (!isAlreadyInWishlist) {
    // Add to wishlist
    wishlistData.push(pdpData);
    localStorage.setItem("wishlist", JSON.stringify(wishlistData));
    console.log("✅ Added to wishlist");

    // Actualizar todos los botones para este producto
    updateAllButtonsForProduct(productTitle, true);

    // Si tenemos una referencia directa al botón clicado, asegurarnos de actualizarlo
    if (wishlistButton) {
      wishlistButton.innerHTML = `<i class="fa-solid fa-heart"></i>`;
      wishlistButton.setAttribute("aria-label", "Quitar de favoritos");
      wishlistButton.classList.add("active");
    }
  } else {
    // Remove from wishlist
    const originalLength = wishlistData.length;
    const titleToRemove = pdpData.productTitle;

    // Filtrar el wishlist
    wishlistData = wishlistData.filter(
      (item) => item.productTitle !== titleToRemove
    );
    const newLength = wishlistData.length;

    console.log("❌ Removing from wishlist");
    console.log(`Removed ${originalLength - newLength} items`);

    // Guardar el wishlist actualizado
    localStorage.setItem("wishlist", JSON.stringify(wishlistData));

    // Actualizar todos los botones para este producto
    updateAllButtonsForProduct(productTitle, false);

    // Si tenemos una referencia directa al botón clicado, asegurarnos de actualizarlo
    if (wishlistButton) {
      wishlistButton.innerHTML = `<i class="fa-regular fa-heart"></i>`;
      wishlistButton.setAttribute("aria-label", "Agregar a favoritos");
      wishlistButton.classList.remove("active");
    }
  }

  // Actualizar la visualización
  if (typeof displayWishlist === "function") {
    displayWishlist();
    console.log("📋 Wishlist display updated");
  }

  // MEJORA: Disparar evento personalizado para otros listeners
  try {
    const wishlistEvent = new CustomEvent("wishlistUpdated", {
      detail: {
        productTitle: productTitle,
        inWishlist: !isAlreadyInWishlist,
      },
    });
    document.dispatchEvent(wishlistEvent);
    console.log("🔔 Evento wishlistUpdated disparado");
  } catch (e) {
    console.error("Error al disparar evento:", e);
  }

  // Prevenir comportamiento por defecto
  return false;
}

// Función mejorada para inicializar el estado de wishlist de cualquier producto
function initProductWishlistState(productId, productTitle, options = {}) {
  // Validar que tengamos datos básicos necesarios
  if (!productTitle || productTitle.trim() === "") {
    console.error("❌ No se puede inicializar un producto sin título");
    return false;
  }

  // Configuración por defecto
  const config = {
    forceUpdate: options.forceUpdate || false,
    updateAllMatching: options.updateAllMatching || true,
    debug: options.debug || false,
  };

  // Obtener datos actuales de wishlist
  let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Limpiar wishlist de productos inválidos
  const initialLength = wishlistData.length;
  wishlistData = wishlistData.filter(
    (item) => item && item.productTitle && item.productTitle.trim() !== ""
  );

  if (initialLength !== wishlistData.length) {
    console.log(
      "🧹 Se eliminaron productos inválidos del wishlist durante inicialización"
    );
    localStorage.setItem("wishlist", JSON.stringify(wishlistData));
  }

  // Determinar si el producto está en el wishlist
  const isInWishlist = wishlistData.some((item) => {
    return item.productTitle === productTitle;
  });

  if (config.debug) {
    console.log("🔄 initProductWishlistState para:", productTitle);
    console.log("ID del producto:", productId);
    console.log("Está en wishlist:", isInWishlist);
    console.log("Wishlist actual:", wishlistData);
  }

  // Función para actualizar un botón específico
  function updateButtonState(button) {
    if (!button) return false;

    if (isInWishlist) {
      button.innerHTML = `<i class="fa-solid fa-heart"></i>`;
      button.setAttribute("aria-label", "Quitar de favoritos");
      button.classList.add("active");
    } else {
      button.innerHTML = `<i class="fa-regular fa-heart"></i>`;
      button.setAttribute("aria-label", "Agregar a favoritos");
      button.classList.remove("active");
    }

    // Asegurar que tenga los atributos correctos
    button.setAttribute("data-product-title", productTitle);
    if (productId) {
      button.setAttribute("data-product-id", productId);
    }

    return true;
  }

  // ESTRATEGIA MEJORADA PARA ENCONTRAR BOTONES

  // Colección de botones encontrados
  let foundButtons = [];

  // 1. Buscar por data-product-id dentro de cards
  if (productId) {
    const productCards = document.querySelectorAll(
      `[data-product-id="${productId}"]`
    );
    productCards.forEach((card) => {
      const button = card.querySelector(".wishlist_button");
      if (button) foundButtons.push(button);
    });
  }

  // 2. Buscar por data-product-title
  const titleButtons = document.querySelectorAll(
    `.wishlist_button[data-product-title="${productTitle}"]`
  );
  titleButtons.forEach((button) => {
    if (!foundButtons.includes(button)) foundButtons.push(button);
  });

  // 3. Buscar por coincidencia en onclick
  if (config.updateAllMatching) {
    const allButtons = document.querySelectorAll(".wishlist_button");
    allButtons.forEach((btn) => {
      const onclickAttr = btn.getAttribute("onclick") || "";
      if (
        onclickAttr.includes(`'${productTitle}'`) &&
        !foundButtons.includes(btn)
      ) {
        foundButtons.push(btn);
      }
    });
  }

  console.log(
    `🔍 Encontrados ${foundButtons.length} botones para "${productTitle}"`
  );

  // Actualizar todos los botones encontrados
  let updatedCount = 0;
  foundButtons.forEach((button) => {
    const updated = updateButtonState(button);
    if (updated) updatedCount++;
  });

  if (updatedCount > 0) {
    console.log(
      `✅ Actualizados ${updatedCount} botones para "${productTitle}"`
    );
    return true;
  } else {
    console.warn(
      `⚠️ No se pudo actualizar ningún botón para "${productTitle}"`
    );
    return false;
  }
}

// Remove the specified product from the wishlist
function removeFromWishlist(productTitle) {
  let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
  const originalLength = wishlistData.length;

  wishlistData = wishlistData.filter(
    (item) => item.productTitle !== productTitle
  );
  const newLength = wishlistData.length;

  console.log("❌ Removing product via removeFromWishlist:", productTitle);
  console.log("Original length:", originalLength);
  console.log("New length:", newLength);

  localStorage.setItem("wishlist", JSON.stringify(wishlistData));

  // Update the display after removing from the wishlist
  displayWishlist();
}

// Mejorar la función removeFromWishlist para trabajar con cards renderizadas
function removeFromWishlistEnhanced(productTitle, productHandle = null) {
  let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
  const originalLength = wishlistData.length;

  // Filtrar por título (método principal) o por handle si está disponible
  wishlistData = wishlistData.filter((item) => {
    if (productHandle && item.productUrl) {
      return !item.productUrl.includes(`/products/${productHandle}`);
    }
    return item.productTitle !== productTitle;
  });

  const newLength = wishlistData.length;

  console.log(
    "❌ Removing product via removeFromWishlistEnhanced:",
    productTitle
  );
  console.log("Original length:", originalLength);
  console.log("New length:", newLength);

  localStorage.setItem("wishlist", JSON.stringify(wishlistData));

  // Actualizar todos los botones relacionados
  const relatedButtons = document.querySelectorAll(
    `.wishlist_button[data-product-title="${productTitle}"]`
  );
  relatedButtons.forEach((button) => {
    button.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    button.setAttribute("aria-label", "Agregar a favoritos");
    button.classList.remove("active");
  });

  // Actualizar la visualización del wishlist
  displayWishlist();

  // Disparar evento personalizado
  try {
    const wishlistEvent = new CustomEvent("wishlistUpdated", {
      detail: {
        productTitle: productTitle,
        inWishlist: false,
        removedFromCard: true,
      },
    });
    document.dispatchEvent(wishlistEvent);
  } catch (e) {
    console.error("Error al disparar evento:", e);
  }
}

// Display wishlist items using card-product.liquid component
function displayWishlist() {
  // Obtener datos y filtrar productos inválidos
  let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
  const filteredWishlist = wishlistData.filter(
    (item) => item && item.productTitle && item.productTitle.trim() !== ""
  );

  // Si hay productos inválidos, actualizamos el localStorage
  if (filteredWishlist.length !== wishlistData.length) {
    console.log(
      "🧹 Limpiando wishlist de productos vacíos durante displayWishlist"
    );
    console.log("Antes:", wishlistData.length, "elementos");
    console.log("Después:", filteredWishlist.length, "elementos");
    localStorage.setItem("wishlist", JSON.stringify(filteredWishlist));
    wishlistData = filteredWishlist;
  }

  console.log("📋 Displaying wishlist with", wishlistData.length, "items");

  const wishlistBlock = document.querySelector(".js-wishlistBlock");

  if (wishlistData.length === 0) {
    if (wishlistBlock) {
      wishlistBlock.innerHTML =
        '<p class="wishlist-empty">Tu lista de favoritos está vacía</p>';
    }
    console.log("Wishlist is empty");
    return;
  }

  // En lugar de construir HTML, vamos a usar el render del servidor
  // Extraer las URLs de productos para obtener handles
  const productHandles = wishlistData
    .map((item) => {
      if (item.productUrl) {
        // Extraer handle de la URL (/products/handle-del-producto)
        const urlParts = item.productUrl.split("/");
        const handleIndex = urlParts.indexOf("products");
        if (handleIndex !== -1 && urlParts[handleIndex + 1]) {
          return urlParts[handleIndex + 1];
        }
      }
      return null;
    })
    .filter((handle) => handle !== null);

  if (productHandles.length === 0) {
    if (wishlistBlock) {
      wishlistBlock.innerHTML =
        '<p class="wishlist-error">Error al cargar productos del wishlist</p>';
    }
    return;
  }

  // Hacer fetch para obtener los productos renderizados usando la sección product-card
  const fetchPromises = productHandles.map((handle) =>
    fetch(`/products/${handle}?section_id=product-card`)
      .then((response) => response.text())
      .then((responseText) => {
        // Extraer solo el contenido de la sección product-card
        const html = new DOMParser().parseFromString(responseText, "text/html");
        const productCard = html.querySelector(".shopify-section");
        return productCard ? productCard.innerHTML : "";
      })
      .catch((error) => {
        console.error(`Error fetching product ${handle}:`, error);
        return "";
      })
  );

  Promise.all(fetchPromises)
    .then((productCards) => {
      const validCards = productCards.filter((card) => card.trim() !== "");

      if (validCards.length > 0) {
        const wishlistHtml = `
                        <div class="wishlist-products-grid">
                            ${validCards.join("")}
                        </div>
                    `;

        if (wishlistBlock) {
          wishlistBlock.innerHTML = wishlistHtml;

          // Reinicializar botones de wishlist después de cargar las cards
          setTimeout(() => {
            initializeWishlistButtonsInCards();
          }, 100);
        }
      } else {
        if (wishlistBlock) {
          wishlistBlock.innerHTML =
            '<p class="wishlist-error">No se pudieron cargar los productos</p>';
        }
      }
    })
    .catch((error) => {
      console.error("Error loading wishlist products:", error);
      if (wishlistBlock) {
        wishlistBlock.innerHTML =
          '<p class="wishlist-error">Error al cargar la lista de favoritos</p>';
      }
    });
}

// Execute this function on DOM content load
document.addEventListener("DOMContentLoaded", function () {
  // Limpiar cualquier entrada vacía del wishlist
  const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Filtrar cualquier producto con título vacío (esto soluciona el problema de productos vacíos)
  const filteredWishlist = wishlistData.filter(
    (item) => item && item.productTitle && item.productTitle.trim() !== ""
  );

  // Si eliminamos algún producto vacío, actualizamos el localStorage
  if (filteredWishlist.length !== wishlistData.length) {
    console.log("🧹 Limpiando productos vacíos del wishlist");
    console.log("Antes:", wishlistData.length, "elementos");
    console.log("Después:", filteredWishlist.length, "elementos");
    localStorage.setItem("wishlist", JSON.stringify(filteredWishlist));
  }

  // Set the initial button text based on whether the product is in the wishlist or not
  const wishlistButton = document.querySelector(".wishlist_button"); // Use querySelector instead of getElementsByClassName
  const productTitle = "{{ product.title }}";

  // Solo inicializar el botón si estamos en una página de producto válida
  if (wishlistButton && productTitle && productTitle.trim() !== "") {
    const isAlreadyInWishlist = filteredWishlist.some(
      (item) => item.productTitle === productTitle
    );
    wishlistButton.innerHTML = isAlreadyInWishlist
      ? `<i class="fa-solid fa-heart"></i>`
      : `<i class="fa-regular fa-heart"></i>`;
    wishlistButton.setAttribute(
      "aria-label",
      isAlreadyInWishlist ? "Quitar de favoritos" : "Agregar a favoritos"
    );
    wishlistButton.classList.toggle("active", isAlreadyInWishlist);
    console.log("✅ Botón de wishlist inicializado para:", productTitle);
  } else if (wishlistButton) {
    console.warn(
      "⚠️ Hay un botón de wishlist pero no hay un producto válido en la página"
    );
  }

  // Display wishlist items in pages that show the wishlist
  displayWishlist();

  // Inicializar quick add para wishlist
  initializeWishlistQuickAdd();

  // Inicializar todos los botones de wishlist en la página
  // Esta función se asegura de que todos los botones de wishlist en la página
  // estén correctamente inicializados independientemente de su ubicación
  function initializeAllWishlistButtons() {
    // Encontrar todos los botones de wishlist
    const wishlistButtons = document.querySelectorAll(".wishlist_button");
    console.log(
      `🔍 Encontrados ${wishlistButtons.length} botones de wishlist en total`
    );

    // Para cada botón, obtener su título y ID y actualizar su estado
    let updatedCount = 0;
    let missingDataCount = 0;

    wishlistButtons.forEach((button) => {
      // Intentar obtener el título y ID del producto
      const btnProductTitle = button.getAttribute("data-product-title");
      const btnProductId = button.getAttribute("data-product-id");

      // Solo procesar si tenemos al menos el título
      if (btnProductTitle && btnProductTitle.trim() !== "") {
        // Ver si este producto está en el wishlist
        const isInWishlist = filteredWishlist.some(
          (item) => item.productTitle === btnProductTitle
        );

        // Actualizar el botón según corresponda
        button.innerHTML = isInWishlist
          ? `<i class="fa-solid fa-heart"></i>`
          : `<i class="fa-regular fa-heart"></i>`;
        button.setAttribute(
          "aria-label",
          isInWishlist ? "Quitar de favoritos" : "Agregar a favoritos"
        );
        button.classList.toggle("active", isInWishlist);

        updatedCount++;
      } else {
        missingDataCount++;
      }
    });

    console.log(`✅ Inicializados ${updatedCount} botones de wishlist`);
    if (missingDataCount > 0) {
      console.warn(
        `⚠️ ${missingDataCount} botones sin datos suficientes para inicializar`
      );
    }
  }

  // Ejecutar la inicialización después de un breve retraso para asegurar que todos los elementos estén cargados
  setTimeout(initializeAllWishlistButtons, 300);
});

// Listener global para eventos personalizados de wishlist
document.addEventListener("wishlistUpdated", function (e) {
  if (e && e.detail) {
    const { productTitle, inWishlist } = e.detail;
    console.log(
      `📢 Evento wishlistUpdated: "${productTitle}" - ${
        inWishlist ? "Agregado" : "Removido"
      }`
    );

    // Actualizar todos los botones relacionados con este producto
    const relatedButtons = document.querySelectorAll(
      `.wishlist_button[data-product-title="${productTitle}"]`
    );

    relatedButtons.forEach((button) => {
      button.innerHTML = inWishlist
        ? `<i class="fa-solid fa-heart"></i>`
        : `<i class="fa-regular fa-heart"></i>`;
      button.setAttribute(
        "aria-label",
        inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"
      );
      button.classList.toggle("active", inWishlist);
    });

    if (relatedButtons.length > 0) {
      console.log(
        `↻ Actualizados ${relatedButtons.length} botones adicionales desde evento`
      );
    }
  }
});

// Función para inicializar botones de wishlist en cards cargadas dinámicamente
function initializeWishlistButtonsInCards() {
  console.log("🔄 Inicializando botones de wishlist en cards dinámicas");

  // Obtener wishlist actual
  const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Buscar todos los botones de wishlist que no estén ya inicializados
  const uninitializedButtons = document.querySelectorAll(
    ".wishlist_button:not([data-initialized])"
  );
  let initializedCount = 0;

  uninitializedButtons.forEach((button) => {
    const productTitle = button.getAttribute("data-product-title");
    const productId = button.getAttribute("data-product-id");

    if (productTitle && productTitle.trim() !== "") {
      // Verificar si está en wishlist
      const isInWishlist = wishlistData.some(
        (item) => item.productTitle === productTitle
      );

      // Configurar el botón
      button.innerHTML = isInWishlist
        ? `<i class="fa-solid fa-heart"></i>`
        : `<i class="fa-regular fa-heart"></i>`;
      button.setAttribute(
        "aria-label",
        isInWishlist ? "Quitar de favoritos" : "Agregar a favoritos"
      );
      button.classList.toggle("active", isInWishlist);

      // Marcar como inicializado
      button.setAttribute("data-initialized", "true");
      initializedCount++;
    }
  });

  console.log(
    `✅ Inicializados ${initializedCount} botones de wishlist en cards dinámicas`
  );
  return initializedCount;
}

// Función para inicializar eventos de quick add en el wishlist
function initializeWishlistQuickAdd() {
  console.log("🔄 Inicializando quick add para wishlist");

  // Buscar todos los botones de quick add en el wishlist
  const quickAddButtons = document.querySelectorAll(
    ".wishlist-products-grid .quick-add__submit"
  );

  quickAddButtons.forEach((button) => {
    // Evitar múltiples listeners
    if (!button.hasAttribute("data-wishlist-quick-add-initialized")) {
      button.addEventListener("click", function (e) {
        console.log("🛒 Quick add clicked from wishlist");

        // Permitir que el quick add funcione normalmente
        // pero agregar log para debugging
        const productCard =
          this.closest(".card-wrapper") || this.closest(".card");
        if (productCard) {
          const productTitle = productCard
            .querySelector("[data-product-title]")
            ?.getAttribute("data-product-title");
          console.log("🛒 Adding to cart from wishlist:", productTitle);
        }
      });

      button.setAttribute("data-wishlist-quick-add-initialized", "true");
    }
  });

  console.log(
    `✅ Quick add inicializado para ${quickAddButtons.length} productos en wishlist`
  );
}
