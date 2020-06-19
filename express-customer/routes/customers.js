const express = require('express');
const router = express.Router();
const db = require('../db/conf');

/* GET customers listing. */
router.get('/', function(req, res, next) {
    db.query('SELECT * FROM customer', (error, result) => {
        if (error) {
            throw error;
        }
        res.send(result.rows);    
    });
});

router.get('/:id', function(req, res, next) {
    const customerId = +req.params.id;
    const query = {
        text: 'SELECT * FROM customer WHERE id = $1',
        values: [customerId]
    }
    db.query(query, (error, result) => {
        if (error) {
            next({
                status: 500, 
                message: 'Erreur de requête à la base de données'
            });
            return;
        }
        const customer = result.rows[0];
        if (customer) {
            res.send(customer);    
        } else {
            res.status(404).send({
                error: 'NOT_FOUND', 
                message: 'Customer not found'
            });
        }
    });
});

module.exports = router;