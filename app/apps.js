//menu lateral
let menu_visible = false;
let menu = document.getElementById("nav");

// Inicializar EmailJS
emailjs.init("TB3XG0w0IeMegseRhd");

function mostrarOcultarMenu() {
    menu.classList.toggle("mostrar");
    menu_visible = menu.classList.contains("mostrar");
}

//oculto el menu una vez que selecciono una opcion
let links = document.querySelectorAll("nav a");
for (var x = 0; x < links.length; x++) {
    links[x].onclick = function() {
        menu.classList.remove("mostrar");
        menu_visible = false;
    }
}

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        menu.classList.remove("mostrar");
        menu_visible = false;
    }
});
//creo las barritas de una barra particular identificada por su id
function crearBarra(id_barra) {
    for (i = 0; i <= 16; i++) {
        let div = document.createElement("div");
        div.className = "e";
        id_barra.appendChild(div);
    }
}


//selecciono todas las barras generales para luego manipularlas
let html = document.getElementById("html");
crearBarra(html);
let javascript = document.getElementById("javascript");
crearBarra(javascript);
let SEGURIDADINFORMATICA = document.getElementById("seguridadinformatica");
crearBarra(SEGURIDADINFORMATICA);
let REDES = document.getElementById("redes");
crearBarra(REDES);
let CSS1 = document.getElementById("css1");
crearBarra(CSS1);
let RUBY = document.getElementById("ruby");
crearBarra(RUBY);

// a guardar cantidad de barritas que se van a ir pintando por cada barar
//se usa un array, cada posicion pertenece a un elemneto
//comienza en -1 porque no tiene ninguna pintada al iniciarse
let contadores = [-1, -1, -1, -1, -1, -1];
//variable siguiente la voy a utilizar de flag para saber si se ejecuto la animacion
let entro = false;

//funcion aplica las animaciones de las habilidades
function efectoHabilidades() {
    var habilidades = document.getElementById("habilidades");
    if (!habilidades) return;

    var distancia_skills = window.innerHeight - habilidades.getBoundingClientRect().top;
    console.log("distancia_skills", distancia_skills, "innerHeight", window.innerHeight, "top", habilidades.getBoundingClientRect().top);
    if (distancia_skills >= 0 && entro === false) {
        entro = true;
        const intervalhtml = setInterval(function() {
            pintarBarra(html, 16, 0, intervalhtml);
        }, 80);
        const intervaljavascript = setInterval(function() {
            pintarBarra(javascript, 11, 1, intervaljavascript);
        }, 80);
        const intervalSEGURIDADINFORMATICA = setInterval(function() {
            pintarBarra(SEGURIDADINFORMATICA, 14, 2, intervalSEGURIDADINFORMATICA);
        }, 80);
        const intervalREDES = setInterval(function() {
            pintarBarra(REDES, 13, 3, intervalREDES);
        }, 80);
        const intervalCSS1 = setInterval(function() {
            pintarBarra(CSS1, 16, 4, intervalCSS1);
        }, 80);
        const intervalRUBY = setInterval(function() {
            pintarBarra(RUBY, 12, 5, intervalRUBY);
        }, 80);
    }
}

//lleno una barra particular con la cantidad indicada
function pintarBarra(id_barra, cantidad, indice, interval) {
    contadores[indice]++;
    let x = contadores[indice];

    if (x < cantidad) {
        let elementos = id_barra.getElementsByClassName("e");
        if (elementos[x]) {
            elementos[x].style.backgroundColor = "#940253";
        }
    } else {
        clearInterval(interval);
    }
}

//detecto el scrolling del mouse para aplicar la animacion de la barra
window.addEventListener('scroll', efectoHabilidades);
// Llamada inicial para cubrir el caso en que el usuario ya está en la sección al abrir
window.addEventListener('load', efectoHabilidades);

// También comprobamos en resize para que la animación pueda ejecutarse con cambio de ventana
window.addEventListener('resize', efectoHabilidades);

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const formMessage = document.getElementById("formMessage");

  if (!nombre || !email || !mensaje) {
    formMessage.textContent = "Por favor, completa todos los campos.";
    formMessage.style.color = "red";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formMessage.textContent = "Ingresa un correo electrónico válido.";
    formMessage.style.color = "red";
    return;
  }

  // Enviar con EmailJS usando tus datos reales
  console.log("EmailJS init object:", window.emailjs);
  console.log("EmailJS intent send", { nombre, email, mensaje });

  emailjs.send("service_y2kcr23", "template_0mbse7d", {
  from_name: nombre,
  from_email: email,
  reply_to: email,          // importante si en tu template Reply To usa esta variable
  to_email: "javierfabian2107@hotmail.com",
  message: mensaje
})
  .then(function() {
    formMessage.textContent = "¡Gracias por tu mensaje, " + nombre + "! Te responderé pronto.";
    formMessage.style.color = "green";
    document.getElementById("contactForm").reset();
  })
  .catch(function(error) {
  console.error("EmailJS fallo:", error);
  formMessage.textContent = "Error al enviar el mensaje. Intenta nuevamente.";
  formMessage.style.color = "red";
});
});

