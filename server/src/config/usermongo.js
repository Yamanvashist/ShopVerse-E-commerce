const mongoose = require("mongoose")

const connection = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    }catch(err){
        console.log(err,"Mongo connection failed")
    }
}

module.exports = connection;