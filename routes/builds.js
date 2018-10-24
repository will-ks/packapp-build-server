const express = require('express');
const router = express.Router();
const execa = require('execa');
const validator = require('validator');

router.post('/', (req, res, next) => {
  if (
    !req.body ||
    !validator.isAlphanumeric(req.body.appName) ||
    req.body.appName.length > 50 ||
    !validator.isURL(req.body.url) ||
    req.body.url.length > 2083 ||
    !validator.isAlphanumeric(req.body.splashScreen) ||
    req.body.splashScreen.length > 30 ||
    !validator.isAlphanumeric(req.body.launcherIcon) ||
    req.body.launcherIcon.length > 30 ||
    !validator.isHexColor(req.body.primaryColor) ||
    !validator.isHexColor(req.body.secondaryColor) ||
    typeof req.body.camera !== 'boolean' ||
    typeof req.body.camera !== 'boolean' ||
    typeof req.body.externalUrls !== 'boolean' ||
    typeof req.body.gps !== 'boolean' ||
    typeof req.body.landscape !== 'boolean' ||
    typeof req.body.portrait !== 'boolean' ||
    typeof req.body.progressBar !== 'boolean' ||
    typeof req.body.ratings !== 'boolean' ||
    typeof req.body.uploads !== 'boolean' ||
    typeof req.body.zoom !== 'boolean' ||
    typeof req.body.ratingDays !== 'number'
  ) {
    return res.status(422).json({ code: 'incorrect parameters' });
  }

  const params = [
    req.body._id,
    req.body.splashScreen,
    req.body.launcherIcon,
    req.body.appName,
    req.body.primaryColor,
    req.body.secondaryColor,
    req.body.camera,
    req.body.externalUrls,
    req.body.gps,
    req.body.progressBar,
    req.body.ratingDays,
    req.body.ratings,
    req.body.uploads,
    req.body.zoom,
    req.body.orientation,
    req.body.callback
  ];
  const buildScriptPath = './shell/build-android.sh';
  const cp = execa('sh', [buildScriptPath, ...params]);
  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stderr);
  res.send('foo');
});

module.exports = router;
