const express=require('express');
const morgan =require("morgan")
const cors=require('cors')
const app=express();

const Port = 4000 || process.env.PORT;

app.use(express.json())
app.use(morgan());
app.use(cors());

app.get('/',(req,res)=>{
    console.log("server is running");
    res.json({
        message:"Server is running"
    })
})

const BackendRouter=require('./router/route')
app.use('/backend',BackendRouter);
app.use('*', (req, res) => {
    
    res.status(404).send("route not found")
      // res.sendStatus(404)
  
  })

app.listen(Port,()=>{
console.log('server is responding on port '+Port);
})