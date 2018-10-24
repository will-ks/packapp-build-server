const express = require('express');
const router = express.Router();
const execa = require('execa');

router.post('/', (req, res, next) => {
  const buildScriptPath = './shell/test.sh';
  execa('sh', [buildScriptPath]).stdout.pipe(process.stdout);
  res.send('foo');
});

module.exports = router;
