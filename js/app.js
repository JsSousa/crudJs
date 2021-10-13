// Variables Globales
const formularioUI = document.getElementById('formProduct');
const productsListUI = document.getElementById('productsList');
const formularioModal = document.getElementById('formProductEdit');
const modalEdit = document.getElementById('modal-container');

let arrayProducts = [];

// Funciones
const CreateProduct = (formulario) => {

    let product = {
        name: formulario.name,
        quantity: formulario.quantity,
        price: formulario.price,
        boughtAt: formulario.boughtAt
    }

    arrayProducts.push(product);
    return product;
}

const EditProduct = (name, form) => {

    arrayProducts.forEach(element => {
        if (element.name === name) {
            element.name = form.name;
            element.quantity = form.quantity;
            element.price = form.price;
            element.boughtAt = form.boughtAt;
        }
    })
    
    SaveDB();
}

const SaveDB = () => {
    localStorage.setItem('Productos', JSON.stringify(arrayProducts));

    DrawDB();
}

const DeleteDB = (name) => {

        arrayProducts.forEach(element => {
            if (element.name === name) {
                let index = arrayProducts.indexOf(name);
                arrayProducts.splice(index, 1);
                SaveDB();
            }
        })

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
            
            <button type="button" id="${element.name}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary btn-sm"><i id="${element.name}" class="fa fa-edit text-ligth" aria-hidden="true"></i></button>
            <button type="button" id="${element.name}" class="delete btn btn-danger btn-sm"><i id="${element.name}"  class="delete fa fa-trash text-ligth" aria-hidden="true"></i></button>
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
                        <form class="card-body p-5 text-center" id="formProductEdit" name="formProductEdit">
    
                            <div class="mb-md-5 mt-md-4 pb-5">
    
                                <h2 class="fw-bold mb-2 text-uppercase">Shopping List</h2>
                                <p class="text-white-50 mb-5">Por favor ingresa los datos del producto</p>
    
                                <div class="form-outline form-white mb-4">
                                    <input type="text" id="editProductName" name="productName" class="form-control form-control-lg" value="${element.name}" />
                                    <label  for="productName">Nombre del producto</label>
                                </div>
    
                                <div class="form-outline form-white mb-4">
                                    <input type="text" id="editProductQuantity" name="productQuantity" class="form-control form-control-lg" value="${element.quantity}" />
                                    <label  for="productQuantity">Cantidad</label>
                                </div>
    
                                <div class="form-outline form-white mb-4">
                                    <input type="text" id="editProductPrice" name="productPrice" class="form-control form-control-lg" value="${element.price}" />
                                    <label  for="productPrice">Precio</label>
                                </div>
    
                                <div class="form-outline form-white mb-4 text-start">
                                    <label for="boughtAt">Fecha de Compra</label>
                                    <input type="date" id="editBoughtAt" name="boughtAt" class="form-control form-control-lgs" value="${element.boughtAt}" />
                                </div>
    
                            </div>
    
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" id="${element.name}" class="edit btn btn-primary">Save changes</button>
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
});

document.addEventListener('DOMContentLoaded', DrawDB);

productsListUI.addEventListener('click', (e) => {
    
    e.preventDefault();

    let productUI = {
        name: document.getElementById('editProductName').value,
        quantity: document.getElementById('editProductQuantity').value,
        price: document.getElementById('editProductPrice').value,
        boughtAt: document.getElementById('editBoughtAt').value
    }

    if (e.target.classList[0] == 'delete') {
        DeleteDB(e.target.id);
    }

    if (e.target.classList[0] == 'edit') {
        EditProduct(e.target.id, productUI);
    }

})