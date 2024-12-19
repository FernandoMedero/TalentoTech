const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
const cartModal = document.getElementById("cartModal");
const closeCartModal = document.getElementById("closeCartModal");
let pagina = 0;

//pagina lista
document.addEventListener("DOMContentLoaded", function () {
  obtenerProductos(pagina);
  actualizarContadorCarrito();
});

//productos desde la API
async function obtenerProductos(pagina) {
  const cardContainer = document.getElementById("cardContainer");
  try {
  const response = await
  fetch("https://dummyjson.com/products?limit=6&skip=" + pagina + "&select=title,price,thumbnail");
  const data = await response.json();
  data.products.forEach(producto => {
    const buttonText = '<i class="fa fa-cart-plus" aria-hidden="true"></i>';
    const card = crearCard(
      producto.title,
      producto.thumbnail,
      producto.price,
      buttonText,
      producto.id
    );
    cardContainer.appendChild(card); // Añadir la tarjeta al contenedor
  });
  } catch (error) {
  alert("Error al obtener productos:", error);
  }
  }

function crearCard(title, imageSrc, valor, buttonText, id) {
  //crea tarjeta
  const card = document.createElement("div");
  card.classList.add("card");
  //titulo
  const nombre = document.createElement("h3");
  nombre.innerText = title;
  //imagen
  const img = document.createElement("img");
  img.src = imageSrc;
  //div para boton y cantidad
  const info = document.createElement("div");
  info.classList.add("info");
  info.style.display = "flex";
  info.style.alignItems = "center";
  info.style.gap = "10px";
  //cantidad
  const quantityInput = document.createElement("input");
  quantityInput.classList.add("quantity");
  quantityInput.type = "number";
  quantityInput.min = 1;
  quantityInput.value = 1;
  quantityInput.style.width = "60px";
  //boton
  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("btn");
  addToCartBtn.innerHTML   = buttonText;
  //precio
  const precio = document.createElement("h6");
  precio.classList.add("precio");
  precio.type = "number";
  precio.innerHTML   = "$ " + valor;
    //eventos de boton
  addToCartBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    const quantity = quantityInput.value;
    agregarProducto(id, quantity, valor, title);
    //alert(`Producto ${id} agregado al carrito con ${quantity} unidades.`);
  });

  info.appendChild(quantityInput);
  info.appendChild(addToCartBtn);
  info.appendChild(precio);
  card.appendChild(nombre);
  card.appendChild(img);
  card.appendChild(info);

  card.addEventListener("click", function (event) {
    modal.style.display = "flex";
    modalImage.src = img.src;
  });
  // Agregar evento de clic a la imagen para abrir el modal
  img.addEventListener("click", function (event) {
    modal.style.display = "flex";
    modalImage.src = img.src;
  });

  quantityInput.addEventListener("click", function (event) {
    event.stopPropagation(); // Evitar que se abra el modal al hacer clic en el input
  });
  // Retornar la card
  return card;
}

// cerrar el modal
closeModal.addEventListener("click", function () {
  modal.style.display = "none"; 
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none"; // Ocultar el modal si se hace clic fuera de la imagen
  }
});

function agregarProducto(id, cantidad, precio, nombre) {
  var producto = {
    id,
    cantidad,
    precio,
    nombre,
  };
  
  if(carrito.length > 0){
    let agregar = true;
     carrito.forEach(item => {
    if(producto.id === item.id){
        item.cantidad = parseInt(item.cantidad) + parseInt(producto.cantidad); // mismo producto suma la cantidad
        agregar = false;
      }
  });
  if(agregar){
    carrito.push(producto); // no estaba en el carrito lo agrega
  }
  }
  else{
    carrito.push(producto); //si el carro estaba vacio agrega producto
  }
  
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

btCarro.addEventListener("click", function () {
    mostrarCarrito();
  });

btMasProd.addEventListener("click",function (){
  obtenerProductos(pagina = pagina + 6);
});

  // cerrar el modal
closeCartModal.addEventListener("click", function() {
    cartModal.style.display = "none";
  });
  
  // Cerrar el modal al hacer clic afuera 
  window.addEventListener("click", function(event) {
    if (event.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  checkoutBtn.addEventListener("click", function(){
    alert("Carrito Finalizado");
    localStorage.clear();
    carrito = [];
    cartCount.textContent = carrito.length;
    closeCartModal.click();
  });