const routes = require('express').Router();
let model = require('../models/model.js');
let constant = require('../config/constant');
const bcrypt = require('bcryptjs');
var passport = require('passport');
let User = model.User;
var jwt = require('jsonwebtoken');


routes.get('/', async(req, res) => {
    try{
        var all_user = await User.find({}).exec();
        console.log(all_user)
        res.status(200).json(all_user);
    }catch(error){
        res.send(500).send(error);
    }
});

routes.get('/p/:id',passport.authenticate('jwt', { session: false }),async(req,res)=>{
  res.status(200).json('user_data');
})


routes.post('/add', async(req, res) => {
    try{
      var user = new User(req.body);
      if(req.body.password){
       await bcrypt.genSalt(10, async function(err, salt) {
          bcrypt.hash(req.body.password, salt, async function(err, hash) {
            if(err) console.log(err)
            user_password = hash;
          });
        });
        
      }
      user.password = user_password;
      console.log(user_password);

    user_save = await user.save();

    if(user_save){
      res.status(200).json({ message: user_save });
    }
	}catch(error){
		res.status(500).send(error);
	}
});

routes.get('/:id',async(req,res)=>{
  var user_data = await User.findOne({_id:Object(req.params.id)}).exec();
  res.status(200).json(user_data);
})

routes.post('/update/:id',async(req,res)=>{
    try{
        var user_data = await User.findOne({_id:Object(req.params.id)}).exec();
        if(!user_data){
          res.status(404).send("data is not found");
        }else{
            user_data.full_name = req.body.full_name;
            user_data.email = req.body.email;
            user_data.contact_number = req.body.contact_number;
            user_data.gender = req.body.gender;
            var user_save = await user_data.save();
            res.status(200).json({ message: user_save });
        }
	}catch(error){
		res.status(500).send(error);
	}
 
})
routes.get('/delete/:id',async(req,res)=>{
    try {
      var user_data = await User.deleteOne({
        _id: Object(req.params.id)
      }).exec();
      res.status(200).json(user_data);
    } catch (error) {
      res.status(500).send(error);
    }
  })


  

  routes.post(
    "/register",
    (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.data);
        res.send(info.data);
      }
    })(req, res, next);
  }
  );

  routes.post(
    "/login",
    (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.data);
        res.status(200).json({massage:info.data});
      }else{
        req.logIn(user, err => {
          console.log('cdscds'+JSON.stringify(user));
          res.status(200).json({token:user.token,massage:user.data});
        })
      }
    })(req, res, next);
  }
  );

  
  

module.exports = routes;