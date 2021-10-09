// Make changes of the tables
exports.up = function (knex) {
    return knex.schema
        .createTable("customers", table => {
            table.increments("id").primary();
            table.string("name");
            table.string("contact");
        })

        .createTable("products", table => {
            table.increments("id").primary();
            table.string("name");
            table.float("price");
        })
        .createTable("purchases", table => {
            table.increments("id").primary();
            table
                .integer("customer_id")
                .notNullable()
                .references("id")
                .inTable("customers")
                .onDelete("CASCADE"); // foreign key to customers table
            table
                .integer("product_id")
                .notNullable()
                .references("id")
                .inTable("products")
                .onDelete("CASCADE"); // foreign key to products table
        });
};

// Undo changes of the tables
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("purchases")
        .dropTableIfExists("products")
        .dropTableIfExists("customers");
};
