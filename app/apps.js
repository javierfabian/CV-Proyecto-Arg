//menu lateral
let menu_visible = false;
let menu = document.getElementById("nav");

// Contacto (EmailJS deshabilitado por prevención de tracking; pantalla 'próximamente')
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
    // No necesitamos crear divs, solo animar width
}

//selecciono todas las barras generales para luego manipularlas
let html = document.getElementById("html");
let javascript = document.getElementById("javascript");
let SEGURIDADINFORMATICA = document.getElementById("seguridadinformatica");
let REDES = document.getElementById("redes");
let CSS1 = document.getElementById("css1");
let RUBY = document.getElementById("ruby");

// a guardar cantidad de barritas que se van a ir pintando por cada barar
//se usa un array, cada posicion pertenece a un elemneto
//comienza en -1 porque no tiene ninguna pintada al iniciarse
//variable siguiente la voy a utilizar de flag para saber si se ejecuto la animacion
let entro = false;

function initSkillBars() {
    // no repetir
    if (entro) return;
    const skills = [
        {el: html, value: '98%'},
        {el: javascript, value: '70%'},
        {el: SEGURIDADINFORMATICA, value: '90%'},
        {el: REDES, value: '85%'},
        {el: CSS1, value: '95%'},
        {el: RUBY, value: '75%'}
    ];

    skills.forEach(item => {
        if (!item.el) return;
        item.el.style.width = '0%';
        item.el.style.transition = 'width 1.5s ease-in-out';
        item.el.style.backgroundImage = 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)';
    });

    const cont = document.querySelector('.habilidades');
    if (!cont) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || entro) return;
            entro = true;
            skills.forEach((item, index) => {
                if (!item.el) return;
                setTimeout(() => {
                    item.el.style.width = item.value;
                }, index * 180);
            });
            observer.unobserve(cont);
        });
    }, {threshold: 0.3});

    observer.observe(cont);
}

window.addEventListener('load', initSkillBars);
window.addEventListener('resize', initSkillBars);
window.addEventListener('scroll', initSkillBars);

// fallback in case observer logic fails
setTimeout(() => {
    if (!entro) initSkillBars();
}, 1300);

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

  // Simulación de contacto mientras está deshabilitado el envío real
  formMessage.textContent = "¡Gracias, " + nombre + "! El formulario está temporalmente activo en modo demostración (Envío real deshabilitado).";
  formMessage.style.color = "green";
  document.getElementById("contactForm").reset();
});

