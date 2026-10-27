
use("TiendaEcommerce");

// ============================================================
// PARTE A: VISUALIZACIÓN DEL CONTENIDO DE LAS COLECCIONES
// ============================================================

// Para visualizar los documentos de cada colección, ejecutar
// por separado los siguientes comandos en mongosh.
// Se pueden retirar los comentarios de una línea a la vez.

// db.Clientes.find()
// db.Proveedores.find()
// db.Categorias.find()
// db.Productos.find()
// db.Pedidos.find()
// db.Ordenes_compra.find()


// ============================================================
// PARTE B: DIEZ CONSULTAS FILTRADAS POR COLECCIÓN
// ============================================================

// ------------------------------------------------------------
// 1. COLECCIÓN: Clientes
// ------------------------------------------------------------

// Consulta 1: buscar un cliente por su identificador.
// Justificación: permite localizar un cliente específico.
print("\nCLIENTES - Consulta 1");
db.Clientes.find({ id_cliente: 1 }).limit(20).forEach(printjson);

// Consulta 2: buscar Clientes cuyo nombre contenga "prueba".
// Justificación: permite localizar registros de prueba por nombre.
print("\nCLIENTES - Consulta 2");
db.Clientes.find({ nombre: /prueba/i }).limit(20).forEach(printjson);

// Consulta 3: buscar Clientes con un RUT específico.
// Justificación: permite consultar un cliente por su RUT.
print("\nCLIENTES - Consulta 3");
db.Clientes.find({ rut: "12345678-9" }).limit(20).forEach(printjson);

// Consulta 4: buscar Clientes que acepten pago con crédito.
// Justificación: permite identificar Clientes con ese método de pago.
print("\nCLIENTES - Consulta 4");
db.Clientes.find({ tipo_pago: "Credito" }).limit(20).forEach(printjson);

// Consulta 5: buscar Clientes que acepten pago con débito.
// Justificación: permite identificar Clientes que usan débito.
print("\nCLIENTES - Consulta 5");
db.Clientes.find({ tipo_pago: "Debito" }).limit(20).forEach(printjson);

// Consulta 6: buscar Clientes que acepten ambos métodos de pago.
// Justificación: permite identificar Clientes con ambas alternativas.
print("\nCLIENTES - Consulta 6");
db.Clientes.find({
  tipo_pago: { $all: ["Debito", "Credito"] }
}).limit(20).forEach(printjson);

// Consulta 7: buscar Clientes con identificador superior a 250.
// Justificación: permite consultar un rango de identificadores.
print("\nCLIENTES - Consulta 7");
db.Clientes.find({
  id_cliente: { $gt: 250 }
}).limit(20).forEach(printjson);

// Consulta 8: buscar Clientes con identificador entre 100 y 200.
// Justificación: permite consultar un intervalo de registros.
print("\nCLIENTES - Consulta 8");
db.Clientes.find({
  id_cliente: { $gte: 100, $lte: 200 }
}).limit(20).forEach(printjson);

// Consulta 9: buscar Clientes que tengan identificador menor o igual a 50.
// Justificación: permite consultar los primeros registros del conjunto.
print("\nCLIENTES - Consulta 9");
db.Clientes.find({
  id_cliente: { $lte: 50 }
}).limit(20).forEach(printjson);

// Consulta 10: mostrar Clientes que acepten débito y tengan ID par.
// Justificación: combina condiciones para filtrar los resultados.
print("\nCLIENTES - Consulta 10");
db.Clientes.find({
  tipo_pago: "Debito",
  id_cliente: { $mod: [2, 0] }
}).limit(20).forEach(printjson);


// ------------------------------------------------------------
// 2. COLECCIÓN: Proveedores
// ------------------------------------------------------------

// Consulta 1: buscar un proveedor por su identificador.
print("\nPROVEEDORES - Consulta 1");
db.Proveedores.find({ id_proveedor: 1 }).limit(20).forEach(printjson);

// Consulta 2: buscar proveedores cuya razón social contenga "prueba".
print("\nPROVEEDORES - Consulta 2");
db.Proveedores.find({ razon_social: /prueba/i }).limit(20).forEach(printjson);

// Consulta 3: buscar proveedores por RUT.
print("\nPROVEEDORES - Consulta 3");
db.Proveedores.find({ rut: "12345678-9" }).limit(20).forEach(printjson);

// Consulta 4: buscar proveedores de la comuna de Ñuñoa.
// Justificación: permite localizar proveedores por ubicación.
print("\nPROVEEDORES - Consulta 4");
db.Proveedores.find({ "direccion.comuna": "Ñuñoa" }).limit(20).forEach(printjson);

// Consulta 5: buscar proveedores de la comuna de Santiago.
print("\nPROVEEDORES - Consulta 5");
db.Proveedores.find({ "direccion.comuna": "Santiago" }).limit(20).forEach(printjson);

// Consulta 6: buscar proveedores de la Región Metropolitana.
print("\nPROVEEDORES - Consulta 6");
db.Proveedores.find({ "direccion.region": "Metropolitana" }).limit(20).forEach(printjson);

// Consulta 7: buscar un proveedor por correo electrónico.
print("\nPROVEEDORES - Consulta 7");
db.Proveedores.find({
  "contacto.email": "ventas@ejemplo.cl"
}).limit(20).forEach(printjson);

// Consulta 8: buscar teléfonos que comiencen con +569.
// Justificación: permite filtrar contactos por prefijo telefónico.
print("\nPROVEEDORES - Consulta 8");
db.Proveedores.find({
  "contacto.telefono": /^\+569/
}).limit(20).forEach(printjson);

// Consulta 9: buscar proveedores con ID superior a 250.
print("\nPROVEEDORES - Consulta 9");
db.Proveedores.find({
  id_proveedor: { $gt: 250 }
}).limit(20).forEach(printjson);

// Consulta 10: buscar proveedores con ID entre 100 y 200.
print("\nPROVEEDORES - Consulta 10");
db.Proveedores.find({
  id_proveedor: { $gte: 100, $lte: 200 }
}).limit(20).forEach(printjson);


// ------------------------------------------------------------
// 3. COLECCIÓN: Categorias
// ------------------------------------------------------------

// Consulta 1: buscar una categoría por identificador.
print("\nCATEGORIAS - Consulta 1");
db.Categorias.find({ id_categoria: 1 }).limit(20).forEach(printjson);

// Consulta 2: buscar categorías cuyo nombre contenga "Tecnologia".
print("\nCATEGORIAS - Consulta 2");
db.Categorias.find({ nombre: /Tecnologia/i }).limit(20).forEach(printjson);

// Consulta 3: buscar categorías cuyo nombre contenga "prueba".
print("\nCATEGORIAS - Consulta 3");
db.Categorias.find({ nombre: /prueba/i }).limit(20).forEach(printjson);

// Consulta 4: buscar categorías con ID superior a 100.
print("\nCATEGORIAS - Consulta 4");
db.Categorias.find({
  id_categoria: { $gt: 100 }
}).limit(20).forEach(printjson);

// Consulta 5: buscar categorías con ID superior a 250.
print("\nCATEGORIAS - Consulta 5");
db.Categorias.find({
  id_categoria: { $gt: 250 }
}).limit(20).forEach(printjson);

// Consulta 6: buscar categorías con ID inferior a 100.
print("\nCATEGORIAS - Consulta 6");
db.Categorias.find({
  id_categoria: { $lt: 100 }
}).limit(20).forEach(printjson);

// Consulta 7: buscar categorías con ID entre 100 y 200.
print("\nCATEGORIAS - Consulta 7");
db.Categorias.find({
  id_categoria: { $gte: 100, $lte: 200 }
}).limit(20).forEach(printjson);

// Consulta 8: buscar categorías con ID par.
print("\nCATEGORIAS - Consulta 8");
db.Categorias.find({
  id_categoria: { $mod: [2, 0] }
}).limit(20).forEach(printjson);

// Consulta 9: buscar categorías con ID impar.
print("\nCATEGORIAS - Consulta 9");
db.Categorias.find({
  id_categoria: { $mod: [2, 1] }
}).limit(20).forEach(printjson);

// Consulta 10: buscar categorías cuyo ID sea múltiplo de 10.
print("\nCATEGORIAS - Consulta 10");
db.Categorias.find({
  id_categoria: { $mod: [10, 0] }
}).limit(20).forEach(printjson);


// ------------------------------------------------------------
// 4. COLECCIÓN: Productos
// ------------------------------------------------------------

// Consulta 1: buscar un producto por su identificador.
print("\nPRODUCTOS - Consulta 1");
db.Productos.find({ id_productos: 1 }).limit(20).forEach(printjson);

// Consulta 2: buscar productos cuyo nombre contenga "Smart TV".
print("\nPRODUCTOS - Consulta 2");
db.Productos.find({ nombre: /Smart Tv/i }).limit(20).forEach(printjson);

// Consulta 3: buscar productos con stock superior a 50.
// Justificación: permite identificar productos con disponibilidad alta.
print("\nPRODUCTOS - Consulta 3");
db.Productos.find({ stock: { $gt: 50 } }).limit(20).forEach(printjson);

// Consulta 4: buscar productos con stock inferior a 30.
// Justificación: ayuda a identificar productos que podrían requerir reposición.
print("\nPRODUCTOS - Consulta 4");
db.Productos.find({ stock: { $lt: 30 } }).limit(20).forEach(printjson);

// Consulta 5: buscar productos con precio superior a 10000.
print("\nPRODUCTOS - Consulta 5");
db.Productos.find({ precio: { $gt: 10000 } }).limit(20).forEach(printjson);

// Consulta 6: buscar productos con precio entre 5000 y 20000.
print("\nPRODUCTOS - Consulta 6");
db.Productos.find({
  precio: { $gte: 5000, $lte: 20000 }
}).limit(20).forEach(printjson);

// Consulta 7: buscar productos asociados a la categoría 1.
print("\nPRODUCTOS - Consulta 7");
db.Productos.find({ id_categoria: 1 }).limit(20).forEach(printjson);

// Consulta 8: buscar productos asociados al proveedor 1.
print("\nPRODUCTOS - Consulta 8");
db.Productos.find({ id_proveedor: 1 }).limit(20).forEach(printjson);

// Consulta 9: buscar productos cuyo stock sea exactamente 50.
print("\nPRODUCTOS - Consulta 9");
db.Productos.find({ stock: 50 }).limit(20).forEach(printjson);

// Consulta 10: buscar productos con stock positivo y precio inferior a 10000.
print("\nPRODUCTOS - Consulta 10");
db.Productos.find({
  stock: { $gt: 0 },
  precio: { $lt: 10000 }
}).limit(20).forEach(printjson);


// ------------------------------------------------------------
// 5. COLECCIÓN: Pedidos
// ------------------------------------------------------------

// Consulta 1: buscar un pedido por su número.
print("\nPEDIDOS - Consulta 1");
db.Pedidos.find({ n_pedido: 1 }).limit(20).forEach(printjson);

// Consulta 2: buscar pedidos pendientes.
print("\nPEDIDOS - Consulta 2");
db.Pedidos.find({ estado: "pendiente" }).limit(20).forEach(printjson);

// Consulta 3: buscar pedidos enviados.
print("\nPEDIDOS - Consulta 3");
db.Pedidos.find({ estado: "enviado" }).limit(20).forEach(printjson);

// Consulta 4: buscar pedidos entregados.
print("\nPEDIDOS - Consulta 4");
db.Pedidos.find({ estado: "entregado" }).limit(20).forEach(printjson);

// Consulta 5: buscar pedidos con monto total superior a 100000.
print("\nPEDIDOS - Consulta 5");
db.Pedidos.find({
  monto_total: { $gt: 100000 }
}).limit(20).forEach(printjson);

// Consulta 6: buscar pedidos con monto entre 50000 y 150000.
print("\nPEDIDOS - Consulta 6");
db.Pedidos.find({
  monto_total: { $gte: 50000, $lte: 150000 }
}).limit(20).forEach(printjson);

// Consulta 7: buscar pedidos asociados al cliente 1.
print("\nPEDIDOS - Consulta 7");
db.Pedidos.find({ id_cliente: 1 }).limit(20).forEach(printjson);

// Consulta 8: buscar pedidos de una fecha específica.
print("\nPEDIDOS - Consulta 8");
db.Pedidos.find({ fecha: "2026-10-25" }).limit(20).forEach(printjson);

// Consulta 9: buscar pedidos que incluyan el producto 1.
print("\nPEDIDOS - Consulta 9");
db.Pedidos.find({
  "Productos.id_productos": 1
}).limit(20).forEach(printjson);

// Consulta 10: buscar pedidos con monto elevado que estén pendientes.
print("\nPEDIDOS - Consulta 10");
db.Pedidos.find({
  estado: "pendiente",
  monto_total: { $gt: 100000 }
}).limit(20).forEach(printjson);


// ------------------------------------------------------------
// 6. COLECCIÓN: Ordenes_compra
// ------------------------------------------------------------

// Consulta 1: buscar una orden por su identificador.
print("\nORDENES DE COMPRA - Consulta 1");
db.Ordenes_compra.find({ id_orden: 1 }).limit(20).forEach(printjson);

// Consulta 2: buscar órdenes enviadas.
print("\nORDENES DE COMPRA - Consulta 2");
db.Ordenes_compra.find({ estado: "enviado" }).limit(20).forEach(printjson);

// Consulta 3: buscar órdenes pendientes.
print("\nORDENES DE COMPRA - Consulta 3");
db.Ordenes_compra.find({ estado: "pendiente" }).limit(20).forEach(printjson);

// Consulta 4: buscar órdenes recibidas.
print("\nORDENES DE COMPRA - Consulta 4");
db.Ordenes_compra.find({ estado: "recibido" }).limit(20).forEach(printjson);

// Consulta 5: buscar órdenes de un proveedor específico.
print("\nORDENES DE COMPRA - Consulta 5");
db.Ordenes_compra.find({ id_proveedor: 1 }).limit(20).forEach(printjson);

// Consulta 6: buscar órdenes con plazo de entrega superior a cinco días.
print("\nORDENES DE COMPRA - Consulta 6");
db.Ordenes_compra.find({
  plazo_entrega_dias: { $gt: 5 }
}).limit(20).forEach(printjson);

// Consulta 7: buscar órdenes con plazo de entrega entre tres y seis días.
print("\nORDENES DE COMPRA - Consulta 7");
db.Ordenes_compra.find({
  plazo_entrega_dias: { $gte: 3, $lte: 6 }
}).limit(20).forEach(printjson);

// Consulta 8: buscar órdenes emitidas en una fecha específica.
print("\nORDENES DE COMPRA - Consulta 8");
db.Ordenes_compra.find({
  fecha_emision: "26-10-2026"
}).limit(20).forEach(printjson);

// Consulta 9: buscar órdenes que soliciten el producto 1.
print("\nORDENES DE COMPRA - Consulta 9");
db.Ordenes_compra.find({
  "productos_solicitados.id_productos": 1
}).limit(20).forEach(printjson);

// Consulta 10: buscar órdenes pendientes con plazo superior a cinco días.
print("\nORDENES DE COMPRA - Consulta 10");
db.Ordenes_compra.find({
  estado: "pendiente",
  plazo_entrega_dias: { $gt: 5 }
}).limit(20).forEach(printjson);

print("\nFin de las consultas de lectura.");
