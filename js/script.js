// Obtener elementos del DOM
const textInput = document.getElementById('frase');
const textInputEncriptada = document.getElementById('frase-encriptada');
const sugerencia = document.querySelector('.form__sugerencia');
const desencriptarMsg = document.querySelector('.desencriptar__mensaje');
const desencriptarResultado = document.querySelector('.desencriptar__resultado');
const btnEncriptar = document.getElementById('btn-encriptar');
const btnDesencriptar = document.getElementById('btn-desencriptar');
const btnCopy = document.getElementById('btn-copiar');

// Expresión regular para validar la entrada
const regexInput = /^[a-z0-9 ]*$/;

let mensaje = true;
let resultado = false;

function mostrarElemento(elemento, mostrar) {
  elemento.style.display = mostrar ? "flex" : "none";
}

function procesarFrase(callback) {
  if (!regexInput.test(textInput.value) || textInput.value.length === 0) {
    mostrarElemento(sugerencia, true);
    mensaje = true;
    resultado = false;
  } else {
    mostrarElemento(sugerencia, false);
    textInputEncriptada.value = callback(textInput.value);
    mensaje = false;
    resultado = true;
    textInput.value = '';
  }
  mostrarElemento(desencriptarMsg, mensaje);
  mostrarElemento(desencriptarResultado, resultado);
}

function encriptarFrase() {
  procesarFrase((frase) =>
    frase
      .replaceAll("e", "enter")
      .replaceAll("i", "imes")
      .replaceAll("a", "ai")
      .replaceAll("o", "ober")
      .replaceAll("u", "ufat")
  );
}

function desencriptarFrase() {
  if (textInput.value.length === 0) {
    textInputEncriptada.value = '';
    mostrarElemento(sugerencia, true);
    mensaje = true;
    mostrarElemento(desencriptarMsg, mensaje);
    return;
  }else{
    procesarFrase((frase) =>
      frase
        .replaceAll("ufat", "u")
        .replaceAll("ober", "o")
        .replaceAll("ai", "a")
        .replaceAll("imes", "i")
        .replaceAll("enter", "e")
    );
  }
  
}

function copy() {
  textInputEncriptada.select();
  document.execCommand("copy");
  textInputEncriptada.setAttribute('disabled', true);
  textInputEncriptada.value = '';
}

btnEncriptar.addEventListener('click', encriptarFrase);
btnDesencriptar.addEventListener('click', desencriptarFrase);
btnCopy.addEventListener('click', copy);
