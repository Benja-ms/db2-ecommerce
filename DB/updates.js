use("TiendaEcommerce");

//1-clientes (10 updates)

// 1.1 agregar un nuevo metodo de pago a un cliente especifico
db.Clientes.updateOne(
  { id_cliente: 1 },
  { $addToSet: { tipo_pago: "MercadoPago" } }
); // justificacion: permite al cliente registrar una nueva forma de pago activa.

// 1.2 actualizar el nombre/razon social de un cliente
db.Clientes.updateOne(
  { id_cliente: 2 },
  { $set: { nombre: "Cliente Actualizado 2" } }
); // justificacion: correccion de datos personales por solicitud del usuario.

// 1.3 agregar un campo de estado 'activo' a los clientes que usan debito
db.Clientes.updateMany(
  { tipo_pago: "Debito" },
  { $set: { estado_cuenta: "Activo" } }
); // justificacion: categorizar la cuenta de clientes para campañas de marketing.

// 1.4 modificar el rut de un cliente por error de digitacion
db.Clientes.updateOne(
  { id_cliente: 3 },
  { $set: { rut: "19888003-1" } }
); // justificacion: mantenimiento e integridad de la identificacion fiscal.

// 1.5 asignar membresia vip a clientes especificos
db.Clientes.updateOne(
  { id_cliente: 5 },
  { $set: { categoria_cliente: "VIP" } }
); // justificacion: fidelizacion de clientes segun historial de compras.

// 1.6 remover un metodo de pago descontinuado
db.Clientes.updateOne(
  { id_cliente: 1 },
  { $pull: { tipo_pago: "Credito" } }
); // justificacion: desactivacion de tarjetas vencidas o retiradas por el cliente.

// 1.7 agregar email de contacto a un cliente
db.Clientes.updateOne(
  { id_cliente: 4 },
  { $set: { email: "cliente4@correo.cl" } }
); // justificacion: normalizacion de canales de comunicacion directos.

// 1.8 cambiar categoria de clientes de prueba a estandar
db.Clientes.updateMany(
  { nombre: /Cliente de prueba/ },
  { $set: { tipo_usuario: "Estandar" } }
); // justificacion: configuracion masiva de perfiles para usuarios recien creados.

// 1.9 agregar un arreglo de preferencias a un cliente
db.Clientes.updateOne(
  { id_cliente: 10 },
  { $set: { preferencias: ["Tecnologia", "Hogar"] } }
); // justificacion: personalizacion de recomendaciones.

// 1.10 establecer fecha de ultima actualizacion de perfil
db.Clientes.updateOne(
  { id_cliente: 1 },
  { $set: { ultima_actualizacion: "2026-10-28" } }
); // justificacion: auditoria de cambios en la cuenta del cliente.


// 2-productos (10 updates)

// 2.1 revalorizar precio de un producto especifico (aumento por inflacion/costos)
db.Productos.updateOne(
  { id_productos: 1 },
  { $set: { precio: 320000 } }
); // justificacion: ajuste de precios de mercado.

// 2.2 reabastecer stock de un producto
db.Productos.updateOne(
  { id_productos: 1 },
  { $inc: { stock: 20 } }
); // justificacion: entrada de nuevo inventario a bodega.

// 2.3 aplicar un 10% de descuento masivo a productos de una categoria
db.Productos.updateMany(
  { id_categoria: 1 },
  { $mul: { precio: 0.90 } }
); // justificacion: estrategia promocional para la categoria tecnologia.

// 2.4 actualizar la fecha de vencimiento de un lote de productos
db.Productos.updateOne(
  { id_productos: 2 },
  { $set: { fecha_venc: "2028-12-31" } }
); // justificacion: actualizacion de vigencia por nuevo lote recibido.

// 2.5 marcar productos sin stock como 'agotado'
db.Productos.updateMany(
  { stock: 0 },
  { $set: { estado_stock: "Agotado" } }
); // justificacion: control visual de disponibilidad en la plataforma.

// 2.6 cambiar el proveedor asignado a un producto
db.Productos.updateOne(
  { id_productos: 3 },
  { $set: { id_proveedor: 2 } }
); // justificacion: reasignacion de proveedor por cambio de contrato.

// 2.7 actualizar la descripcion comercial de un producto
db.Productos.updateOne(
  { id_productos: 1 },
  { $set: { descripcion: "Televisor Smart TV LED 4K 50 pulgadas Edición 2026" } }
); // justificacion: ficha tecnica enriquecida para mejorar la conversion.

// 2.8 reducir stock por merma o producto dañado
db.Productos.updateOne(
  { id_productos: 5 },
  { $inc: { stock: -2 } }
); // justificacion: ajuste de inventario fisico por auditoria.

// 2.9 asignar etiqueta de "producto destacado"
db.Productos.updateOne(
  { id_productos: 1 },
  { $set: { destacado: true } }
); // justificacion: destacar articulos en la pagina principal del e-commerce.

// 2.10 actualizar masivamente el estado de productos con stock disponible
db.Productos.updateMany(
  { stock: { $gt: 0 } },
  { $set: { estado_stock: "Disponible" } }
); // justificacion: mantener la consistencia del catalogo en linea.



//3-pedidos (10 updates)

// 3.1 cambiar estado de pedido a 'completado'
db.Pedidos.updateOne(
  { n_pedido: 1 },
  { $set: { estado: "completado" } }
); // justificacion: confirmacion de que el pedido fue entregado con exito.

// 3.2 cambiar estado de pedidos pendientes a 'en proceso'
db.Pedidos.updateMany(
  { estado: "pendiente" },
  { $set: { estado: "en_proceso" } }
); // justificacion: flujo operativo de procesamiento de ordenes.

// 3.3 recalcular monto total de un pedido
db.Pedidos.updateOne(
  { n_pedido: 1 },
  { $set: { monto_total: 350000 } }
); // justificacion: ajuste del monto tras agregar un item adicional.

// 3.4 agregar un producto adicional al arreglo de un pedido en preparacion
db.Pedidos.updateOne(
  { n_pedido: 1 },
  { $push: { Productos: { id_productos: 2, cantidad: 1, precio_unitario: 50000 } } }
); // justificacion: modificacion del pedido solicitada por el cliente antes del despacho.

// 3.5 actualizar la hora de entrega de un pedido
db.Pedidos.updateOne(
  { n_pedido: 1 },
  { $set: { hora: "17:30" } }
); // justificacion: reprogramacion del horario de entrega acordado.

// 3.6 anular o cancelar un pedido
db.Pedidos.updateOne(
  { n_pedido: 2 },
  { $set: { estado: "cancelado", motivo_cancelacion: "Solicitud del cliente" } }
); // justificacion: cancelacion y registro de motivo para auditoria interna.

// 3.7 asignar un codigo de seguimiento de despacho
db.Pedidos.updateOne(
  { n_pedido: 1 },
  { $set: { numero_seguimiento: "CHILE2026-9988" } }
); // justificacion: integracion con la empresa de logistica y seguimiento del paquete.

// 3.8 aplicar un cupon de descuento sobre el monto total de un pedido
db.Pedidos.updateOne(
  { n_pedido: 3 },
  { $mul: { monto_total: 0.95 } }
); // justificacion: aplicacion retroactiva de promocion comercial.

// 3.9 cambiar masivamente el estado de pedidos procesados a 'enviado'
db.Pedidos.updateMany(
  { estado: "en_proceso" },
  { $set: { estado: "enviado" } }
); // justificacion: actualizacion masiva de logistica al salir los camiones de reparto.

// 3.10 registrar observaciones o notas en un pedido
db.Pedidos.updateOne(
  { n_pedido: 1 },
  { $set: { observaciones: "Dejar en conserjería" } }
); // justificacion: instrucciones especiales de despacho para el repartidor.


// 4-proveedores (10 updates)

// 4.1 actualizar el telefono de contacto de un proveedor
db.Proveedores.updateOne(
  { id_proveedor: 1 },
  { $set: { "contacto.telefono": "+56999887766" } }
); // justificacion: mantener la informacion de contacto institucional al dia.

// 4.2 cambiar el correo electronico del departamento de ventas del proveedor
db.Proveedores.updateOne(
  { id_proveedor: 1 },
  { $set: { "contacto.email": "contacto@distribuidortec.cl" } }
); // justificacion: actualizacion de canal de comunicacion corporativo.

// 4.3 actualizar la direccion fisica del proveedor
db.Proveedores.updateOne(
  { id_proveedor: 1 },
  { $set: { "direccion.calle": "Av. Providencia 1500", "direccion.comuna": "Providencia" } }
); // justificacion: cambio de domicilio fiscal o bodega central.

// 4.4 modificar la razon social de un proveedor
db.Proveedores.updateOne(
  { id_proveedor: 1 },
  { $set: { razon_social: "Distribuidora Tecnológica SpA" } }
); // justificacion: reestructuracion legal de la empresa proveedora.

// 4.5 agregar una categoria de servicio al proveedor
db.Proveedores.updateOne(
  { id_proveedor: 1 },
  { $set: { condicion_pago: "30 dias" } }
); // justificacion: registrar acuerdos y condiciones comerciales en la bd.

// 4.6 calificar al proveedor
db.Proveedores.updateOne(
  { id_proveedor: 1 },
  { $set: { evaluacion: "Excelente" } }
); // justificacion: gestion de calidad de proveedores en el e-commerce.

// 4.7 actualizar masivamente la region de proveedores ubicados en la capital
db.Proveedores.updateMany(
  { "direccion.comuna": "Ñuñoa" },
  { $set: { "direccion.region": "Región Metropolitana de Santiago" } }
); // justificacion: estandarizacion de nombres geograficos.

// 4.8 agregar campo de ejecutivo asignado al proveedor
db.Proveedores.updateOne(
  { id_proveedor: 1 },
  { $set: { ejecutivo_cuenta: "Carlos Mendoza" } }
); // justificacion: asignacion de responsable comercial para la gestion.

// 4.9 modificar el rut del proveedor por regularizacion
db.Proveedores.updateOne(
  { id_proveedor: 2 },
  { $set: { rut: "76543210-K" } }
); // justificacion: correccion en ficha del proveedor.

// 4.10 marcar un proveedor como activo
db.Proveedores.updateMany(
  {},
  { $set: { estado_proveedor: "Activo" } }
); // justificacion: sincronizacion del estado de la red de proveedores.



// 5-categorias (10 updates)

// 5.1 cambiar el nombre de una categoria
db.Categorias.updateOne(
  { id_categoria: 1 },
  { $set: { nombre: "Tecnología y Electrónica" } }
); // justificacion: redefinicion del catalogo para abarcar mas subproductos.

// 5.2 agregar una descripcion explicativa a la categoria
db.Categorias.updateOne(
  { id_categoria: 1 },
  { $set: { descripcion: "Dispositivos electrónicos, gadgets y accesorios" } }
); // justificacion: optimizacion seo y navegabilidad del sitio web.

// 5.3 asignar un estado de visibilidad en la tienda web
db.Categorias.updateOne(
  { id_categoria: 1 },
  { $set: { visible_menu: true } }
); // justificacion: control de publicacion en la barra de navegacion del e-commerce.

// 5.4 activar todas las categorias por defecto
db.Categorias.updateMany(
  {},
  { $set: { activa: true } }
); // justificacion: mantenimiento del catalogo activo.

// 5.5 definir prioridad de despliegue
db.Categorias.updateOne(
  { id_categoria: 1 },
  { $set: { orden_despliegue: 1 } }
); // justificacion: organizar las categorias mas populares al inicio de la pagina.

// 5.6 desactivar una categoria de temporada fuera de epoca
db.Categorias.updateOne(
  { id_categoria: 5 },
  { $set: { activa: false } }
); // justificacion: ocultar lineas de producto que no estan en campaña.

// 5.7 cambiar nombre de categoria generica
db.Categorias.updateOne(
  { id_categoria: 2 },
  { $set: { nombre: "Electrohogar" } }
); // justificacion: mejorar la identificacion por parte de los clientes.

// 5.8 agregar campo de comision por venta segun categoria
db.Categorias.updateOne(
  { id_categoria: 1 },
  { $set: { porcentaje_comision: 5 } }
); // justificacion: definicion de regla financiera interna.

// 5.9 modificar la comision de varias categorias
db.Categorias.updateMany(
  { activa: true },
  { $set: { ultima_revision: "2026-10-28" } }
); // justificacion: registro de fecha de auditoria de catalogo.

// 5.10 agregar una etiqueta o tag identificador a la categoria
db.Categorias.updateOne(
  { id_categoria: 1 },
  { $set: { tag: "tecno-2026" } }
); // justificacion: index/etiquetado para filtros de busqueda.



// 6.ordenes_compra (10 updates)

// 6.1 cambiar estado de orden de compra a 'recibido'
db.Ordenes_compra.updateOne(
  { id_orden: 1 },
  { $set: { estado: "recibido" } }
); // justificacion: confirmacion de recepcion conforme en el almacen central.

// 6.2 reducir o ajustar el plazo de entrega acordado
db.Ordenes_compra.updateOne(
  { id_orden: 1 },
  { $set: { plazo_entrega_dias: 2 } }
); // justificacion: reorganizacion prioritaria del proveedor.

// 6.3 actualizar masivamente el estado de ordenes 'enviado' a 'en_transito'
db.Ordenes_compra.updateMany(
  { estado: "enviado" },
  { $set: { estado: "en_transito" } }
); // justificacion: seguimiento del envio por transportista internacional/nacional.

// 6.4 modificar precio unitario pactado en un item de la orden de compra
db.Ordenes_compra.updateOne(
  { id_orden: 1, "productos_solicitados.id_productos": 1 },
  { $set: { "productos_solicitados.$.precio_unitario": 950 } }
); // justificacion: descuento por volumen acordado con el proveedor a ultima hora.

// 6.5 incrementar la cantidad solicitada de un producto en la orden
db.Ordenes_compra.updateOne(
  { id_orden: 1, "productos_solicitados.id_productos": 1 },
  { $set: { "productos_solicitados.$.cantidad": 150 } }
); // justificacion: incremento de pedido para evitar quiebres de stock.

// 6.6 cambiar fecha de emision por reemision del documento fiscal
db.Ordenes_compra.updateOne(
  { id_orden: 1 },
  { $set: { fecha_emision: "28-10-2026" } }
); // justificacion: correccion administrativa de fecha de facturacion.

// 6.7 marcar orden de compra como cancelada
db.Ordenes_compra.updateOne(
  { id_orden: 2 },
  { $set: { estado: "cancelada" } }
); // justificacion: anulacion por incumplimiento en tiempos de entrega.

// 6.8 agregar responsable de recepcion en bodega
db.Ordenes_compra.updateOne(
  { id_orden: 1 },
  { $set: { recepcionado_por: "Bodega Central - Turno Mañana" } }
); // justificacion: registro de trazabilidad fisica al ingresar mercancia.

// 6.9 agregar notas a la orden de compra
db.Ordenes_compra.updateOne(
  { id_orden: 1 },
  { $set: { nota_proveedor: "Despachar paletizado con film transparente" } }
); // justificacion: requerimientos de empaque e inspeccion.

// 6.10 actualizar masivamente el plazo de entrega por contingencia de transporte
db.Ordenes_compra.updateMany(
  { estado: "en_transito" },
  { $inc: { plazo_entrega_dias: 1 } }
); // justificacion: ajuste operacional ante imprevistos logisticos.