// Variables Globales
const formularioUI = document.getElementById('formProduct');
const productsListUI = document.getElementById('productsList');

let arrayProducts = [];

// Funciones
const CrearProduct = (formulario) => {

    console.log(formulario);

    let product = {
        name: '',
        quantity: '',
        price: '',
        boughtAt: ''
    }
}

// EventListener

formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let productUI = {
        name: document.getElementById('productName').value,
        quantity: document.getElementById('productQuantity').value,
        price: document.getElementById('productPrice').value,
        boughtAt: document.getElementById('boughtAt').value
    }
})