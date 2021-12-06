'use strict';
const { sql, poolPromise }  = require('./../../config/db.config');

//
const User = function(user){
  this.firstname     = User.firstname;
  this.lastname      = User.lastname;
  this.email         = User.email;
  this.password      = User.password;
};

User.create = async function (newuser, result) {
const sqlQuery = 'insert into users values (@username, @firstname, @lastname, @email, @accPassword)';
  try {
    const pool = await poolPromise;
      const res = await pool.request()
        .input('username', sql.VarChar, newuser.username)
        .input('firstname', sql.VarChar , newuser.firstname)
        .input('lastname', sql.VarChar , newuser.lastname)
        .input('email', sql.VarChar , newuser.email)
        .input('accPassword', sql.VarChar, newuser.password)
        .query(sqlQuery);
    console.log(res);
    result(null, res);
  } catch(err) {
    console.log('error: ', err);
    result(err, null);
  }
};

User.findById = async function (details, result) {
  const sqlQuery = 'select * from users where email = @email and accPassword = @password';
  try {
    const pool = await poolPromise;
      const data = await pool.request()
          .input('email', sql.VarChar, details.email)
          .input('password', sql.VarChar,details.password)
          .query(sqlQuery);
    const resultSet = JSON.stringify(data.recordset);
    console.log('rs.firstname---'+resultSet);
    result(null, data.recordset);
  } catch (err) {
    console.log('error: ', err);
    result(err, null);
  }
};

User.findAll = async function (result) {

};

User.getSample = async function (hnum, result) {
  console.log('hnum----'+hnum);
  //const sqlQuery = 'select HOUSEHOLDS.HSHD_NUM, BASKET_NUM, PURCHASE_DATE, PRODUCTS.PRODUCT_NUM, DEPARTMENT, COMMODITY, SPEND, UNITS, STORE_REGION, WEEK_NUM, YEAR, LOYALTY_FLAG, AGE_RANGE, MARITAL_STATUS, INCOME_RANGE, HOMEOWNER_DESC, HSHD_COMPOSITION, HH_SIZE, CHILDREN FROM HOUSEHOLDS, TRANSACTIONS, PRODUCTS WHERE HOUSEHOLDS.HSHD_NUM = 10 AND HOUSEHOLDS.HSHD_NUM = TRANSACTIONS.HSHD_NUM AND TRANSACTIONS.PRODUCT_NUM = PRODUCTS.PRODUCT_NUM';
  const sqlQuery = 'select HOUSEHOLDS1.HSHD_NUM, BASKET_NUM, PURCHASE_DATE, PRODUCTS1.PRODUCT_NUM, DEPARTMENT, COMMODITY, SPEND, UNITS, STORE_REGION, WEEK_NUM, YEAR, LOYALTY_FLAG, AGE_RANGE, MARITAL_STATUS, INCOME_RANGE, HOMEOWNER_DESC, HSHD_COMPOSITION, HH_SIZE, CHILDREN FROM HOUSEHOLDS1, TRANSACTIONS1, PRODUCTS1 WHERE HOUSEHOLDS1.HSHD_NUM = 10 AND HOUSEHOLDS1.HSHD_NUM = TRANSACTIONS1.HSHD_NUM AND TRANSACTIONS1.PRODUCT_NUM = PRODUCTS1.PRODUCT_NUM'; 
  try {
      const pool = await poolPromise;
      const data = await pool.request()
      .input('hnum', sql.VarChar , hnum)
      .query(sqlQuery);
      const rs = JSON.stringify(data.recordset);
      console.log('rs.firstname---'+rs);
      result(null, data.recordset);
    } catch (err) {
      console.log('error: ', err);
      result(err, null);
    }
  };

  User.getAgeRangeData = async function (req, result) {
    //const sqlQuery = 'select AGE_RANGE, YEAR, SUM(SPEND) AS SPENT FROM HOUSEHOLDS,TRANSACTIONS WHERE HOUSEHOLDS.HSHD_NUM = TRANSACTIONS.HSHD_NUM GROUP BY AGE_RANGE, YEAR ORDER BY YEAR, AGE_RANGE'
    const sqlQuery = 'select AGE_RANGE, YEAR, SUM(SPEND) AS SPENT FROM HOUSEHOLDS1,TRANSACTIONS1 WHERE HOUSEHOLDS1.HSHD_NUM = TRANSACTIONS1.HSHD_NUM GROUP BY AGE_RANGE, YEAR ORDER BY YEAR, AGE_RANGE'
    try {
        const pool = await poolPromise;    
        const data = await pool.request()
        .query(sqlQuery);
        result(null, data.recordset);
      } catch (err) {
        console.log('error: ', err);
        result(err, null);
      }
    };

User.getHshdSizeData = async function (req, result) {
      //const sqlQuery = 'select HH_SIZE, YEAR, SUM(SPEND) AS SPENT FROM HOUSEHOLDS,TRANSACTIONS WHERE HOUSEHOLDS.HSHD_NUM = TRANSACTIONS.HSHD_NUM GROUP BY HH_SIZE, YEAR';
      const sqlQuery = 'select HH_SIZE, YEAR, SUM(SPEND) AS SPENT FROM HOUSEHOLDS1,TRANSACTIONS1 WHERE HOUSEHOLDS1.HSHD_NUM = TRANSACTIONS1.HSHD_NUM GROUP BY HH_SIZE, YEAR';  
      try {
          const pool = await poolPromise;
          const data = await pool.request()
          .query(sqlQuery);
          const rs = JSON.stringify(data.recordset);
          console.log('cdata---'+rs);
          result(null, data.recordset);
        } catch (err) {
          console.log('error: ', err);
          result(err, null);
        }
 };

User.getMaritalData = async function (req, result) {
      //const sqlQuery = 'select MARITAL_STATUS, YEAR, SUM(SPEND) AS SPENT FROM HOUSEHOLDS,TRANSACTIONS WHERE HOUSEHOLDS.HSHD_NUM = TRANSACTIONS.HSHD_NUM GROUP BY MARITAL_STATUS, YEAR';
      const sqlQuery = 'select MARITAL_STATUS, YEAR, SUM(SPEND) AS SPENT FROM HOUSEHOLDS1,TRANSACTIONS1 WHERE HOUSEHOLDS1.HSHD_NUM = TRANSACTIONS1.HSHD_NUM GROUP BY MARITAL_STATUS, YEAR'; 
      try {
            const pool = await poolPromise;
            const data = await pool.request()
            .query(sqlQuery);
            const rs = JSON.stringify(data.recordset);
            console.log('getMaritalData---'+rs);
            result(null, data.recordset);
          } catch (err) {
            console.log('error: ', err);
            result(err, null);
          }
};

User.getWeekData = async function (req, result) {
       // const sqlQuery = 'select HH_SIZE, YEAR, SUM(SPEND) AS SPENT FROM HOUSEHOLDS,TRANSACTIONS WHERE HOUSEHOLDS.HSHD_NUM = TRANSACTIONS.HSHD_NUM GROUP BY HH_SIZE, YEAR';
       const sqlQuery = 'select HH_SIZE, YEAR, SUM(SPEND) AS SPENT FROM HOUSEHOLDS1,TRANSACTIONS1 WHERE HOUSEHOLDS1.HSHD_NUM = TRANSACTIONS1.HSHD_NUM GROUP BY HH_SIZE, YEAR';  
       try {
              const pool = await poolPromise;
              const data = await pool.request()
              .query(sqlQuery);
              const rs = JSON.stringify(data.recordset);
              console.log('getWeekData---'+rs);
              result(null, data.recordset);
            } catch (err) {
              console.log('error: ', err);
              result(err, null);
            }
};

User.getIncomeRangeData = async function (req, result) {
  //const sqlQuery = 'select HH_SIZE, YEAR, SUM(SPEND) AS SPENT FROM HOUSEHOLDS,TRANSACTIONS WHERE HOUSEHOLDS.HSHD_NUM = TRANSACTIONS.HSHD_NUM GROUP BY HH_SIZE, YEAR';
  const sqlQuery = 'select HH_SIZE, YEAR, SUM(SPEND) AS SPENT FROM HOUSEHOLDS1,TRANSACTIONS1 WHERE HOUSEHOLDS1.HSHD_NUM = TRANSACTIONS1.HSHD_NUM GROUP BY HH_SIZE, YEAR';
      
  try {
                const pool = await poolPromise;
                const data = await pool.request()
                .query(sqlQuery);
                const rs = JSON.stringify(data.recordset);
                console.log('getIncomeRangeData---'+rs);
                result(null, data.recordset);
              } catch (err) {
                console.log('error: ', err);
                result(err, null);
              }
};

User.findByHnum = async function (hnum, result) {
  //const sqlQuery = 'select HOUSEHOLDS.HSHD_NUM, BASKET_NUM, PURCHASE_DATE, PRODUCTS.PRODUCT_NUM, DEPARTMENT, COMMODITY, SPEND, UNITS, STORE_REGION, WEEK_NUM, YEAR, LOYALTY_FLAG, AGE_RANGE, MARITAL_STATUS, INCOME_RANGE, HOMEOWNER_DESC, HSHD_COMPOSITION, HH_SIZE, CHILDREN FROM HOUSEHOLDS, TRANSACTIONS, PRODUCTS WHERE HOUSEHOLDS.HSHD_NUM = @hnum AND HOUSEHOLDS.HSHD_NUM = TRANSACTIONS.HSHD_NUM AND TRANSACTIONS.PRODUCT_NUM = PRODUCTS.PRODUCT_NUM ORDER BY HOUSEHOLDS.HSHD_NUM, BASKET_NUM, PURCHASE_DATE, PRODUCTS.PRODUCT_NUM, DEPARTMENT, COMMODITY';
  const sqlQuery = 'select HOUSEHOLDS1.HSHD_NUM, BASKET_NUM, PURCHASE_DATE, PRODUCTS1.PRODUCT_NUM, DEPARTMENT, COMMODITY, SPEND, UNITS, STORE_REGION, WEEK_NUM, YEAR, LOYALTY_FLAG, AGE_RANGE, MARITAL_STATUS, INCOME_RANGE, HOMEOWNER_DESC, HSHD_COMPOSITION, HH_SIZE, CHILDREN FROM HOUSEHOLDS1, TRANSACTIONS1, PRODUCTS1 WHERE HOUSEHOLDS1.HSHD_NUM = @hnum AND HOUSEHOLDS1.HSHD_NUM = TRANSACTIONS1.HSHD_NUM AND TRANSACTIONS1.PRODUCT_NUM = PRODUCTS1.PRODUCT_NUM ORDER BY HOUSEHOLDS1.HSHD_NUM, BASKET_NUM, PURCHASE_DATE, PRODUCTS1.PRODUCT_NUM, DEPARTMENT, COMMODITY';  
  try {
      const pool = await poolPromise;
      const data = await pool.request()
      .input('hnum', sql.VarChar , hnum)
      .query(sqlQuery);
      result(null, data.recordset);
    } catch (err) {
      console.log('error: ', err);
      result(err, null);
    }
};

User.getAllData = async function (req, result) {
  //const sqlQuery = 'WITH R1 AS (SELECT TOP 10000 * FROM TRANSACTIONS ORDER BY HSHD_NUM ASC), R2 AS (SELECT HSHD_NUM, BASKET_NUM, PURCHASE_DATE, PRODUCTS.PRODUCT_NUM, DEPARTMENT, COMMODITY, SPEND, UNITS, STORE_REGION, WEEK_NUM,YEAR FROM R1 INNER JOIN PRODUCTS ON R1.PRODUCT_NUM = PRODUCTS.PRODUCT_NUM) SELECT HOUSEHOLDS.HSHD_NUM, BASKET_NUM, PURCHASE_DATE, PRODUCT_NUM, DEPARTMENT, COMMODITY, SPEND, UNITS, STORE_REGION, WEEK_NUM,YEAR, LOYALTY_FLAG, AGE_RANGE, MARITAL_STATUS, INCOME_RANGE, HOMEOWNER_DESC, HSHD_COMPOSITION, HH_SIZE, CHILDREN FROM R2 INNER JOIN HOUSEHOLDS ON HOUSEHOLDS.HSHD_NUM = R2.HSHD_NUM';
  const sqlQuery = 'WITH R1 AS (SELECT TOP 10000 * FROM TRANSACTIONS ORDER BY HSHD_NUM ASC), R2 AS (SELECT HSHD_NUM, BASKET_NUM, PURCHASE_DATE, PRODUCTS.PRODUCT_NUM, DEPARTMENT, COMMODITY, SPEND, UNITS, STORE_REGION, WEEK_NUM,YEAR FROM R1 INNER JOIN PRODUCTS ON R1.PRODUCT_NUM = PRODUCTS.PRODUCT_NUM) SELECT HOUSEHOLDS1.HSHD_NUM, BASKET_NUM, PURCHASE_DATE, PRODUCT_NUM, DEPARTMENT, COMMODITY, SPEND, UNITS, STORE_REGION, WEEK_NUM,YEAR, LOYALTY_FLAG, AGE_RANGE, MARITAL_STATUS, INCOME_RANGE, HOMEOWNER_DESC, HSHD_COMPOSITION, HH_SIZE, CHILDREN FROM R2 INNER JOIN HOUSEHOLDS1 ON HOUSEHOLDS1.HSHD_NUM = R2.HSHD_NUM';    
  try {
        const pool = await poolPromise;
        const data = await pool.request()
        .query(sqlQuery);
        result(null, data.recordset);
      } catch (err) {
        console.log('error: ', err);
        result(err, null);
      }
};

User.uploadHouseholds = async function (headers, hjson, response) {
      try {
        const pool = await poolPromise;
        const table = new sql.Table('HOUSEHOLDS1');
        table.columns.add('HSHD_NUM', sql.Int, {nullable: true});
        table.columns.add('LOYALTY_FLAG', sql.Bit, {nullable: true});
        table.columns.add('AGE_RANGE', sql.NVarChar(250), {nullable: true});
        table.columns.add('MARITAL_STATUS', sql.NVarChar(50), {nullable: true});
        table.columns.add('INCOME_RANGE', sql.NVarChar(250), {nullable: true});
        table.columns.add('HOMEOWNER_DESC', sql.NVarChar(50), {nullable: true});
        table.columns.add('HSHD_COMPOSITION', sql.NVarChar(50), {nullable: true});
        table.columns.add('HH_SIZE', sql.NVarChar(250), {nullable: true});
        table.columns.add('CHILDREN', sql.NVarChar(50), {nullable: true});
        
        hjson.forEach(function(jobj) {
          const hnum = (jobj[headers[0]] != null) ? jobj[headers[0]].trim() : jobj[headers[0]];
          const lf = (jobj[headers[1]] != null) ? jobj[headers[1]].trim() : jobj[headers[1]];
          const ar = (jobj[headers[2]] != null) ? jobj[headers[2]].trim() : jobj[headers[2]];
          const ms = (jobj[headers[3]] != null) ? jobj[headers[3]].trim() : jobj[headers[3]];
          const ir = (jobj[headers[4]] != null) ? jobj[headers[4]].trim() : jobj[headers[4]];
          const hd = (jobj[headers[5]] != null) ? jobj[headers[5]].trim() : jobj[headers[5]];
          const hc = (jobj[headers[6]] != null) ? jobj[headers[6]].trim() : jobj[headers[6]];
          const hs = (jobj[headers[7]] != null) ? jobj[headers[7]].trim() : jobj[headers[7]];
          const ch = (jobj[headers[8]] != null) ? jobj[headers[8]].trim() : jobj[headers[8]];
          table.rows.add(hnum, lf, ar, ms, ir, hd, hc, hs, ch);
        });
        const res = await pool.request()
        .bulk(table, function(err, result) {
          if (err){
            console.log("Households insertion failed-"+err);
            response("Error during executing a query: " + err, null);
          } else {
            console.log(res);
            console.log("Households insertion completed");
            response(null, result);
          }
        });
       } catch(err) {
        console.log('error: ', err);
        response(err, null);
      }
};

User.uploadTransactions = async function (headers, hjson, response) {
      try {
        const pool = await poolPromise;
        const table = new sql.Table('TRANSACTIONS1');
        table.columns.add('HSHD_NUM', sql.Int, {nullable: true});
        table.columns.add('BASKET_NUM', sql.Int, {nullable: true});
        table.columns.add('PURCHASE_DATE', sql.Date, {nullable: true});
        table.columns.add('PRODUCT_NUM', sql.Int, {nullable: true});
        table.columns.add('SPEND', sql.Float, {nullable: true});
        table.columns.add('UNITS', sql.SmallInt, {nullable: true});
        table.columns.add('STORE_REGION', sql.NVarChar(50), {nullable: true});
        table.columns.add('WEEK_NUM', sql.TinyInt, {nullable: true});
        table.columns.add('YEAR', sql.SmallInt, {nullable: true});
        
        hjson.forEach(function(jobj) {
          const hnum = (jobj[headers[0]] != null) ? jobj[headers[0]].trim() : jobj[headers[0]];
          const bn = (jobj[headers[1]] != null) ? jobj[headers[1]].trim() : jobj[headers[1]];
          const pd = (jobj[headers[2]] != null) ? jobj[headers[2]].trim() : jobj[headers[2]];
          const pnum = (jobj[headers[3]] != null) ? jobj[headers[3]].trim() : jobj[headers[3]];
          const sp = (jobj[headers[4]] != null) ? jobj[headers[4]].trim() : jobj[headers[4]];
          const un = (jobj[headers[5]] != null) ? jobj[headers[5]].trim() : jobj[headers[5]];
          const sr = (jobj[headers[6]] != null) ? jobj[headers[6]].trim() : jobj[headers[6]];
          const wnum = (jobj[headers[7]] != null) ? jobj[headers[7]].trim() : jobj[headers[7]];
          const yr = (jobj[headers[8]] != null) ? jobj[headers[8]].trim() : jobj[headers[8]];
          table.rows.add(hnum, bn, pd, pnum, sp, un, sr, wnum, yr);
        });
        const res = await pool.request()
        .bulk(table, function(err, result) {
          if (err){
            console.log("Transactions insertion failed-"+err);
            response("Error during executing a query: " + err, null);
          } else {
            console.log(res);
            console.log("Transactions insertion completed");
            response(null, result);
          }
        });
      } catch(err) {
        console.log('error: ', err);
        response(err, null);
      }
};

User.uploadProducts = async function (headers, hjson, response) {
      try {;
        const pool = await poolPromise;
        const table = new sql.Table('PRODUCTS1');
        table.columns.add('PRODUCT_NUM', sql.Int, {nullable: false});
        table.columns.add('DEPARTMENT', sql.NVarChar(50), {nullable: true});
        table.columns.add('COMMODITY', sql.NVarChar(50), {nullable: true});
        table.columns.add('BRAND_TY', sql.NVarChar(50), {nullable: true});
        table.columns.add('NATURAL_ORGANIC_FLAG', sql.NVarChar(50), {nullable: true});
        
        hjson.forEach(function(jobj) {
          const pnum = (jobj[headers[0]] != null) ? jobj[headers[0]].trim() : jobj[headers[0]];
          const dp = (jobj[headers[1]] != null) ? jobj[headers[1]].trim() : jobj[headers[1]];
          const co = (jobj[headers[2]] != null) ? jobj[headers[2]].trim() : jobj[headers[2]];
          const bt = (jobj[headers[3]] != null) ? jobj[headers[3]].trim() : jobj[headers[3]];
          const nof = (jobj[headers[4]] != null) ? jobj[headers[4]].trim() : jobj[headers[4]];
         
          table.rows.add(pnum, dp, co, bt, nof);
        });
        const res = await pool.request()
        .bulk(table, function(err, result) {
          if (err){
              console.log("product insertion failed-"+err);
              response("Error during executing a query: " + err, null);
          } else {
            console.log(res);
            console.log("product insertion completed");
            response(null, result);
          }
        });
      } catch(err) {
        console.log('error: ', err);
        response(err, null);
      }
};


module.exports= User;