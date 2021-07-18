const express = require('express');
const bodyParser = require('body-parser');
let app = express();

var cors = require('cors');
const userRouter = require('./routes/user');
app.use(cors())
app.options('*', cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*' ); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use('/api', userRouter)

app.listen(PORT,()=>{
    console.log(`app listen port ${PORT}`);
})