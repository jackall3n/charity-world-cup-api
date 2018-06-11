export default {
    database: {
        address: process.env.DB_STRING
    },
    auth: {
        secret: process.env.JWT_SECRET
    }
}