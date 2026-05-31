const obtenerClaveCarrito = () => {

  const usuario = JSON.parse(
    localStorage.getItem("usuario") || "{}"
  );

  return usuario.id_cliente
    ? `carrito-supernova-${usuario.id_cliente}`
    : "carrito-supernova-invitado";

};

export const obtenerCarrito = () => {

  const carrito = localStorage.getItem(
    obtenerClaveCarrito()
  );

  return carrito
    ? JSON.parse(carrito)
    : [];

};

export const agregarAlCarrito = (
  producto: any
) => {

  const carrito = obtenerCarrito();

  const productoExistente =
    carrito.find(
      (item: any) =>
        item.id_producto ===
        producto.id_producto
    );

  if (productoExistente) {

    productoExistente.cantidad += 1;

  } else {

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  localStorage.setItem(
    obtenerClaveCarrito(),
    JSON.stringify(carrito)
  );

};

export const eliminarDelCarrito = (
  id: number
) => {

  const carrito = obtenerCarrito();

  const nuevoCarrito =
    carrito.filter(
      (item: any) =>
        item.id_producto !== id
    );

  localStorage.setItem(
    obtenerClaveCarrito(),
    JSON.stringify(nuevoCarrito)
  );

};

export const calcularTotal = () => {

  const carrito = obtenerCarrito();

  return carrito.reduce(
    (total: number, item: any) =>
      total +
      (item.precio * item.cantidad),
    0
  );

};

export const aumentarCantidad = (
  id: number
) => {

  const carrito = obtenerCarrito();

  const producto =
    carrito.find(
      (item: any) =>
        item.id_producto === id
    );

  if (producto) {

    producto.cantidad += 1;

  }

  localStorage.setItem(
    obtenerClaveCarrito(),
    JSON.stringify(carrito)
  );

};

export const disminuirCantidad = (
  id: number
) => {

  const carrito = obtenerCarrito();

  const producto =
    carrito.find(
      (item: any) =>
        item.id_producto === id
    );

  if (producto) {

    producto.cantidad -= 1;

    if (producto.cantidad <= 0) {

      const nuevoCarrito =
        carrito.filter(
          (item: any) =>
            item.id_producto !== id
        );

      localStorage.setItem(
        obtenerClaveCarrito(),
        JSON.stringify(nuevoCarrito)
      );

      return;

    }

  }

  localStorage.setItem(
    obtenerClaveCarrito(),
    JSON.stringify(carrito)
  );

};

export const vaciarCarrito = () => {

  localStorage.removeItem(
    obtenerClaveCarrito()
  );

};