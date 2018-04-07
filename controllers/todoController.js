// var data = [{item: 'get milk'}, {item : "walk dog"}, {item: "kick some coding "}]

var bodyParser = require('body-parser')

var mongoose = require('mongoose')
mongoose.connect('mongodb://zephyr:zephyr@ds237669.mlab.com:37669/todos');
var todoSchema = new mongoose.Schema({
    item: String
})

var Todo = mongoose.model('Todo', todoSchema)

var urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if (err) throw err
            res.render('todo', {todos: data})
        })
        // res.render('todo', {todos: data})
    })

    app.post('/todo', urlencodedParser, function(req, res) {
        Todo({item: req.body.item.trim().replace(/ /g, "-")}).save(function(err, data) {
            if (err) throw err
            res.json(data)
        })
        // data.push(req.body)
        // // res.render('todo', {todos: data})
        // res.end()
    })

    app.delete('/todo/:item', function(req, res) {
        console.log('delete')
        Todo.find({item: req.params.item.trim().replace(/ /g, "-")}).remove(function(err, data) {
            if (err) throw err
            res.json(data)
        })
        // data = data.filter(function(todo) {
        //     return todo.item.trim().replace(/ /g, "-") != req.params.item
        // })
        // res.json(data)
    })
}