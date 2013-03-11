
var express = require('express')
  , app = express()
  , http = require('http')
  , path = require('path')
  , db = require('./db')
  , routes = require('./routes')

app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.set('views', path.join(__dirname, '/views'))
  app.set('view engine', 'ejs')
  app.use(express.favicon())
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(express.logger('dev'))
  app.use(express.cookieParser())
  app.use(express.bodyParser())
  app.use(app.router)
  app.use(routes.current_user)
  app.use(express.errorHandler())
})

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})


app.get('/', routes.index)
app.post('/create', routes.create)
app.get('/destroy/:id', routes.destroy)
app.get('/edit/:id', routes.edit)
app.post('/update/:id', routes.update)

http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});