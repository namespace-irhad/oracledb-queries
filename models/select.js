const oracledb = require("oracledb");
const dbConfig = require("../config/dbconfig");

const sql = "SELECT * FROM EMPLOYEE";

exports.run = async (fn) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql);

    fn(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
