const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
//pagina lista
window.onload = function () {
  cargarCards();
};

function cargarCards() {
  const cardContainer = document.getElementById("cardContainer");
  for (let i = 0; i < 10; i++) {
    const imageSrc = `https://picsum.photos/200/300?random=${i + 1}`;
    const defaultQuantity = 1;
    const buttonText = "Agregar al carrito";
    const titulo = "Producto " + (i + 1);
    // Crear una tarjeta
    const card = crearCard(
      titulo,
      imageSrc,
      defaultQuantity,
      buttonText,
      i + 1
    );
    cardContainer.appendChild(card); // Añadir la tarjeta al contenedor
  }
}

function crearCard(title, imageSrc, defaultQuantity = 1, buttonText, id) {
  //crea tarjeta
  const card = document.createElement("div");
  card.classList.add("card");
  //titulo
  const cardTitle = document.createElement("h3");
  cardTitle.innerText = title; 
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
  quantityInput.value = defaultQuantity; 
  quantityInput.style.width = "60px"; 
  //boton
  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("btn");
  addToCartBtn.innerText = buttonText; 
  //eventos de boton
  addToCartBtn.addEventListener("click", function (event) {
    event.stopPropagation(); 
    const quantity = quantityInput.value;
    alert(`Producto ${id} agregado al carrito con ${quantity} unidades.`);
  });

  info.appendChild(quantityInput);
  info.appendChild(addToCartBtn);
  card.appendChild(cardTitle); 
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

// Función para cerrar el modal
closeModal.addEventListener("click", function () {
  modal.style.display = "none"; // Ocultar el modal
});

// Cerrar el modal al hacer clic fuera de la imagen
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none"; // Ocultar el modal si se hace clic fuera de la imagen
  }
});
