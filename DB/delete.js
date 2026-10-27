//  Eliminar los q usan debitoooo
const clienteIds = db.clientes.find({ tipo_pago: { $size: 1, $in: ["Debito"] } }).limit(50).map (c => c._id);
print(`Se borrarán ${clienteIds.length} clientes`);
db.Clientes.deleteMany({ _id: { $in: clienteIds } });

// eliminare a los q son de santiago, santiaguinos sorprendidos :o
const provIds = db.Proveedores.find({ "direccion.comuna": "Santiago" }).limit(50).map (p => p._id);
print(`Se borrarán ${provIds.length} proveedores`); 
db.Proveedores.deleteMany ({ _id: { $in: provIds } });

// eliminar las ultimas 100 categorías, por id xd
const catIds = db.Categorias.find({ id_categoria: { $gt: 400 } }).limit(50).map (c => c._id);
print(`Se borrarán ${catIds.length} categorías`);
db.Categorias.deleteMany ({ _id: { $in: catIds } });

// eliminar los productos que tienen stock critico osea 20 
const prodIds = db.Productos.find({ stock: {$lte : 20} }).limit(50).map (p => p._id);
print(`Se borrarán ${prodIds.length} productos`);
db.Productos.deleteMany ({_id: { $in : prodIds } });


// eliminar los pedidos que estan cancelados, no se que mas eliminar xd
const pedidosIds = db.Pedidos.find ({ estado :"cancelado" }).limit(50).map (p => p._id);
print(`Se borrarán ${pedidosIds.length} pedidos`);
db.Pedidos.deleteMany ({ _id: { $in : pedidosIds } });

// eliminar los que toman mas de una semana
const ordenesIds = db.Ordenes.find ({ plazo_entrega_dias : { $gte : 7 } }).limit(50).map (o => o._id);
print(`Se borrarán ${ordenesIds.length} órdenes`);
db.Ordenes.deleteMany ({ _id: { $in : ordenesIds } });



