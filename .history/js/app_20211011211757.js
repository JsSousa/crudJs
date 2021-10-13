// Variables Globales
const formularioUI = document.getElementById('formProduct');
const productsListUI = document.getElementById('productsList');

let arrayProducts = [];

// Funciones
const CreateProduct = (formulario) => {

    console.log(formulario);

    let product = {
        name: formulario.name,
        quantity: formulario.quantity,
        price: formulario.price,
        boughtAt: formulario.boughtAt
    }

    arrayProducts.push(product);
    return product;
}

const SaveDB = () => {
    localStorage.setItem('Productos', JSON.stringify(arrayProducts));

    DrawDB();
}

const DrawDB = () => {
    productsListUI.innerHTML = '';
    arrayProducts = JSON.parse(localStorage.getItem('Productos'))
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

    CreateProduct(productUI);
    SaveDB();

    formularioUI.reset();
})