const oracledb = require("oracledb");
const dbConfig = require("../config/dbconfig");

const sql =
  "UPDATE EMPLOYEE SET FIRST_NAME = :newname WHERE FIRST_NAME = :firstname";

exports.update = async ({ newname, firstname }, fn) => {
  let connection;
  const user = { newname, firstname };
  console.log(user);
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql, user, { autoCommit: true });

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
