const knex = require("knex");
const config = require("../knexfile"); // get knex config
const db = knex(config.development); // get db

module.exports = {
    getCustomers,
    getProducts,
    getCustomerbyID,
    getProductbyID,
    getPurchasesbyCustomer_id,
    getPurchasesbyProduct_id,
    addCustomer,
    addProduct,
    addPurchase,
    getPurchases,
    deleteCustomer,
    deleteProduct,
    deletePurchasesbyProductID,
    deletePurchasesbyCustomerID,
    deletePurchasebyIDs,
    deletePurchasebyPurchaseID,
};

function getCustomers() {
    return db("customers");
}

function getProducts() {
    return db("products");
}

function getPurchases() {
    return db("purchases");
}

function getCustomerbyID(id) {
    return db("customers").where({ id });
}

function getProductbyID(id) {
    return db("products").where({ id });
}

function getPurchasesbyCustomer_id(customer_id) {
    return db("purchases").where({ customer_id });
}

function getPurchasesbyProduct_id(product_id) {
    return db("purchases").where({ product_id });
}

async function addCustomer(c) {
    const [id] = await db("customers").insert(c);
    return id;
}

async function addProduct(p) {
    const [id] = await db("products").insert(p);
    return id;
}

async function addPurchase(p) {
    const [id] = await db("purchases").insert(p);
    return id;
}

function deleteCustomer(id) {
    return db("customers").where({ id }).del();
}

function deleteProduct(id) {
    return db("products").where({ id }).del();
}

function deletePurchasesbyProductID(product_id) {
    return db("purchases").where({ product_id }).del();
}

function deletePurchasesbyCustomerID(customer_id) {
    return db("purchases").where({ customer_id }).del();
}

function deletePurchasebyIDs(customer_id, product_id) {
    return db("purchases").where({ customer_id, product_id }).del();
}

function deletePurchasebyPurchaseID(id) {
    return db("purchases").where({ id }).del();
}

// //Doc:
// //in use
// async function addDocument(document) {
//   const [id] = await db("document").insert(document);
//   return id;
// }

// //in use
// function getDocumentsbyCertification(certification_id) {
//   return db("document").where({ certification_id });
// }

// //in use
// function getDocumentbyHash(hash_value) {
//   return db("document").where({ hash_value }).first();
// }

// function getDocuments() {
//   return db("document");
// }

// //Certification:
// //in use
// async function addCertification(certifier) {
//   const [id] = await db("certification").insert(certifier);
//   return id;
// }

// //in use
// function getCertificationbyID(id) {
//   return db("certification").where({ id }).first();
// }

// function getCertifications() {
//   return db("certification");
// }

// Users
//in use
async function addUser(user) {
    const [id] = await db("user").insert(user);
    return id;
}

//in use
function getUserbyID(id_address) {
    return db("user").where({ id_address }).first();
}

// function deleteUserbyID(id_address) {
//   return db("user").where({ id_address }).del();
// }

// function updateUserbyID(id_address, changes) {
//   return db("user").where({ id_address }).update(changes, [id_address]);
// }
