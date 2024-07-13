const app=require('./App');

const PORT=3434;
app.listen(PORT,(req,res)=>{
    console.log(`Server is working on ${PORT}`)
});

