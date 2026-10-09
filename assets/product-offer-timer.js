/**
 * Simple Product Offer Timer
 * Timer de cuenta regresiva para ofertas de productos
 */

// Estado del timer
let timer = {
  interval: null,
  endTime: null,
  elements: {},
  originalContent: null, // Guardar el contenido original de la tarjeta
};

// Clave de localStorage
const STORAGE_KEY = "offerTimer";

// Guardar estado
const saveTimer = () => {
  try {
    const container = document.querySelector("#countdown-timer");

    // Función helper para parsear valores permitiendo 0
    const parseOrDefault = (value, defaultValue) => {
      const parsed = parseInt(value);
      return !isNaN(parsed) ? parsed : defaultValue;
    };

    const config = {
      days: parseOrDefault(container?.dataset.days, 1),
      hours: parseOrDefault(container?.dataset.hours, 23),
      minutes: parseOrDefault(container?.dataset.minutes, 34),
      seconds: parseOrDefault(container?.dataset.seconds, 57),
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        endTime: timer.endTime,
        saved: Date.now(),
        config: config,
      })
    );
  } catch (e) {
    console.warn("No se pudo guardar el timer:", e);
  }
};

// Cargar estado guardado
const loadTimer = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.warn("No se pudo cargar el timer:", e);
    return null;
  }
};

// Actualizar visualización
const updateDisplay = (days, hours, minutes, seconds) => {
  if (timer.elements.days)
    timer.elements.days.textContent = String(days).padStart(2, "0");
  if (timer.elements.hours)
    timer.elements.hours.textContent = String(hours).padStart(2, "0");
  if (timer.elements.minutes)
    timer.elements.minutes.textContent = String(minutes).padStart(2, "0");
  if (timer.elements.seconds)
    timer.elements.seconds.textContent = String(seconds).padStart(2, "0");
};

// Calcular tiempo restante
const calculateTime = (totalSeconds) => {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
};

// Función principal del countdown
const countdown = () => {
  const now = Date.now();
  const remaining = Math.max(0, Math.floor((timer.endTime - now) / 1000));

  if (remaining <= 0) {
    // Mostrar estado expirado cuando expira y detener el timer
    console.log("⏰ Timer llegó a 0 - iniciando reemplazo de contenido");
    showExpiredState();

    // Detener el timer para que no siga ejecutándose
    if (timer.interval) {
      clearInterval(timer.interval);
      timer.interval = null;
    }

    // Mostrar tiempo en 00:00:00:00
    updateDisplay(0, 0, 0, 0);

    console.log("⏰ Timer expirado - overlay mostrado permanentemente");
    return; // No continuar con el countdown
  }

  // Solo ocultar overlay si el timer está activo y no ha expirado
  const time = calculateTime(remaining);
  updateDisplay(time.days, time.hours, time.minutes, time.seconds);

  // Guardar cada minuto
  if (remaining % 60 === 0) saveTimer();
};

// Mostrar estado expirado - ocultar contenido y mostrar imagen
const showExpiredState = () => {
  console.log("🔍 Iniciando showExpiredState - ocultando contenido...");
  const productCards = document.querySelectorAll(".custom-product-card");
  console.log("🔍 Tarjetas encontradas:", productCards.length);

  productCards.forEach((card, index) => {
    console.log(`🔍 Procesando tarjeta ${index + 1}:`, card);

    // Buscar todos los elementos hijo EXCEPTO el overlay
    const allChildren = card.children;
    for (let i = 0; i < allChildren.length; i++) {
      const child = allChildren[i];
      if (!child.classList.contains("expired-overlay")) {
        // Ocultar todo el contenido excepto el overlay
        child.style.display = "none";
        console.log(`�️ Ocultado elemento:`, child.className);
      }
    }

    // Buscar y mostrar el overlay
    const overlayDiv = card.querySelector(".expired-overlay");
    console.log(
      `🔍 Overlay div encontrado en tarjeta ${index + 1}:`,
      overlayDiv
    );

    if (overlayDiv) {
      // Asegurar que el overlay sea visible y cubra toda la tarjeta
      overlayDiv.style.display = "flex";
      overlayDiv.style.position = "absolute";
      overlayDiv.style.top = "0";
      overlayDiv.style.left = "0";
      overlayDiv.style.width = "100%";
      overlayDiv.style.height = "100%";
      overlayDiv.style.zIndex = "2";
      overlayDiv.style.alignItems = "center";
      overlayDiv.style.justifyContent = "center";
      overlayDiv.style.overflow = "hidden";
      overlayDiv.style.borderRadius = "0.5rem";

      const overlayImg = overlayDiv.querySelector("img");
      if (overlayImg) {
        // Mejorar el encuadre y calidad de la imagen
        overlayImg.style.width = "100%";
        overlayImg.style.height = "100%";
        overlayImg.style.objectFit = "cover";
        overlayImg.style.objectPosition = "center";
        overlayImg.style.borderRadius = "0.5rem";
        overlayImg.style.imageRendering = "high-quality";
        overlayImg.style.imageRendering = "-webkit-optimize-contrast";
        overlayImg.style.backfaceVisibility = "hidden";
        overlayImg.style.transform = "translateZ(0)";

        // Mejorar la resolución usando la imagen original sin compresión
        const originalSrc = overlayImg.src;
        if (originalSrc.includes("img_url")) {
          // Reemplazar con resolución más alta y sin crop
          const newSrc = originalSrc.replace(
            /img_url:\s*'[^']*'/,
            "img_url: '1600x1600', crop: 'center'"
          );
          overlayImg.src = newSrc;
        }

        console.log(`✅ Imagen del overlay optimizada en tarjeta ${index + 1}`);
      }

      console.log(`✅ Overlay mostrado en tarjeta ${index + 1}`);
    } else {
      console.log(`❌ No se encontró div de overlay en tarjeta ${index + 1}`);
    }
  });

  console.log("🚫 Estado expirado activado - contenido ocultado");
};

// Restaurar contenido - mostrar contenido y ocultar imagen
const hideExpiredState = () => {
  console.log("🔍 Iniciando hideExpiredState - mostrando contenido...");
  const productCards = document.querySelectorAll(".custom-product-card");
  console.log("🔍 Tarjetas encontradas:", productCards.length);

  productCards.forEach((card, index) => {
    console.log(`🔍 Procesando tarjeta ${index + 1} para restaurar:`, card);

    // Mostrar todos los elementos hijo EXCEPTO el overlay
    const allChildren = card.children;
    for (let i = 0; i < allChildren.length; i++) {
      const child = allChildren[i];
      if (!child.classList.contains("expired-overlay")) {
        // Mostrar todo el contenido
        child.style.display = "";
        console.log(`�️ Mostrado elemento:`, child.className);
      }
    }

    // Ocultar el overlay
    const overlayDiv = card.querySelector(".expired-overlay");
    if (overlayDiv) {
      overlayDiv.style.display = "none";
      console.log(`✅ Overlay ocultado en tarjeta ${index + 1}`);
    }
  });

  console.log("✅ Estado normal activado - contenido restaurado");
};

// Inicializar timer
const initTimer = (selector) => {
  const container = document.querySelector(selector);
  if (!container) return;

  // Obtener elementos
  timer.elements = {
    container: container.closest(".product-timer"),
    days: container.querySelector(".days"),
    hours: container.querySelector(".hours"),
    minutes: container.querySelector(".minutes"),
    seconds: container.querySelector(".seconds"),
  };

  // Cargar estado o valores iniciales
  const saved = loadTimer();

  // Función helper para parsear valores permitiendo 0
  const parseOrDefault = (value, defaultValue) => {
    const parsed = parseInt(value);
    return !isNaN(parsed) ? parsed : defaultValue;
  };

  // Obtener configuración actual
  const currentConfig = {
    days: parseOrDefault(container.dataset.days, 1),
    hours: parseOrDefault(container.dataset.hours, 23),
    minutes: parseOrDefault(container.dataset.minutes, 34),
    seconds: parseOrDefault(container.dataset.seconds, 57),
  };

  // Debug específico para días
  console.log("🔍 DEBUG DÍAS:", {
    "dataset.days": container.dataset.days,
    parsed: parseInt(container.dataset.days),
    isNaN: isNaN(parseInt(container.dataset.days)),
    final: currentConfig.days,
  });

  // Debug: verificar data attributes
  console.log("🔍 Data attributes del container:", currentConfig);

  // Verificar si hay un timer guardado válido y si coincide con la configuración actual
  let useNewConfig = true;

  if (saved && saved.endTime > Date.now()) {
    // Si hay configuración guardada, compararla con la actual
    if (saved.config) {
      const configMatch =
        saved.config.days === currentConfig.days &&
        saved.config.hours === currentConfig.hours &&
        saved.config.minutes === currentConfig.minutes &&
        saved.config.seconds === currentConfig.seconds;

      if (configMatch) {
        timer.endTime = saved.endTime;
        useNewConfig = false;
        console.log(
          "⏰ Cargando timer guardado - configuración coincide exactamente"
        );
      } else {
        console.log("🔄 Configuración cambió - usando nueva configuración", {
          saved: saved.config,
          current: currentConfig,
        });
      }
    } else {
      // Fallback: verificar por duración aproximada
      const savedDuration = saved.endTime - saved.saved;
      const currentDuration =
        (currentConfig.days * 86400 +
          currentConfig.hours * 3600 +
          currentConfig.minutes * 60 +
          currentConfig.seconds) *
        1000;

      if (Math.abs(savedDuration - currentDuration) < 10000) {
        timer.endTime = saved.endTime;
        useNewConfig = false;
        console.log("⏰ Cargando timer guardado - duración similar");
      }
    }
  }

  if (useNewConfig) {
    console.log(
      `🔧 Configurando timer: ${currentConfig.days}d ${currentConfig.hours}h ${currentConfig.minutes}m ${currentConfig.seconds}s`
    );

    timer.endTime =
      Date.now() +
      (currentConfig.days * 86400 +
        currentConfig.hours * 3600 +
        currentConfig.minutes * 60 +
        currentConfig.seconds) *
        1000;
    saveTimer();
  }

  // Iniciar countdown solo si hay tiempo restante
  if (timer.endTime > Date.now()) {
    timer.interval = setInterval(countdown, 1000);
    countdown(); // Primera ejecución inmediata

    // Ocultar estado expirado solo si el timer está activo
    hideExpiredState();
  } else {
    // Si el timer ya expiró, mostrar estado expirado y no iniciar countdown
    showExpiredState();
    updateDisplay(0, 0, 0, 0);
    console.log("⏰ Timer ya expirado - mostrando estado expirado");
  }

  // Mostrar timer (quitar la clase que lo oculta)
  if (timer.elements.container) {
    timer.elements.container.classList.add("timer-loaded");
  }
};

// Función para reiniciar oferta manualmente (opcional)
const restartOffer = (days, hours, minutes, seconds) => {
  const container = document.querySelector("#countdown-timer");

  // Si no se proporcionan valores, usar los de configuración actual
  if (
    days === undefined ||
    hours === undefined ||
    minutes === undefined ||
    seconds === undefined
  ) {
    // Función helper para parsear valores permitiendo 0
    const parseOrDefault = (value, defaultValue) => {
      const parsed = parseInt(value);
      return !isNaN(parsed) ? parsed : defaultValue;
    };

    days = parseOrDefault(container?.dataset.days, 1);
    hours = parseOrDefault(container?.dataset.hours, 23);
    minutes = parseOrDefault(container?.dataset.minutes, 34);
    seconds = parseOrDefault(container?.dataset.seconds, 57);
  }

  const now = Date.now();
  timer.endTime =
    now + (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000;
  saveTimer();

  // Ocultar estado expirado cuando se reinicia manualmente
  hideExpiredState();

  // Detener timer anterior si existe
  if (timer.interval) {
    clearInterval(timer.interval);
  }

  // Iniciar nuevo countdown
  timer.interval = setInterval(countdown, 1000);
  countdown(); // Primera ejecución inmediata

  console.log(
    `🔄 Oferta reiniciada manualmente: ${days}d ${hours}h ${minutes}m ${seconds}s`
  );
};

// Función para actualizar configuración del timer
const updateTimerConfig = (days, hours, minutes, seconds) => {
  const container = document.querySelector("#countdown-timer");
  if (container) {
    container.dataset.days = days;
    container.dataset.hours = hours;
    container.dataset.minutes = minutes;
    container.dataset.seconds = seconds;

    // Limpiar localStorage para forzar nueva configuración
    localStorage.removeItem(STORAGE_KEY);

    // Reiniciar con nueva configuración
    restartOffer();
    console.log(
      `⚙️ Configuración actualizada: ${days}d ${hours}h ${minutes}m ${seconds}s`
    );
  }
};

// Función para limpiar timer guardado (útil cuando se cambian settings)
const clearSavedTimer = () => {
  localStorage.removeItem(STORAGE_KEY);
  console.log("🗑️ Timer guardado eliminado");
};

// Función para iniciar una nueva oferta (oculta overlay y inicia timer)
const startNewOffer = (days, hours, minutes, seconds) => {
  console.log("🚀 Iniciando nueva oferta");

  // Limpiar cualquier timer guardado anterior
  clearSavedTimer();

  // Actualizar configuración si se proporcionan valores
  if (
    days !== undefined &&
    hours !== undefined &&
    minutes !== undefined &&
    seconds !== undefined
  ) {
    updateTimerConfig(days, hours, minutes, seconds);
  } else {
    // Usar configuración actual y reiniciar
    restartOffer();
  }
};

// Detener timer
const stopTimer = () => {
  if (timer.interval) {
    clearInterval(timer.interval);
    timer.interval = null;
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  initTimer("#countdown-timer");
});

// Limpiar al salir
window.addEventListener("beforeunload", stopTimer);

// Exponer funciones globalmente para uso externo
window.offerTimer = {
  restart: restartOffer,
  updateConfig: updateTimerConfig,
  startNewOffer: startNewOffer,
  clearSaved: clearSavedTimer,
  stop: stopTimer,
  showExpired: showExpiredState,
  hideExpired: hideExpiredState,
  // Funciones de debug
  testExpired: () => {
    console.log("🧪 Probando reemplazo manual de contenido");
    showExpiredState();
  },
  testRestore: () => {
    console.log("🧪 Probando restauración manual de contenido");
    hideExpiredState();
  },
};

// Exponer timer para debug
window.timer = timer;
