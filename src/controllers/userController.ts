import {Request, Response} from 'express';
import User from "../models/userModel";
import createResponse from "../helpers/response";

export const createUser = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;
    try {
        const user = await User.create({name, email, password});
        res.status(201).json(createResponse(true, "Success", user));
    } catch (e: any) {
        res.status(500).json(createResponse(false, e.message));
    }
}