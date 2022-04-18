const User = require('../models/user');

exports.login=(req,res)=>{
    let user= new User().authonticate(req.body.username, req.body.password);
    if(user ==null){
       return res.status(400).send("NOT FOUND");
    }
    else {
        res.send("success");
    }

}