var redirecionarFalado = false;

if ("webkitSpeechRecognition" in window) {
  const recognition = new webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "pt-BR";

  const resultadoDiv = document.getElementById("resultado");
  const sugestaoDiv = document.getElementById("sugestao");
  const redirecionarDiv = document.getElementById("redirecionarDiv");
  const redirecionarInput = document.getElementById("redirecionarInput");
  const redirecionarBtn = document.getElementById("redirecionarBtn");
  const btnToggle = document.getElementById("btnToggle");
  let isListening = false;
  let redirecionarTexto = "";

  function toggleTheme(mode) {
    const body = document.body;
    const isDarkMode = mode === "noturno";

    body.classList.toggle("dark-mode", isDarkMode);
    resultadoDiv.classList.toggle("dark-mode", isDarkMode);
    sugestaoDiv.classList.toggle("dark-mode", isDarkMode);
  }

  function activateRedirectionMode() {
    redirecionarDiv.style.display = "block";
    redirecionarInput.focus();
  }

  function redirect() {
    let site = redirecionarInput.value.toLowerCase();

    if (!site.includes(".com") && !site.includes(".gov")) {
      site += ".com";
    }

    if (site) {
      window.open("https://" + site, "_blank");
    }

    redirecionarDiv.style.display = "none";
    redirecionarInput.value = "";
    redirecionarTexto = "";
  }

  recognition.onresult = function (event) {
    let resultado = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        resultado += event.results[i][0].transcript;
      } else {
        resultado += event.results[i][0].transcript;
      }
    }

    resultadoDiv.textContent = resultado;

    if (resultado.toLowerCase().includes("redirecionar")) {
      if (!redirecionarFalado) {
        redirecionarFalado = true;
      }

      resultadoDiv.textContent =
        "Escreva ou fale para onde você quer ser redirecionado.";
    }

    if (redirecionarFalado) {
      const textoRedirecionamento = resultado
        .toLowerCase()
        .replace("redirecionar", "")
        .trim();

      redirecionarTexto = textoRedirecionamento;
      redirecionarInput.value = redirecionarTexto;
      activateRedirectionMode();
    }

    if (resultado.toLowerCase().includes("modo noturno")) {
      toggleTheme("noturno");
    }

    if (resultado.toLowerCase().includes("modo diurno")) {
      toggleTheme("diurno");
    }
  };

  function toggleRecognition() {
    if (isListening) {
      recognition.stop();
      sugestaoDiv.style.display = "block";
      btnToggle.textContent = "Ativar Reconhecimento de Fala";
    } else {
      recognition.start();
      sugestaoDiv.style.display = "none";
      btnToggle.textContent = "Desativar Reconhecimento de Fala";
    }

    isListening = !isListening;
  }

  btnToggle.addEventListener("click", toggleRecognition);

  redirecionarBtn.addEventListener("click", redirect);
} else {
  alert("Desculpe, o seu navegador não suporta o Reconhecimento de Fala.");
}
