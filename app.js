//eccomerce fictico restfull api
const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

let data = {
    customers: [],
    products: [],
    orders: []
};

// Rota para obter todos os clientes
app.get('/customers', (req, res) => {
    res.json(data.customers);
});

// Rota para adicionar um novo cliente
app.post('/customers', (req, res) => {
    let newCustomer = req.body;
    newCustomer.id = data.customers.length; // Atribui o ID com base no índice
    data.customers.push(newCustomer);
    res.status(201).json({ "new_customer_id": newCustomer.id });
});

// Rota para obter todos os produtos
app.get('/products', (req, res) => {
    res.json(data.products);
});

// Rota para adicionar um novo produto
app.post('/products', (req, res) => {
    let newProduct = req.body;
    newProduct.id = data.products.length; // Atribui o ID com base no índice
    data.products.push(newProduct);
    res.status(201).json({ "new_product_id": newProduct.id });
});

// Rota para obter um produto específico pelo ID
app.get('/products/:id', (req, res) => {
    let productId = parseInt(req.params.id);
    let product = data.products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

// Rota para atualizar os dados de um produto pelo ID
app.put('/products/:id', (req, res) => {
    let productId = parseInt(req.params.id);
    let index = data.products.findIndex(p => p.id === productId);

    if (index !== -1) {
        data.products[index] = { ...data.products[index], ...req.body };
        res.json(data.products[index]);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

// Rota para remover um produto pelo ID
app.delete('/products/:id', (req, res) => {
    let productId = parseInt(req.params.id);
    let index = data.products.findIndex(p => p.id === productId);

    if (index !== -1) {
        data.products.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

// Rota para criar um pedido
app.post('/orders', (req, res) => {
    let newOrder = req.body;
    newOrder.id = data.orders.length; // Atribui o ID com base no índice
    data.orders.push(newOrder);
    res.status(201).json({ "new_order_id": newOrder.id });
});

// Rota para obter todos os pedidos
app.get('/orders', (req, res) => {
    res.json(data.orders);
});

// Rota para obter um pedido específico pelo ID
app.get('/orders/:id', (req, res) => {
    let orderId = parseInt(req.params.id);
    let order = data.orders.find(o => o.id === orderId);

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Pedido não encontrado' });
    }
});

// Inicializa o servidor
app.listen(port, () => {
    console.log('Servidor de e-commerce ouvindo na porta: ' + port);
});
