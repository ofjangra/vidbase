
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import {CreateUser, GetUserByEmail} from "../db/user.js"


// _____________________ Signup _______________________

export const Signup = async (req, res) =>{
    const {name, email, password, userType} = req.body

    if(!name || !email || !password || !userType){
        return res.status(422).json({error:"Please fill the required fields"})
    }

    const insertionError = await CreateUser(req.body)

    if(insertionError !== null){
        return res.status(500).json({error:insertionError})
    }

    return res.status(201).json({message:"user created"})
}

// _____________________ Signin _______________________


export const Signin = async (req, res) =>{
    const {email, password} = req.body

    if(!email || !password){
        return res.status(422).json({error:"Please provide required credentials"})
    }

    const thisUser = await GetUserByEmail(email)

    if(thisUser.error !== null){
        return res.status(404).json({error:thisUser.error})
    }

    const passMatch = await bcrypt.compare(password, thisUser.user.password)

    if(!passMatch){
        return res.status(401).json({error:"Invalid Password"})
    }
    const token  = jwt.sign({_id:thisUser.user._id},process.env.JWTKEY)
    return res.status(200).json({access_token:token})
}

