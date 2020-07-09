const db = require('../index');

module.exports.getById = async (id) =>{
    try{
return await db.query("SELECT * FROM users WHERE id = $1", [id])
    }catch (error) {
        return {error: error.message}
    }
}
