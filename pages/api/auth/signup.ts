import { connectToMongoDB } from "#/lib/mongodb";

export default async function handler(req,res){
connectToMongoDB().catch(err=>res.json({
    error:'Connection Failed!'
}))

if(req.method==='POST'){
res.json({msg:'online'})
}else{
res.status(500).json({
    messaga:"HTTP method not valid only POST Accepted"
})
}
}