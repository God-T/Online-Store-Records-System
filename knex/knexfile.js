// Update with your config settings.
//mysql://b1cad0480149e1:635c550a@us-cdbr-east-04.cleardb.com/heroku_e0a6221866f09c1?reconnect=true

module.exports = {
    development: {
        client: "mysql",
        connection: {
            host: "us-cdbr-east-04.cleardb.com",
            user: "b1cad0480149e1",
            password: "635c550a",
            database: "heroku_e0a6221866f09c1",
        },
    },
};
