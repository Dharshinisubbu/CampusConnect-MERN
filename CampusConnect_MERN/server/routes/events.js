import { Router } from 'express';
import Event from '../models/Event.js';
const router = Router();
let demoEvents = [
 { _id:'demo1', title:'TechNova 2026', category:'Technology', date:'2026-11-12', time:'10:00 AM', venue:'Main Auditorium', description:'A day of coding challenges, tech talks and innovation showcases.', organizer:'Computer Science Association', registrations:128 },
 { _id:'demo2', title:'Cultural Kaleidoscope', category:'Cultural', date:'2026-11-18', time:'02:00 PM', venue:'Open Air Theatre', description:'Celebrate music, dance, art and campus creativity.', organizer:'Fine Arts Club', registrations:86 },
 { _id:'demo3', title:'Startup Spark', category:'Workshop', date:'2026-11-21', time:'11:00 AM', venue:'Seminar Hall B', description:'Build your idea with practical sessions led by founders.', organizer:'Innovation Cell', registrations:54 },
 { _id:'demo4', title:'Campus Run & Wellness Day', category:'Sports', date:'2026-11-25', time:'06:30 AM', venue:'College Ground', description:'A friendly run and wellness activities for every student.', organizer:'Sports Committee', registrations:73 },
 { _id:'demo5', title:'Design Thinking Lab', category:'Workshop', date:'2026-12-02', time:'09:30 AM', venue:'Innovation Lab', description:'Solve real campus problems using human-centred design.', organizer:'Design Club', registrations:41 },
 { _id:'demo6', title:'Green Campus Drive', category:'Community', date:'2026-12-05', time:'08:00 AM', venue:'Admin Block Entrance', description:'Join students for a cleaner, greener campus.', organizer:'Eco Club', registrations:62 }
];
let dbReady = false;
export function setDbReady(value) { dbReady = value; }
router.get('/', async (req,res) => {
 try {
  const { search='', category='All' } = req.query;
  const items = dbReady ? await Event.find().sort({date:1}) : demoEvents;
  const filtered = items.filter(e => (category === 'All' || e.category === category) && `${e.title} ${e.description} ${e.venue} ${e.organizer}`.toLowerCase().includes(search.toLowerCase()));
  res.json({ events: filtered, mode: dbReady ? 'mongodb' : 'demo' });
 } catch(e) { res.status(500).json({message:'Unable to load events'}); }
});
router.post('/', async (req,res) => {
 const { title, category, date, time, venue, description, organizer } = req.body;
 if (!title || !date) return res.status(400).json({message:'Title and date are required'});
 try {
  const data = {title, category:category||'Campus', date, time:time||'10:00 AM', venue:venue||'Main Auditorium', description:description||'', organizer:organizer||'Student Council', registrations:0};
  if (dbReady) return res.status(201).json({event:await Event.create(data)});
  const event = {_id:`demo${Date.now()}`,...data}; demoEvents=[event,...demoEvents]; res.status(201).json({event,mode:'demo'});
 } catch(e) { res.status(500).json({message:'Unable to create event'}); }
});
router.post('/:id/register', async (req,res) => {
 try {
  if (dbReady) { const event=await Event.findByIdAndUpdate(req.params.id,{$inc:{registrations:1}},{new:true}); if(!event)return res.status(404).json({message:'Event not found'}); return res.json({event}); }
  const event=demoEvents.find(e=>e._id===req.params.id); if(!event)return res.status(404).json({message:'Event not found'}); event.registrations+=1; return res.json({event,mode:'demo'});
 } catch(e) { res.status(500).json({message:'Unable to register'}); }
});
export default router;
