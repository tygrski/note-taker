const { Router } = require('express');
const router = require('./htmlRoutes');

// on gets dont need to add /api/... just need /..

router.get('/notes', (req, res) => {
  if (result) {
    res.json(result)
  } else {
    res.send(404)
  }
});

