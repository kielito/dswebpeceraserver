import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req:Request, res:Response, next:NextFunction) => {
	//Recuperamos la cabecera y la dividimos en 2
    let token:any = (req.header("Authotization")?.split('Baerer ',2));
    //tomamos la parte que nos interesa, el token, para despues evaluar.
    token = token['1'];
    console.log("Evaluando token recibido");
    console.log(token);

    try {
        //const token = authHeader.split(' ')[1];

        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'secretKey') as IPayload;
        console.log(payload);
        //req.userdId = payload._id;
        
        next();

    } catch(error) {
        return res.status(401).json({message: 'Token invalido!'});
    }
	/*if(!token)
        return res.status(401).json("Acceso denegado :P");
	next();*/
}