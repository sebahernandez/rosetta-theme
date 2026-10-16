(function () {
  if (window.__bsPriceInitialized) return;
  window.__bsPriceInitialized = true;

  var SELECTOR = '.bcv-convertido:not([data-convertido])';
  var TASA_FALLBACK = 36.5;
  var APIS = [
    {
      url: 'https://api.exchangerate-api.com/v4/latest/USD',
      parse: function (data) {
        return {
          valor: data.rates.VED || data.rates.VES || TASA_FALLBACK,
          fecha: new Date().toLocaleDateString(),
        };
      },
    },
    {
      url:
        'https://api.allorigins.win/get?url=' +
        encodeURIComponent('https://pydolarvenezuela-api.vercel.app/api/v1/dollarbcv'),
      parse: function (data) {
        var content = JSON.parse(data.contents);
        return { valor: parseFloat(content.valor), fecha: content.fecha };
      },
    },
  ];

  var tasaPromesa = null;

  function obtenerTasa() {
    if (tasaPromesa) return tasaPromesa;
    tasaPromesa = (async function () {
      for (var i = 0; i < APIS.length; i++) {
        try {
          var response = await fetch(APIS[i].url);
          var data = await response.json();
          var result = APIS[i].parse(data);
          var tasa = parseFloat(result.valor);
          if (!isNaN(tasa) && tasa > 0) return { tasa: tasa, fecha: result.fecha };
        } catch (error) {
          console.warn('Error con API de tasa ' + (i + 1) + ':', error.message);
        }
      }
      throw new Error('No se pudo obtener la tasa de ninguna API');
    })();
    return tasaPromesa;
  }

  function obtenerDivTasa(elemento) {
    var siguiente = elemento.nextElementSibling;
    return siguiente && siguiente.classList.contains('tasa-bcv') ? siguiente : null;
  }

  function mostrarError(elemento, mensaje) {
    elemento.innerHTML = 'Bs (error)';
    var tasaDiv = obtenerDivTasa(elemento);
    if (tasaDiv) tasaDiv.innerText = mensaje;
  }

  async function procesarElemento(elemento) {
    elemento.setAttribute('data-convertido', '');
    var precioUSD = parseFloat(elemento.dataset.precio);
    if (isNaN(precioUSD) || precioUSD <= 0) {
      mostrarError(elemento, 'Precio no válido');
      return;
    }
    try {
      var resultado = await obtenerTasa();
      elemento.innerHTML = '≈ Bs ' + (precioUSD * resultado.tasa).toFixed(2);
      var tasaDiv = obtenerDivTasa(elemento);
      if (tasaDiv) {
        tasaDiv.innerText = '💱 Tasa BCV: Bs ' + resultado.tasa.toFixed(2) + ' (' + resultado.fecha + ')';
      }
    } catch (error) {
      mostrarError(elemento, 'Error obteniendo tasa');
    }
  }

  function convertirPendientes(raiz) {
    raiz.querySelectorAll(SELECTOR).forEach(procesarElemento);
  }

  function iniciar() {
    convertirPendientes(document);
    new MutationObserver(function (mutaciones) {
      mutaciones.forEach(function (mutacion) {
        mutacion.addedNodes.forEach(function (nodo) {
          if (nodo.nodeType !== 1) return;
          if (nodo.matches(SELECTOR)) procesarElemento(nodo);
          convertirPendientes(nodo);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
