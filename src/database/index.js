const mongoose = require("mongoose");

/* ====FUNCION QUE INSTANCIA LA CONEXION BASE DE DATOS===*/

class Database {
  constructor() {
    (async () => {
      try {
        //conexion con la base datos
        const connection = await mongoose.connect("mongodb://localhost:27017");
        // console.log('THIS IS THE CONNECTION', connection)
        // <db>://<host>:<port>@<user>:<password>/<db_name>
        return console.log(
          "db is ready, from database/index.js CONSTRUCTOR==>"
        );
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    })();
  }
}
// Singleton importante si no se puede romper la base de datos con la cantidad de conexiones.

module.exports = new Database();
