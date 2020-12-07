const oracledb = require("oracledb");
const dbConfig = require("../config/dbconfig");

const sql =
  "INSERT INTO EMPLOYEE VALUES(T1_SEQ.nextval, :firstname, :lastname)";

exports.insert = async ({ firstname, lastname }, fn) => {
  let connection;
  const user = { firstname, lastname };
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

exports.insertMany = async (user, fn) => {
  const options = {
    autoCommit: true,
    bindDefs: {
      firstname: { type: oracledb.STRING, maxSize: 15 },
      lastname: { type: oracledb.STRING, maxSize: 15 },
    },
  };

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.executeMany(sql, user, options);

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
