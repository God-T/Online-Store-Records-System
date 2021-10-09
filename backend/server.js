const express = require("express");
const db = require("./DB/dbHelpers"); // get db helper
const cors = require("cors");
// init server
const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(
        `\n*** Records db server running on http://localhost:${PORT} ***\n`
    );
});

// server greetings
server.get("/", (req, res) => {
    res.json({ message: "Online store records database APIs were connected!" });
});

//get all customers
server.get("/api/customer/all", (_, res) => {
    db.getCustomers()
        .then(customers => {
            if (customers) {
                res.status(200).json(customers);
            } else {
                res.status(404).json({
                    Message: `No record of any customers.`,
                });
            }
        })
        .catch(e => {
            res.status(500).json({
                Message: `Unable to get customers.`,
                Error: e,
            });
        });
});
//get all products
server.get("/api/product/all", (_, res) => {
    db.getProducts()
        .then(products => {
            if (products) {
                res.status(200).json(products);
            } else {
                res.status(404).json({ Message: `No record of any products.` });
            }
        })
        .catch(e => {
            res.status(500).json({
                Message: `Unable to get products.`,
                Error: e,
            });
        });
});
//get all purchases
server.get("/api/purchase/all", (_, res) => {
    db.getPurchases()
        .then(purchases => {
            if (purchases) {
                res.status(200).json(purchases);
            } else {
                res.status(404).json({
                    Message: `No record of any purchases.`,
                });
            }
        })
        .catch(e => {
            res.status(500).json({
                Message: `Unable to get purchases.`,
                Error: e,
            });
        });
});
//get customers by id
server.get("/api/customer/:customer_id", (req, res) => {
    const { customer_id } = req.params;
    db.getCustomerbyID(customer_id)
        .then(customer => {
            if (customer) {
                res.status(200).json(customer);
            } else {
                res.status(404).json({
                    Message: `No record of customer ${customer_id}`,
                });
            }
        })
        .catch(e => {
            res.status(500).json({
                Message: `Unable to get customer ${customer_id}`,
                Error: e,
            });
        });
});
//get products by id
server.get("/api/product/:product_id", (req, res) => {
    const { product_id } = req.params;
    db.getProductbyID(product_id)
        .then(product => {
            if (product) {
                res.status(200).json(product[0]);
            } else {
                res.status(404).json({
                    Message: `No record of product ${product_id}`,
                });
            }
        })
        .catch(e => {
            res.status(500).json({
                Message: `Unable to get product ${product_id}`,
                Error: e,
            });
        });
});
//get purchases by customers id
server.get("/api/purchase", (req, res) => {
    const { customer_id, product_id } = req.query;
    if (customer_id) {
        db.getPurchasesbyCustomer_id(customer_id)
            .then(purchases => {
                if (purchases) {
                    res.status(200).json(purchases);
                } else {
                    res.status(404).json({
                        Message: `No record of purchases with product ${customer_id}`,
                    });
                }
            })
            .catch(e => {
                res.status(500).json({
                    Message: `Unable to get purchases with product ${customer_id}`,
                    Error: e,
                });
            });
    } else {
        db.getPurchasesbyProduct_id(product_id)
            .then(purchases => {
                if (purchases) {
                    res.status(200).json(purchases);
                } else {
                    res.status(404).json({
                        Message: `No record of purchases with product ${product_id}`,
                    });
                }
            })
            .catch(e => {
                res.status(500).json({
                    Message: `Unable to get purchases with product ${product_id}`,
                    Error: e,
                });
            });
    }
});

//add customers
server.post("/api/customer/add", (req, res) => {
    db.addCustomer(req.body)
        .then(id => {
            res.status(200).json({
                Message: `Add customer ${id} successfully`,
            });
        })
        .catch(e => {
            res.status(500).json({
                Message: "Add customer failed",
                Error: e,
            });
        });
});
//add products
server.post("/api/product/add", (req, res) => {
    db.addProduct(req.body)
        .then(id => {
            res.status(200).json({
                Message: `Add product ${id} successfully`,
            });
        })
        .catch(e => {
            res.status(500).json({
                Message: "Add product failed",
                Error: e,
            });
        });
});
//add purchases
server.post("/api/purchase/add", (req, res) => {
    // assume product/customer id valid
    db.addPurchase(req.body)
        .then(() => {
            res.status(200).json({
                Message: `Add purchase of cusmtomer ${req.body.customer_id} with product ${req.body.product_id} and successfully`,
            });
        })
        .catch(e => {
            res.status(500).json({
                Message: `Add purchase of cusmtomer ${req.body.customer_id} with product ${req.body.product_id} failed`,
                Error: e,
            });
        });
});

//delete customer by id && delete all purchases of customer.
server.delete("/api/customer/delete", (req, res) => {
    const { customer_id } = req.body;
    db.deleteCustomer(customer_id)
        .then(id => {
            if (id) {
                res.status(200).json({
                    Message: `Delete cusmtomer ${customer_id} and customer's purchases successfully`,
                });
            } else {
                res.status(404).json({
                    Message: `No record of customer ${customer_id}`,
                });
            }
        })
        .catch(e => {
            res.status(500).json({
                Message: `Unable to delete customer ${customer_id}`,
                Error: e,
            });
        });
});
//delete product by id && delete all purchases of product.
server.delete("/api/product/delete", (req, res) => {
    const { product_id } = req.body;
    db.deleteProduct(product_id)
        .then(id => {
            if (id) {
                res.status(200).json({
                    Message: `Delete product ${product_id} and related purchases successfully`,
                });
            } else {
                res.status(404).json({
                    Message: `No record of product ${product_id}`,
                });
            }
        })
        .catch(e => {
            res.status(500).json({
                Message: `Unable to delete product ${product_id}`,
                Error: e,
            });
        });
});
// delete purchase by ids
server.delete("/api/purchase/delete/withids", (req, res) => {
    const { customer_id, product_id } = req.body;
    db.deletePurchasebyIDs(customer_id, product_id)
        .then(id => {
            if (id) {
                res.status(200).json({
                    Message: `Delete purchases of cusmtomer ${customer_id} with product ${product_id} and successfully`,
                });
            } else {
                res.status(404).json({
                    Message: `No record of purchases of cusmtomer ${customer_id} with product ${product_id}`,
                });
            }
        })
        .catch(e => {
            res.status(500).json({
                Message: `Unable to delete purchases of cusmtomer ${customer_id} with product ${product_id}`,
                Error: e,
            });
        });
});

// delete purchase by id
server.delete("/api/purchase/delete", (req, res) => {
    const { id } = req.body;
    db.deletePurchasebyPurchaseID(id)
        .then(id => {
            if (id) {
                res.status(200).json({
                    Message: `Delete purchases ${id} successfully`,
                });
            } else {
                res.status(404).json({
                    Message: `No record of purchases ${id}`,
                });
            }
        })
        .catch(e => {
            res.status(500).json({
                Message: `Unable to delete purchases ${id}`,
                Error: e,
            });
        });
});
