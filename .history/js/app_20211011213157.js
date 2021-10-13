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
    arrayProducts = JSON.parse(localStorage.getItem('Productos'));

    if (arrayProducts === null) {
        arrayProducts = [];
    } else {
        arrayProducts.forEach(element => {
            productsListUI.innerHTML += `<tr>
            <td>${element.name}</td>
            <td>${element.quantity}</td>
            <td>${element.price}</td>
            <td>${element.boughtAt}</td>
            <td class="colActions">
            
            <button type="button" id="btnEdit${element.name}" data-bs-toggle="modal" data-bs-target="#exampleModal" name="btn-edit" class="btn btn-primary btn-sm"><i class="fa fa-edit text-ligth" aria-hidden="true"></i></button>
            <button type="button" id="btnDelete${element.name}" name="btn-delete" class="btn btn-danger btn-sm"><i class="fa fa-trash text-ligth" aria-hidden="true"></i></button>
            </td>
        </tr>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        `
        });
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

    CreateProduct(productUI);
    SaveDB();

    formularioUI.reset();
})