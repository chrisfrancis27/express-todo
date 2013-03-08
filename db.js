var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Todo = new Schema({
        used_id: String,
        content: String,
        updated_at: Date
    });
    
mongoose.model('Todo', Todo);

mongoose.connect('mongodb://localhost/express-todo');