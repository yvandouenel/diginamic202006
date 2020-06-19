const express = require("express");
const router = express.Router();
const db = require("../db/conf");

/* GET customers listing. */
router.get("/", function (req, res, next) {
  db.query("SELECT * FROM customer", (error, result) => {
    if (error) {
      throw error;
    }
    res.send(result.rows);
  });
});

router.get("/:id", function (req, res, next) {
  const customerId = +req.params.id;
  const query = {
    text: "SELECT * FROM customer WHERE id = $1",
    values: [customerId],
  };
  db.query(query, (error, result) => {
    if (error) {
      next({
        status: 500,
        message: "Erreur de requête à la base de données",
      });
      return;
    }
    const customer = result.rows[0];
    if (customer) {
      res.send(customer);
    } else {
      res.status(404).send({
        error: "NOT_FOUND",
        message: "Customer not found",
      });
    }
  });
});
router.post("/", function (req, res, next) {
  const customer = req.body;
  const query = {
    text: `INSERT INTO CUSTOMER (firstname, lastname, email)
           VALUES ($1, $2, $3)
           RETURNING *`,
    values: [customer.firstname, customer.lastname, customer.email],
  };
  db.query(query, (error, result) => {
    if (error) {
      throw error;
    }
    const insertedCustomer = result.rows[0];
    res.send(insertedCustomer);
  });
});
router.delete("/:id", function (req, res, next) {
  const customerID = + req.params.id;
  const query = {
    text: `DELETE FROM customer 
           WHERE id=$1`,
    values: [customerID]
  };
  db.query(query, (error, result) => {
    if (error) {
      throw error;
    }
    if(result.rowCount === 0 ) { // row count : nombre de lignes impactées
      next({status: 404, message: 'Customer not found'});
      return;
    }
    res.status(204).send();
  });
});

router.put("/:id", function (req, res, next) {
  const customerId = + req.params.id;
  const customer = req.body;
  const query = {
    text: `UPDATE CUSTOMER 
           SET firstname = $1,
           lastname = $2,
           email = $3
           WHERE id = $4
           RETURNING *`,
    values: [customer.firstname, customer.lastname, customer.email, customerId],
  };
  db.query(query, (error, result) => {
    if (error) {
      throw error;
    }
    const modifiedCustomer = result.rows[0];
    res.send(modifiedCustomer);
  });
});

module.exports = router;
