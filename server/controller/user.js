import User from "../model/dbModel.js";
import bcrypt from "bcrypt";
import { response } from "express";

export const signUpUser = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 5);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    };
    const newUser = new User(user);
    await newUser.save(function (err, result) {
      if (err) {
        console.log(err);
      }
    });
    return res.status(200).json({ msg: "signUp successfull" });
  } catch (error) {
    // console.log(req);
    return res.status(500).json({ msg: "failed to signUp", error: `${error}` });
  }
};

export const loginUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if(!user){
    return response.status(400).json({msg: "email doesn't exist, Please enter correct email"});
  }
  try {
    let passwordMatch = bcrypt.compare(req.body.password, user.password);
    if(match){

    }else{
      return response.status(400).json({msg: "Password didn't match, Please check email or password"}); 
    }
  } catch (error) {
    
  }
}

// export default signUpUser;
