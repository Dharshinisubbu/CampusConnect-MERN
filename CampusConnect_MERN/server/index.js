import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import eventRoutes, { setDbReady } from './routes/events.js';
dotenv.config();
const app=express();
app.use(cors()); app.use(express.json());
app.get('/api/health',(req,res)=>res.json({status:'ok',service:'CampusConnect API'}));
app.use('/api/events',eventRoutes);
const port=process.env.PORT||5000;
if(process.env.MONGO_URI){
 mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS:2500}).then(()=>{setDbReady(true);console.log('MongoDB connected');}).catch(()=>console.log('MongoDB unavailable; using demo mode.'));
}
app.listen(port,()=>console.log(`CampusConnect API running at http://localhost:${port}`));
