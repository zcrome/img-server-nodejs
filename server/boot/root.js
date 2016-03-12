module.exports = function(server) {
  
  var router = server.loopback.Router();
  var path = require('path');
  var multer  = require('multer');
  var ip = require('ip');

  var upload = multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname).replace("/server/boot", "/client"));
    },
    filename: function (req, file, cb) {
      var ext = require('path').extname(file.originalname);
      ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
      require('crypto').pseudoRandomBytes(50, function (err, raw) {
        cb(null, (err ? undefined : raw.toString('hex') ) + ext);
      });
    }
  })});

router.post('/img-save', upload.single('file'), function (req, res) {
  var response = {
    status: 200,
    url: "http://"+ ip.address() +":8000/" + req.file.filename
  };

  res.end(JSON.stringify(response));
});










  server.use(router);
};
