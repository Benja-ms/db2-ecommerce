// 1) CLIENTES

// 1. Contar los clientes registrados.
// Justificación: indicador básico del tamaño de la cartera de clientes.
db.Clientes.aggregate([{ $count: "total_clientes" }]);

// 2. Contar clientes por tipo de pago.
// Justificación: $unwind separa el arreglo tipo_pago para saber qué medio se usa más.
db.Clientes.aggregate([
  { $unwind: "$tipo_pago" },
  {
    $group: {
      _id: "$tipo_pago",
      cantidad_clientes: { $sum: 1 },
    },
  },
  { $sort: { cantidad_clientes: -1, _id: 1 } },
]);

// 3. Mostrar clientes que aceptan pago con débito.
db.Clientes.aggregate([
  { $match: { tipo_pago: "Debito" } },
  {
    $project: {
      _id: 1,
      id_cliente: 1,
      nombre: 1,
      email: 1,
      tipo_pago: 1,
    },
  },
]);

// 4. Mostrar clientes que tienen correo registrado.
db.Clientes.aggregate([
  { $match: { email: { $exists: true } } },
  { $project: { nombre: 1, email: 1 } },
]);

// 5. Mostrar clientes que tienen un método de pago registrado.
db.Clientes.aggregate([
  { $match: { tipo_pago: { $exists: true } } },
  { $project: { nombre: 1, tipo_pago: 1 } },
]);

// 6. Mostrar los primeros 5 clientes por nombre.
db.Clientes.aggregate([
  { $sort: { nombre: 1 } },
  { $limit: 5 },
  { $project: { nombre: 1, email: 1 } },
]);

// 7. Mostrar clientes que tienen teléfono registrado.
db.Clientes.aggregate([
  { $match: { telefono: { $exists: true } } },
  { $project: { nombre: 1, telefono: 1 } },
]);

// 8. Mostrar los primeros 10 clientes ordenados por nombre.
// Justificación: listado simple de contacto, limitado para no traer toda la colección.
db.Clientes.aggregate([
  { $sort: { nombre: 1 } },
  { $limit: 10 },
  {
    $project: {
      _id: 1,
      id_cliente: 1,
      nombre: 1,
      email: 1,
      telefono: 1,
    },
  },
]);

// 9. Mostrar clientes que tienen RUT registrado.
db.Clientes.aggregate([
  { $match: { rut: { $exists: true } } },
  { $project: { nombre: 1, rut: 1 } },
]);

// 10. Mostrar los clientes que aceptan pago con crédito.
db.Clientes.aggregate([
  { $match: { tipo_pago: "Credito" } },
  { $project: { nombre: 1, email: 1, tipo_pago: 1 } },
]);

// 2) PROVEEDORES

// 1. Contar los proveedores registrados.
// Justificación: indicador básico de la red de abastecimiento.
db.Proveedores.aggregate([{ $count: "total_proveedores" }]);

// 2. Contar proveedores por región.
// Justificación: muestra la distribución geográfica de los proveedores.
db.Proveedores.aggregate([
  {
    $group: {
      _id: "$direccion.region",
      cantidad: { $sum: 1 },
    },
  },
  { $sort: { cantidad: -1, _id: 1 } },
]);

// 3. Contar proveedores por comuna.
// Justificación: permite ver concentración local, útil para la logística.
db.Proveedores.aggregate([
  {
    $group: {
      _id: "$direccion.comuna",
      cantidad: { $sum: 1 },
    },
  },
  { $sort: { cantidad: -1, _id: 1 } },
]);

// 4. Mostrar proveedores con correo de contacto.
db.Proveedores.aggregate([
  { $match: { "contacto.email": { $exists: true } } },
  { $project: { razon_social: 1, "contacto.email": 1 } },
]);

// 5. Mostrar proveedores con el correo de contacto vacío.
db.Proveedores.aggregate([
  { $match: { "contacto.email": "" } },
  { $project: { razon_social: 1, "contacto.email": 1 } },
]);

// 6. Mostrar los primeros 10 proveedores ordenados por razón social.
// Justificación: listado simple de contacto para el área de compras.
db.Proveedores.aggregate([
  { $sort: { razon_social: 1 } },
  { $limit: 10 },
  {
    $project: {
      _id: 1,
      id_proveedor: 1,
      razon_social: 1,
      rut: 1,
      contacto: 1,
    },
  },
]);

// 7. Mostrar proveedores de la Región Metropolitana.
// Justificación: permite priorizar proveedores cercanos para entregas rápidas.
db.Proveedores.aggregate([
  { $match: { "direccion.region": "Metropolitana" } },
  {
    $project: {
      _id: 1,
      id_proveedor: 1,
      razon_social: 1,
      direccion: 1,
    },
  },
]);

// 8. Mostrar proveedores que tienen comuna registrada.
db.Proveedores.aggregate([
  { $match: { "direccion.comuna": { $exists: true } } },
  { $project: { razon_social: 1, "direccion.comuna": 1 } },
]);

// 9. Mostrar los primeros 5 proveedores por razón social.
db.Proveedores.aggregate([
  { $sort: { razon_social: 1 } },
  { $limit: 5 },
  { $project: { razon_social: 1, rut: 1 } },
]);

// 10. Contar proveedores con correo de contacto.
db.Proveedores.aggregate([
  { $match: { "contacto.email": { $exists: true } } },
  { $count: "proveedores_con_correo" },
]);

// 3) CATEGORIAS

// 1. Contar las categorías registradas.
// Justificación: indicador básico del tamaño del catálogo.
db.Categorias.aggregate([{ $count: "total_categorias" }]);

// 2. Listar las categorías ordenadas por nombre.
// Justificación: base para menús o filtros de la tienda.
db.Categorias.aggregate([
  { $sort: { nombre: 1 } },
  {
    $project: {
      _id: 1,
      id_categoria: 1,
      nombre: 1,
    },
  },
]);

// 3. Mostrar las primeras 5 categorías por nombre.
db.Categorias.aggregate([
  { $sort: { nombre: 1 } },
  { $limit: 5 },
  { $project: { nombre: 1 } },
]);

// 4. Mostrar las categorías registradas.
db.Categorias.aggregate([{ $project: { id_categoria: 1, nombre: 1 } }]);

// 5. Mostrar las categorías en orden alfabético inverso.
db.Categorias.aggregate([
  { $sort: { nombre: -1 } },
  { $project: { nombre: 1 } },
]);

// 6. Mostrar las categorías que tienen un identificador.
db.Categorias.aggregate([
  { $match: { id_categoria: { $exists: true } } },
  { $project: { id_categoria: 1, nombre: 1 } },
]);

// 7. Mostrar las categorías que tienen nombre.
db.Categorias.aggregate([
  { $match: { nombre: { $exists: true } } },
  { $project: { nombre: 1 } },
]);

// 8. Mostrar las primeras 3 categorías.
db.Categorias.aggregate([{ $limit: 3 }, { $project: { nombre: 1 } }]);

// 9. Contar las categorías que tienen nombre.
db.Categorias.aggregate([
  { $match: { nombre: { $exists: true } } },
  { $count: "total_categorias_con_nombre" },
]);

// 10. Mostrar las primeras 5 categorías por identificador.
db.Categorias.aggregate([
  { $sort: { id_categoria: 1 } },
  { $limit: 5 },
  { $project: { id_categoria: 1, nombre: 1 } },
]);

// 4) Productos
// 1) Conteo total de productos por categoria
// Justificacion: Permite saber la variedad del catalogo, con el group se agrupa los id categoria y con sum se cuenta cada producto del grupo
db.Productos.aggregate([
  { $group: { _id: "$id_categoria", total_productos: { $sum: 1 } } },
]);

// 2) Los 5 productos de mayor precio con stock disponible.
// Justificacion: Permite identificar los articulos de mayor valor, con el match para filtrar los stock mayor a 1, con sort se ordena los precios de forma descendente
// Con el limit limitamos la busqueda a mostrar, y con el proyect definimos los campos a mostrar necesarios.
db.Productos.aggregate([
  { $match: { stock: { $gte: 1 } } },
  { $sort: { precio: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, nombre: 1, precio: 1, stock: 1 } },
]);

// 3) Precio promedio y cantidad de productos por categoría.
// Justificacion: Permite identificar cuales son las categoria mas caras y cuales son las mas economicas, ademas de ver la cantidad. con avg se calcula el promedio del precio y con sum se cuenta cuandos hay.
db.Productos.aggregate([
  {
    $group: {
      _id: "$id_categoria",
      precio_promedio: { $avg: "$precio" },
      cantidad_productos: { $sum: 1 },
    },
  },
  { $sort: { precio_promedio: -1 } },
]);

// 4) Producto mas caro por proveedor
// Justificacion: Permite identificar  cual es el precio maximo que nos vende cada vendedor, agrupando por el id proveedor  y se busca el precio mas alto com max, y se ordena los resultados mayor a menor con sort
db.Productos.aggregate([
  { $group: { _id: "$id_proveedor", precio_maximo: { $max: "$precio" } } },
  { $sort: { precio_maximo: -1 } },
]);

// 5) Suma total de productos en stock por categoria
// Justificacio: Permite saber el volumen fisico total de productos almacenados por cada categoria, con group se agrupa la categoria y se suma el valor con sum a stock, y con sort se ordena de mayor a menor
db.Productos.aggregate([
  { $group: { _id: "$id_categoria", total_productos: { $sum: "$stock" } } },
  { $sort: { total_unidades: -1 } },
]);

// 6) Conteo de productos con stock menores de 30 por proveedor
// Justificacion: Permite saber que productos tengan menor cantidad para saber que proveedores contactarse, con match se filtra solo los productos cuyo stock es menor de 30, con group se filtra los id del provedor y con sum se cuenta
db.Productos.aggregate([
  { $match: { stock: { $lte: 30 } } },
  { $group: { _id: "$id_proveedor", productos_bajo: { $sum: 1 } } },
]);

// 7) Busacador de un producto especifico en una categoria, desde el mas caro al mas barato
// Justificacion: Permite ver el listado en una categoria para saber que productos contiene segun el precio
db.Productos.aggregate([
  { $match: { id_categoria: 1 } },
  { $sort: { precio: -1 } },
  { $project: { _id: 0, nombre: 1, precio: 1, stock: 1 } },
]);

// 8) Los 10 productos mas baratos
// Justificacion: Permite identificar una lista de los productos mas baratos con stock, con match se filtra para asegurar que haya stock disponible, con sort se forma ascendente, limit para hacer el top 10 y project para espeficifar que campos mostrar
db.Productos.aggregate([
  { $match: { stock: { $gt: 0 } } },
  { $sort: { precio: 1 } },
  { $limit: 10 },
  { $project: { _id: 0, nombre: 1, precio: 1 } },
]);

// 9) Un catalogo de productos en un rango de presupuesto medio
// Justificacion: Permite el listado para que los clientes busquen los productos segun un presupuesto medio, con match se filtra los precios con mayor o igual 10000 (gte) y menor o igual 50000 (lte), con sort se ordena el precio desde del mas barato y con project se filtra
db.Productos.aggregate([
  { $match: { precio: { $gte: 10000, $lte: 50000 } } },
  { $sort: { precio: 1 } },
  { $project: { _id: 0, nombre: 1, precio: 1 } },
]);

// 10) El precio del producto mas barato que hay en cada categoria
// Justificacion: Permite identificar el producto mas economico por categoria, con group se agrupa la categoria y con el min se busca el precio mas bajo y con sort se ordena la categoria desde menor a mayor

db.Productos.aggregate([
  { $group: { _id: "$id_categoria", precio_desde: { $min: "$precio" } } },
  { $sort: { precio_desde: 1 } },
]);

// 5) Pedidos
// 1) Cantidad de pedidos y monto toaltes agrupado por estado
// Justificacion: Permite visualizar la cantidad de ventas y el dinero que esta ingresado
db.Pedidos.aggregate([
  {
    $group: {
      _id: "$estado",
      cantidad_pedidos: { $sum: 1 },
      dinero_total: { $sum: "$monto_total" },
    },
  },
  { $sort: { cantidad_pedidos: -1 } },
]);

// 2) Los 5 clientes con mayor gasto total
// Justificacion: Permite identificar a los compradores que mas gastan
db.Pedidos.aggregate([
  {
    $group: {
      _id: "$id_cliente",
      gasto_total: { $sum: "$monto_total" },
      cantidad_pedidos: { $sum: 1 },
    },
  },
  { $sort: { gasto_total: -1 } },
  { $limit: 5 },
]);

// 3) Los pedidos completados con mayor monto total
// Justificacion: Permite saber que compras mas caras fueron concretadas teniendo los detalles de un pedido
db.Pedidos.aggregate([
  { $match: { estado: "completado" } },
  { $sort: { monto_total: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      n_pedido: 1,
      fecha: 1,
      monto_total: 1,
      numero_seguimiento: 1,
    },
  },
]);

// 4) Ingreso totales diarios y cantidad de pedidos completados
// Justificacion: Permite saber el rendimiento diario, identificando la cantidad de productos que se genera ventas
db.Pedidos.aggregate([
  { $match: { estado: "completado" } },
  {
    $group: {
      _id: "$fecha",
      ingresos_diarios: { $sum: "$monto_total" },
      total_ventas: { $sum: 1 },
    },
  },
  { $sort: { ingresos_diarios: -1 } },
]);

// 5) Las compra maxima realizada por cada cliente
// Justificacion permite identificar el tope de gasto individual de cada cliente
db.Pedidos.aggregate([
  { $group: { _id: "$id_cliente", compra_maxima: { $max: "$monto_total" } } },
  { $sort: { compra_maxima: -1 } },
]);

// 6) Los 5 pedidos pendientes con mayor valor
// Justificacion: Permite identificar los productos pendientes que retienen mas dinero para contactar a esos clientes
db.Pedidos.aggregate([
  { $match: { estado: "pendiente" } },
  { $sort: { monto_total: -1 } },
  { $limit: 5 },
  {
    $project: { _id: 0, n_pedido: 1, fecha: 1, monto_total: 1, id_cliente: 1 },
  },
]);

// 7) El horario con mas mayor de volumen de transacciones
// Justificacion: Permite conocer a que horas se registra el mayor volumen de ventas
db.Pedidos.aggregate([
  {
    $group: {
      _id: "$hora",
      cantidad_pedidos: { $sum: 1 },
      dinero_movido: { $sum: "monto_total" },
    },
  },
  { $sort: { cantidad_pedidos: -1 } },
  { $limit: 5 },
]);

// 8) Compra minima por cliente
// Justificacion: Identifica gasto mas bajo de cada comprador para venta
db.Pedidos.aggregate([
  { $group: { _id: "$id_cliente", compra_minima: { $min: "$monto_total" } } },
  { $sort: { compra_minima: 1 } },
]);

// 9) Dinero retenido por pedidos cancelados agrupado por fecha
// Justificacion: Cuantifica el impacto de dinero diario de las ventas anuladas para evaluar posibles problemas
db.Pedidos.aggregate([
  { $match: { estado: "pendiente" } },
  {
    $group: {
      _id: "$fecha",
      perdidas_diarias: { $sum: "$monto_total" },
      cantidad_anulados: { $sum: 1 },
    },
  },
  { $sort: { perdidas_diarias: -1 } },
]);

// 10) Lista de pedidos completados
// Justificacion: Lista completada de pedidos dentro de un rango de valor medio
db.Pedidos.aggregate([
  {
    $match: {
      estado: "completado",
      monto_total: { $gte: 200000, $lte: 400000 },
    },
  },
  { $sort: { monto_total: 1 } },
  {
    $project: { _id: 0, n_pedido: 1, fecha: 1, monto_total: 1, id_cliente: 1 },
  },
]);

// 6) Ordenes_Compra

// 1) Conteo de ordenes de compra agrupadas por estado
// Justificacion: Permite visualizar el volumen de ordenes enviadas, pendientes, etc
db.Ordenes_compra.aggregate([
  { $group: { _id: "$estado", cantidad_ordenes: { $sum: 1 } } },
  { $sort: { cantidad_ordenes: -1 } },
]);

// 2) Promedio de dias de plazo de entrega por proveedor
// Justificacion: Evaluar el rendimiento de cada proveedor calculando con avg la media de dias para entregar los pedidos
db.Ordenes_compra.aggregate([
  {
    $group: {
      _id: "$id_proveedor",
      promedio_dias_entrega: { $avg: "$plazo_entrega_dias" },
    },
  },
  { $sort: { promedio_dias_entrega: 1 } },
]);

// 3) Las 5 ordenes enviadas con mayor plazo de entrega
// Justificacion: Identifica los pedidos que mas tardaran en llegar, usando match para filtrar el estado "enviado" y sort descendente para anticipar demoras
db.Ordenes_compra.aggregate([
  { $match: { estado: "enviado" } },
  { $sort: { plazo_entrega_dias: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      id_orden: 1,
      fecha_emision: 1,
      plazo_entrega_dias: 1,
      id_proveedor: 1,
    },
  },
]);

// 4) Plazo maximo de espera por cada estado de orden
// Justificacion: Determina el tiempo limite de entrega agrupando por estado y utilizando el operador max sobre los dias de plazo
db.Ordenes_compra.aggregate([
  {
    $group: {
      _id: "$estado",
      plazo_maximo_espera: { $max: "$plazo_entrega_dias" },
    },
  },
  { $sort: { plazo_maximo_espera: -1 } },
]);

// 5) Conteo del total de ordenes emitidas por cada proveedor
// Justificacion: Mide el volumen de compras por cada proveedor agrupando por id_proveedor y sumando con sum
db.Ordenes_compra.aggregate([
  { $group: { _id: "$id_proveedor", total_ordenes: { $sum: 1 } } },
  { $sort: { total_ordenes: -1 } },
]);

// 6) Las ordenes enviadas con plazo de entrega de 3 dias o menos
// Justificacion: Filtra con match los envios mas rapidos
db.Ordenes_compra.aggregate([
  { $match: { estado: "enviado", plazo_entrega_dias: { $lte: 3 } } },
  { $sort: { plazo_entrega_dias: 1 } },
  {
    $project: { _id: 0, id_orden: 1, fecha_emision: 1, plazo_entrega_dias: 1 },
  },
]);

// 7) Plazo de entrega mas rapido ofrecido por cada proveedor
// Justificacion: Identifica cual es el tiempo minimo de respuesta por proveedor usando el operador min
db.Ordenes_compra.aggregate([
  {
    $group: {
      _id: "$id_proveedor",
      entrega_mas_rapida: { $min: "$plazo_entrega_dias" },
    },
  },
  { $sort: { entrega_mas_rapida: 1 } },
]);

// 8) Las 5 ordenes con plazos de entrega superiores a 5 dias
// Justificacion: Permite identificar y monitorear los pedidos que mas tardaran usando el filtro gt
db.Ordenes_compra.aggregate([
  { $match: { plazo_entrega_dias: { $gt: 5 } } },
  { $sort: { plazo_entrega_dias: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      id_orden: 1,
      estado: 1,
      plazo_entrega_dias: 1,
      id_proveedor: 1,
    },
  },
]);

// 9) Conteo de ordenes emitidas agrupadas por fecha de emision
// Justificacion: Permite analizar las compras diarias sumando la cantidad de ordenes generadas en cada fecha especifica
db.Ordenes_compra.aggregate([
  { $group: { _id: "$fecha_emision", ordenes_diarias: { $sum: 1 } } },
  { $sort: { ordenes_diarias: -1 } },
]);

// 10) Las 5 ordenes del proveedor 1 con menor plazo de entrega
// Justificacion: Filtra con match las ordenes de un proveedor especifico para evaluar sus tiempos de respuesta mas rapidos
db.Ordenes_compra.aggregate([
  { $match: { id_proveedor: 1 } },
  { $sort: { plazo_entrega_dias: 1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      id_orden: 1,
      fecha_emision: 1,
      plazo_entrega_dias: 1,
      estado: 1,
    },
  },
]);
