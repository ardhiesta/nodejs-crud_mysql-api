const express = require('express');
const router = express.Router();
const connection = require('../connection');

/* GET | get all data student */
router.get('/', function(req, res, next) {
  // Do the query to get data.
  connection.query('SELECT * FROM tbl_student', function(error, rows, fields) {
    if (error) {
      res.send(JSON.stringify({
        "status": 500,
        "error": error
      }));
    } else {
      res.send(JSON.stringify({
        "status": 200,
        "data": rows
      }));
    }
  });
});

/* POST | insert data student */
router.post('/add', function(req, res) {
  var postData  = {
    student_id: req.body.student_id, 
    name: req.body.name, 
    address: req.body.address, 
    gender: req.body.gender, 
    date_of_birth: req.body.date_of_birth};

  connection.query('INSERT INTO tbl_student SET ?', postData, function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({
        "status": 500,
        "error": error
      }));
    } else {
      res.send(JSON.stringify({
        "status": 200,
        "data": results
      }));
    }
  });
});

/* DELETE | delete data student */
router.delete('/delete/:id', function (req, res) {
  connection.query('DELETE FROM tbl_student WHERE student_id = ?', [req.params.id], function(error, results) {
    if (error) {
      res.send(JSON.stringify({
        "status": 500,
        "error": error
      }));
    } else {
      res.send(JSON.stringify({
        "status": 200,
        "data": results
      }));
    }
  });
});

/* PUT | edit data student */
router.put('/edit/:id', function(req, res){
  connection.query('UPDATE tbl_student SET student_id = ?, name = ?, address = ?, gender = ?, date_of_birth = ? WHERE student_id = ?', 
    [
      req.body.student_id, 
      req.body.name, 
      req.body.address, 
      req.body.gender, 
      req.body.date_of_birth, 
      req.params.id
    ], 
    function (error, results, fields) {
			if (error) {
        res.send(JSON.stringify({
          "status": 500,
          "error": error
        }));
      } else {
        res.send(JSON.stringify({
          "status": 200,
          "data": results
        }));
      }
		});
});

// http://localhost:3000/api/students/search?keyword=rudi&sort=asc&col=name
router.get('/search', function(req, res, next) {
  connection.query('SELECT * FROM tbl_student WHERE '
  +req.query.col+' like ? ORDER BY '
  +req.query.col+' '+req.query.sort, 
  [req.query.keyword],function(error, rows, fields) {
    if (error) {
      res.send(JSON.stringify({
        "status": 500,
        "error": error
      }));
    } else {
      res.send(JSON.stringify({
        "status": 200,
        "data": rows
      }));
    }
  });
});

module.exports = router;