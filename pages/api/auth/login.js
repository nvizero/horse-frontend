import Collect from '../../../lib/api/Collect';

export default async function login(req, res) {  
  try {
    console.log("as.da.sd.666",req.body)
    const json = await new Collect([],"/login").login(req.body);    
    console.log("as.da.sd.666" ,json)
    // return res.json(json.data);    
  } catch(e) {
    return res.status(e.status || 200).json(e.response);
  }
}