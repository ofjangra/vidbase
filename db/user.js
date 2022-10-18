import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

import User from "../models/User.js"

export const CreateUser = async (body) =>{
    try{

        console.log(body)
        const user_NameExists = await User.findOne({name:body.name})
    
        if(user_NameExists){
            throw "Name already taken"
        }

        const user_EmailExists = await User.findOne({email:body.email})

        if(user_EmailExists){
            throw "Email Already in Use"
        }

        // Hash Password

        const passHash =await  bcrypt.hash(body.password, 12)

        // insert user

        const newUser = new User({
            ...body, password:passHash
        })

        await newUser.save()

        return null
    } catch(err){
        return err
    }


}


export const GetUserByEmail = async (email) =>{
    try{
        let user = await User.findOne({email:email})

        if(!user){
            throw {error:"No user found with this email", user:null}
        }

        return {error:null, user:user}

    } catch(err){
        return err
    }
}


