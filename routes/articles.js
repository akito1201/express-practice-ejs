var express = require('express');
var router = express.Router();
const con =  require('../db/db.js');

/* GET home page. */
router.get('/', (req, res) => {
  con.query(
    'SELECT * FROM articles ORDER BY id DESC',
    (error, results) => {
      res.render('articles.ejs', { articles: results })
    }
  )
});

router.get('/new', function(req, res, next) {
  res.render('new');
});

router.post('/new', function(req, res, next) {
  const title = req.body.title;
  const summary = req.body.summary;
  console.log(req.body)

  con.query(
    'INSERT INTO articles (title, summary) VALUES (?, ?)',
    [title, summary],
    (error, results) => {
      res.redirect('/articles');
    }
  )
}
);

router.get('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  
  con.query(
    'SELECT * FROM articles WHERE id = ?',
    [id],
    (error, results) => {
      res.render('edit',{ article: results[0] });
    }
  )
}
);

router.post('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  const title = req.body.title;
  const summary = req.body.summary

  con.query(
    'UPDATE articles SET title = ?, summary = ? WHERE id = ?',
    [title, summary, id],
    (error, results) => {
      res.redirect('/articles')
    }
  )
}
);

router.post('/:id/delete', function(req, res, next) {
  const id = req.params.id;

  con.query(
    'DELETE FROM articles WHERE id = ?',
    [id],
    (error, results) => {
      res.redirect('/articles')
    }
  )
}
);

module.exports = router;
