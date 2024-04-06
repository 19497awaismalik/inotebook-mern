const connectToMongo=require('./db');
var cors = require('cors')
connectToMongo();

const express = require('express')
const app = express()
const port = 5000;


app.use(express.json());

app.use(cors({
  origin:"*",
  methods:["POST","GET","DELETE","PUT"],
  credentials:true
}))



app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.get("/",(req,res)=>{
  res.send("<h1>INotebook Application on server side!</>");
})

app.listen(port, () => {
  console.log(`iNotebook Backend listening at http://localhost:${port}`)
})



