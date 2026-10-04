import Categoria from "./Categoria.js";
import Produto from "./Produto.js";
import Pedido from "./Pedido.js";
import PedidoItem from "./PedidoItem.js";
import Mesa from "./Mesa.js";
import Comanda from "./Comanda.js";
import Estabelecimento from "./Estabelecimento.js";
import Usuario from "./Usuario.js";


Categoria.hasMany(Produto, {
    foreignKey: "categoriaId",
    as: "produtos",
});

Produto.belongsTo(Categoria, {
    foreignKey: "categoriaId",
    as: "categoria",
});

// Um pedido possui vários itens
Pedido.hasMany(PedidoItem, {
    foreignKey: "pedidoId",
    as: "itens",
});

// Cada item pertence a um pedido
PedidoItem.belongsTo(Pedido, {
    foreignKey: "pedidoId",
    as: "pedido",
});

// Cada item representa um produto
Produto.hasMany(PedidoItem, {
    foreignKey: "produtoId",
    as: "itensPedido",
});

// Cada item pertence a um produto
PedidoItem.belongsTo(Produto, {
    foreignKey: "produtoId",
    as: "produto",
});


// Uma mesa pode ter várias comandas
Mesa.hasMany(Comanda, {
    foreignKey: "mesaId",
    as: "comandas",
});

// Uma comanda pertence a uma mesa
Comanda.belongsTo(Mesa, {
    foreignKey: "mesaId",
    as: "mesa",
});

// Uma comanda pode ter vários pedidos
Comanda.hasMany(Pedido, {
    foreignKey: "comandaId",
    as: "pedidos",
});

// Um pedido pode pertencer a uma comanda
Pedido.belongsTo(Comanda, {
    foreignKey: "comandaId",
    as: "comanda",
});

// Um estabelecimento pode ter vários usuários
Estabelecimento.hasMany(Usuario, {
    foreignKey: "estabelecimentoId",
    as: "usuarios",
});

// Um usuário pode pertencer a um estabelecimento
Usuario.belongsTo(Estabelecimento, {
    foreignKey: "estabelecimentoId",
    as: "estabelecimento",
});

// ========================================
// ESTABELECIMENTO -> CATEGORIAS
// ========================================

Estabelecimento.hasMany(Categoria, {
    foreignKey: "estabelecimentoId",
    as: "categorias",
});

Categoria.belongsTo(Estabelecimento, {
    foreignKey: "estabelecimentoId",
    as: "estabelecimento",
});

// ========================================
// ESTABELECIMENTO -> PRODUTOS
// ========================================

Estabelecimento.hasMany(Produto, {
    foreignKey: "estabelecimentoId",
    as: "produtos",
});

Produto.belongsTo(Estabelecimento, {
    foreignKey: "estabelecimentoId",
    as: "estabelecimento",
});

// ========================================
// ESTABELECIMENTO -> MESAS
// ========================================

Estabelecimento.hasMany(Mesa, {
    foreignKey: "estabelecimentoId",
    as: "mesas",
});

Mesa.belongsTo(Estabelecimento, {
    foreignKey: "estabelecimentoId",
    as: "estabelecimento",
});

// ========================================
// ESTABELECIMENTO -> COMANDAS
// ========================================

Estabelecimento.hasMany(Comanda, {
    foreignKey: "estabelecimentoId",
    as: "comandas",
});

Comanda.belongsTo(Estabelecimento, {
    foreignKey: "estabelecimentoId",
    as: "estabelecimento",
});

// ========================================
// ESTABELECIMENTO -> PEDIDOS
// ========================================

Estabelecimento.hasMany(Pedido, {
    foreignKey: "estabelecimentoId",
    as: "pedidos",
});

Pedido.belongsTo(Estabelecimento, {
    foreignKey: "estabelecimentoId",
    as: "estabelecimento",
});



export {
    Categoria,
    Produto,
    Pedido,
    PedidoItem,
    Mesa,
    Comanda,
    Estabelecimento,
    Usuario,
};