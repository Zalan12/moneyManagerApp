const express = require('express');
const router = express.Router();
const {query} = require('../utils/database');
const logger=require('../utils/logger')


//Select All records
router.get('/:table', (req, res) => {
  const table=req.params.table;
    query(`SELECT * FROM ${table}`,[], (error, results) => {
      if (error) return res.status(500).json({ errno: error.errno, msg: 'Baj van geco' });
      res.status(200).json(results);
    }, req);
  })
//Select one record from table by id
  router.get('/:table/:id', (req, res) => {
    const table=req.params.table;
    const id=req.params.id;
      query(`SELECT * FROM ${table} WHERE id=?`,[id], (error, results) => {
        if (error) return res.status(500).json({ errno: error.errno, msg: 'Baj van geco' });
        res.status(200).json(results);
      }, req);
    })
//insert one record to table
router.post('/:table', (req, res) => {
  const table = req.params.table;
  const data = req.body; // itt jönnek az adatok JSON formában

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ msg: 'Nincs adat a body-ban!' });
  }

  // Oszlopnevek és értékek dinamikusan
  const columns = Object.keys(data);
  const placeholders = columns.map(() => '?').join(', ');
  const values = Object.values(data);

  const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

  query(sql, values, (error, results) => {
    if (error) {
      logger.error(error);
      return res.status(500).json({ errno: error.errno, msg: 'Baj van geco' });
    }
    res.status(200).json({ msg: 'Sikeres beszúrás!', insertId: results.insertId });
  }, req);
});

// Delete one record by id
router.delete('/:table/:id', (req, res) => {
  const table = req.params.table;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ msg: 'Hiányzik az id paraméter!' });
  }

  const sql = `DELETE FROM ${table} WHERE id = ?`;

  query(sql, [id], (error, results) => {
    if (error) {
      logger.error(error);
      return res.status(500).json({ errno: error.errno, msg: 'Baj van geco' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ msg: 'Nem található ilyen rekord.' });
    }

    res.status(200).json({ msg: 'Sikeresen törölve!' });
  }, req);
});


// Update (partial) record by id
router.patch('/:table/:id', (req, res) => {
  const table = req.params.table;
  const id = req.params.id;
  const data = req.body;

  if (!id) {
    return res.status(400).json({ msg: 'Hiányzik az id paraméter!' });
  }

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ msg: 'Nincs adat a body-ban!' });
  }

  // Dinamikus SET rész
  const columns = Object.keys(data);
  const values = Object.values(data);
  const setClause = columns.map(col => `${col} = ?`).join(', ');

  const sql = `UPDATE ${table} SET ${setClause} WHERE id = ?`;

  query(sql, [...values, id], (error, results) => {
    if (error) {
      logger.error(error);
      return res.status(500).json({ errno: error.errno, msg: 'Baj van geco' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ msg: 'Nem található ilyen rekord.' });
    }

    res.status(200).json({ msg: 'Sikeres frissítés!' });
  }, req);
});

module.exports = router;

