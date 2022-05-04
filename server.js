const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const verifyLaunchParams = require('./helpers/verifyLaunchParams');
const _log = require('./helpers/log');
 
const dev = process.env.MODE !== 'production'
const hostname = 'localhost'
const port = 3000
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
const _skipLPCheckPaths = [ '_next', 'static' ];

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Cuz in dev mode next will load .env after app.prepare() and VK_SECRET_KEY is not available. FML lmao
      const vkSecretKey = process.env.VK_SECRET_KEY || "";
      const parsedUrl = parse(req.url, true)
      const { query, pathname } = parsedUrl;
      const checkSign = verifyLaunchParams(query, vkSecretKey);

      if (!_skipLPCheckPaths.find(_u => pathname.search(_u) >= 0) && !checkSign) {
        req.__signCheckFailed = true;
        res.statusCode = 402;
      }

      await handle(req, res, parsedUrl)
    } catch (err) {
      res.statusCode = 500
      res.end('internal server error')

      if (dev) console.log(err);
    }

    _log.request(req.method, res.statusCode, req.url);
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Loaded custom server and Ready on http://${hostname}:${port}`)
  })
})