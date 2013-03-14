var mongoose = require('mongoose')
  , Todo = mongoose.model('Todo')
  , utils = require('connect').utils

/*
 * GET home page.
 */
exports.index = function(req, res, next) {
  Todo.find({
    user_id : req.cookies.user_id
  }).sort(
    '-updated_at'
  ).exec(function(err, todos, count) {
    if ( err ) { return next(err); }
    
    res.render('index', {
      title : 'Express Todo Example'
    , todos : todos
    });
  });
};

/*
 * POST create Todo item.
 */
exports.create = function(req, res, next) {
  new Todo({
    user_id     : req.cookies.user_id
  , content     : req.body.content
  , updated_at  : Date.now()
  }).save(function(err, todo, count) {
    if ( err ) { return next(err); }
    
    res.redirect('/');
  });
};

/*
 * GET destroy Todo item.
 */
exports.destroy = function(req, res, next) {
  Todo.findById(req.params.id, function(err, todo) {
    if (todo.user_id !== req.cookies.user_id) {
      return utils.forbidden(res);
    }
    
    todo.remove(function(err, todo) {
      if ( err ) { return next(err); }
      
      res.redirect('/');
    });
  });
};

/*
 * GET edit Todo item.
 */
exports.edit = function(req, res, next) {
  Todo.find({
    user_id : req.cookies.user_id
  }).sort(
    '-updated_at'
  ).exec(function(err, todos) {
    if ( err ) { return next(err); }
    
    res.render('edit', {
      title   : 'Express Todo Example'
    , todos   : todos
    , current : req.params.id
    });
  });
};

/*
 * POST update Todo item.
 */
exports.update = function(req, res, next) {
  Todo.findById(req.params.id, function(err, todo) {
    if ( todo.user_id !== req.cookies.user_id ) {
      return utils.forbidden(res);
    }
    
    todo.content  = req.body.content;
    todo.updated_at = Date.now();
    todo.save(function(err, todo, count) {
      if ( err ) { return next(err); }
      
      res.redirect('/');
    });
  });
};

// ** express turns the cookie key to lowercase **
exports.current_user = function(req, res, next) {
  if (!req.cookies.user_id) {
    res.cookie('user_id', utils.uid(32));
  }
  next();
};