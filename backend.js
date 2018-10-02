var express = require('express');
var app = express();
var path = require('path');
var bodyparser = require('body-parser');
const mongoclient = require('mongodb').mongoclient;

var db;

mongoclient.connect('mongo-url', (err, client) => {
if(err) return console.log(err)
db = client.db('paytimely')
app.listen(3000, () => {
  console.log("Server is Running")
})
}
                    
app.set('view engine','ejs');

app.use(express.static(__dirname));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var items =[];

app.get('/', (req,res) => {
  db.collection('object').find().toArray((err, result) => {
  if(err) return console.log(err)
  res.render('backend', {items: items});
  })
})


app.post('/', (req,res) => {
  db.collection('object').save(req.body, (err,result) => {
   if (err) return console.log(err)
   var item = req.body;
   items.push(item);
   res.render('backend',{items: items});
   console.log(items);
  })
})

app.post('/reset', (req,res) => {
  items.splice(req.body);
  console.log(items);
  res.redirect('/');
})

app.post('/delete', (req,res) => {
  db.collection('object').findOneAndDelete({name: req.body.name}, (err, result) => {
  console.log("Deleted call")
  var item = req.body;
  console.log(item);
  items.splice(items.indexOf(item), 1);
  console.log(items);
  res.redirect('/');
  })
})



