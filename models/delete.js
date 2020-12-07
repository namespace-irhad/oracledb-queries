const oracledb = require("oracledb");
const dbConfig = require("../config/dbconfig");

const sql = "DELETE FROM EMPLOYEE WHERE person_id = :id";

exports.run = async ({ id }, fn) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql, [id], { autoCommit: true });

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
