var express = require('express');
var app = express();
var path = require('path');
var bodyparser = require('body-parser');

app.set('view engine','ejs');

app.use(express.static(__dirname));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var items =[];

app.get('/', (req,res) => {
  res.render('backend', {items: items});
})


app.post('/', (req,res) => {
  var item = req.body;
  items.push(item);
  res.render('backend',{items: items});
  console.log(items);
})

app.post('/reset', (req,res) => {
  items.splice(req.body);
  console.log(items);
  res.redirect('/');
})

app.post('/delete', (req,res) => {
  console.log("Deleted call")
  var item = req.body;
  console.log(item);
  items.splice(items.indexOf(item), 1);
  console.log(items);
  res.redirect('/');
})


app.listen(3000, () => {
  console.log("Server is Running")
})
