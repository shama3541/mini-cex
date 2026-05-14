import express from "express"
import userRoutes from "./routes/userRoutes"


const app = express()
const port = 3000

app.use(express.json())


app.use("/user",userRoutes)

app.post("/testpost",(req,res)=>{
    res.send("Sending ost route")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})