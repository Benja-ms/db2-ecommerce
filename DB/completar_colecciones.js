// Completa una colección hasta alcanzar 500 documentos.
// Utiliza el identificador lógico para generar nuevos registros.
function completarColeccion(nombre, campoId, crearDocumento) {
  const coleccion = db.getCollection(nombre);
  const cantidad = coleccion.countDocuments();

  if (cantidad >= 500) {
    print(nombre + ": ya tiene " + cantidad + " documentos.");
    return;
  }

  const ultimo = coleccion.find(
    {},
    { [campoId]: 1, _id: 0 }
  ).sort({ [campoId]: -1 }).limit(1).toArray();

  let siguienteId = ultimo.length > 0
    ? ultimo[0][campoId] + 1
    : 1;

  const documentos = [];

  while (cantidad + documentos.length < 500) {
    documentos.push(crearDocumento(siguienteId));
    siguienteId++;
  }

  if (documentos.length > 0) {
    coleccion.insertMany(documentos);
  }

  print(nombre + ": total " + coleccion.countDocuments());
}

// 1. CLIENTES
completarColeccion("Clientes", "id_cliente", i => ({
  id_cliente: i,
  rut: (10000000 + i) + "-K",
  nombre: "Cliente de prueba " + i,
  tipo_pago: i % 2 === 0
    ? ["Debito", "Credito"]
    : ["Debito"]
}));

// 2. PROVEEDORES
completarColeccion("Proveedores", "id_proveedor", i => ({
  id_proveedor: i,
  rut: (20000000 + i) + "-K",
  razon_social: "Proveedor de prueba " + i + " SPA",
  contacto: {
    email: "proveedor" + i + "@ejemplo.cl",
    telefono: "+569" + String(i).padStart(8, "0")
  },
  direccion: {
    calle: "Avenida de prueba " + i,
    comuna: i % 2 === 0 ? "Ñuñoa" : "Santiago",
    region: "Metropolitana"
  }
}));

// 3. CATEGORÍAS
completarColeccion("Categorias", "id_categoria", i => ({
  id_categoria: i,
  nombre: "Categoria de prueba " + i
}));

// 4. PRODUCTOS
completarColeccion("Productos", "id_productos", i => ({
  id_productos: i,
  nombre: "Producto de prueba " + i,
  descripcion: "Descripcion del producto " + i,
  fecha_elab: "2026-09-24",
  fecha_venc: "2027-10-24",
  stock: 10 + (i % 100),
  precio: 1000 + (i * 100),
  id_categoria: ((i - 1) % 500) + 1,
  id_proveedor: ((i - 1) % 500) + 1
}));

// 5. PEDIDOS
completarColeccion("Pedidos", "n_pedido", i => ({
  n_pedido: i,
  fecha: "2026-10-25",
  hora: "15:00",
  estado: ["pendiente", "enviado", "entregado"][i % 3],
  monto_total: 10000 + (i * 500),
  id_cliente: ((i - 1) % 500) + 1,
  Productos: [{
    id_productos: ((i - 1) % 500) + 1,
    cantidad: 1 + (i % 5),
    precio_unitario: 1000 + (i * 100)
  }]
}));

// 6. ÓRDENES DE COMPRA
completarColeccion("Ordenes_compra", "id_orden", i => ({
  id_orden: i,
  fecha_emision: "26-10-2026",
  plazo_entrega_dias: 3 + (i % 7),
  estado: ["enviado", "pendiente", "recibido"][i % 3],
  id_proveedor: ((i - 1) % 500) + 1,
  productos_solicitados: [{
    id_productos: ((i - 1) % 500) + 1,
    cantidad: 10 + (i % 100),
    precio_unitario: 1000 + (i * 10)
  }]
}));
