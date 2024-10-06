import {Request, Response} from 'express';
import User from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;
    try {
        const user= await User.create({name, email, password});
        res.status(201).json(user);
    } catch (e: any) {
        res.status(500).json({message: e.message})
    }
}