let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let cartCount = document.getElementById("cart-count");

// Función para actualizar el contador de artículos en el carrito
function actualizarContadorCarrito() {
    // Mostrar la cantidad de productos en el carrito
    cartCount.textContent = carrito.length;
  }


  
   // Mostrar el modal con el contenido del carrito
function mostrarCarrito() {
    const cartItems = document.getElementById("cartItems");
    const totalPrice = document.getElementById("totalPrice");
    const cartModal = document.getElementById("cartModal");
  
    // Limpiar el contenido anterior
    cartItems.innerHTML = '';
    totalPrice.innerHTML = 'Total: $0.00';
  
    let total = 0;
  
    // Verificar si hay productos en el carrito
    if (carrito.length > 0) {
      carrito.forEach(producto => {
        // Crear una fila por cada producto en el carrito
        const tr = document.createElement("tr");
        
        // Crear celdas de la fila
        const tdNombre = document.createElement("td");
        tdNombre.textContent = producto.nombre;
  
        const tdCantidad = document.createElement("td");
        const inputCantidad = document.createElement("input");
        inputCantidad.type = "number";
        inputCantidad.value = producto.cantidad;
        inputCantidad.min = 1;
  
        inputCantidad.addEventListener("input", function() {
          // Actualizar la cantidad y el precio total cuando se cambia la cantidad
          producto.cantidad = parseInt(inputCantidad.value);
          actualizarCarrito(producto.id, producto.cantidad);
          actualizarTotal(); // Recalcular el total cuando se modifica la cantidad
        });
  
        tdCantidad.appendChild(inputCantidad);
  
        const tdPrecioUnitario = document.createElement("td");
        tdPrecioUnitario.textContent = `$${producto.precio}`;
  
        const tdPrecioTotal = document.createElement("td");
        const precioTotal = producto.precio * producto.cantidad;
        tdPrecioTotal.textContent = `$${precioTotal.toFixed(2)}`;
  
         // Crear celda para el botón de eliminar
    const tdEliminar = document.createElement("td");
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    
    deleteBtn.addEventListener("click", function() {
        const indexToRemove = carrito.findIndex(p => p.id === producto.id);
        if (indexToRemove !== -1) {
          carrito.splice(indexToRemove, 1);
          // Actualizar el carrito en el localStorage
          localStorage.setItem("carrito", JSON.stringify(carrito));
          // Volver a mostrar el carrito
          mostrarCarrito();
          // Recalcular el total
          actualizarTotal();
          actualizarContadorCarrito();
        }
      });

    tdEliminar.appendChild(deleteBtn);

    // Añadir celdas a la fila
    tr.appendChild(tdNombre);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdPrecioUnitario);
    tr.appendChild(tdPrecioTotal);
    tr.appendChild(tdEliminar);

    // Añadir la fila a la tabla
    cartItems.appendChild(tr);
  
        // Sumar el precio total de todos los productos
        total += precioTotal;
      });
  
      // Mostrar el precio total en el modal
      totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    } else {
      // Si el carrito está vacío, mostrar un mensaje
      cartItems.innerHTML = "<tr><td colspan='4'>El carrito está vacío.</td></tr>";
    }
  
    // Mostrar el modal
    cartModal.style.display = "flex";
  }

  // Función para recalcular el total general y actualizar los precios de cada fila
function actualizarTotal() {
    let total = 0;
    const cartItems = document.getElementById("cartItems");
    // Recorrer el carrito y sumar los precios
    carrito.forEach((producto, index) => {
      const tr = cartItems.children[index]; 
      const tdPrecioTotal = tr.children[3]; 
      const precioTotal = producto.precio * producto.cantidad;
  
      tdPrecioTotal.textContent = `$${precioTotal.toFixed(2)}`;
  
      total += precioTotal;
    });
  
    // Mostrar el precio total actualizado
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
  }
  
  // Función para actualizar el carrito en localStorage
  function actualizarCarrito(id, cantidad) {
    carrito.forEach(producto => {
        if(producto.id === id){
            producto.cantidad = cantidad;
        }
      });
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
