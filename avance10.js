// Avance 10: interacciones sencillas del menú y el formulario.
document.addEventListener('DOMContentLoaded', function () {
  const buscador = document.querySelector('#buscador');
  const productos = document.querySelectorAll('.seleccion-menu .producto');
  const listaCarrito = document.querySelector('#carrito');
  const totalCarrito = document.querySelector('#total-carrito');
  const carrito = [];

  if (buscador) {
    buscador.addEventListener('input', function () {
      const busqueda = buscador.value.trim().toLocaleLowerCase('es');
      productos.forEach(function (producto) {
        const nombre = producto.querySelector('h3').textContent.toLocaleLowerCase('es');
        producto.classList.toggle('d-none', !nombre.includes(busqueda));
      });
    });
  }

  function mostrarCarrito() {
    if (!listaCarrito || !totalCarrito) return;
    listaCarrito.replaceChildren();
    let total = 0;

    if (carrito.length === 0) {
      const vacio = document.createElement('li');
      vacio.className = 'list-group-item';
      vacio.textContent = 'Tu carrito está vacío.';
      listaCarrito.appendChild(vacio);
    }

    carrito.forEach(function (item) {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      const fila = document.createElement('li');
      fila.className = 'list-group-item d-flex justify-content-between gap-2';
      const nombre = document.createElement('span');
      nombre.textContent = item.nombre + ' × ' + item.cantidad;
      const importe = document.createElement('span');
      importe.textContent = '$' + subtotal.toFixed(2);
      fila.append(nombre, importe);
      listaCarrito.appendChild(fila);
    });

    totalCarrito.textContent = '$' + total.toFixed(2);
  }

  document.querySelectorAll('.btn-agregar').forEach(function (boton) {
    boton.addEventListener('click', function () {
      const producto = boton.closest('.producto');
      const nombre = producto.querySelector('h3').textContent.trim();
      const precio = Number(producto.dataset.precio);
      const existente = carrito.find(function (item) { return item.nombre === nombre; });

      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
      }
      mostrarCarrito();
    });
  });

  mostrarCarrito();

  const formulario = document.querySelector('#form-contacto');
  if (!formulario) return;

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const nombre = formulario.querySelector('#nombre');
    const correo = formulario.querySelector('#correo');
    const mensaje = formulario.querySelector('#mensaje');
    const aviso = formulario.querySelector('#aviso-formulario');
    const campos = [nombre, correo, mensaje];

    campos.forEach(function (campo) { campo.classList.remove('is-invalid'); });
    aviso.classList.add('d-none');
    let valido = true;

    if (!nombre.value.trim()) { nombre.classList.add('is-invalid'); valido = false; }
    if (!correo.value.trim() || !correo.checkValidity()) { correo.classList.add('is-invalid'); valido = false; }
    if (!mensaje.value.trim()) { mensaje.classList.add('is-invalid'); valido = false; }

    if (valido) {
      aviso.classList.remove('d-none');
    }
  });
});
