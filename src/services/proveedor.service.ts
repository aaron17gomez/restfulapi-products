import {Request,Response} from "express";
import {Proveedor, IProveedor} from "../models/proveedor.model";
import { MongooseDocument } from "mongoose";


export class ProveedorService{

    public getAll(req: Request,res: Response){
        Proveedor.find({},(err: Error, proveedores: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(proveedores);
        });
    }

    public GetById(req: Request,res: Response){
        Proveedor.findById(req.params.id_prov,(err:Error,proveedor:IProveedor)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(proveedor? proveedor : {} );
        });
    }
    //Payload
    public Update(req: Request,res: Response){
        console.log("entro");
        Proveedor.findByIdAndUpdate(req.params.id_prov,req.body,(err:Error, proveedor:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( proveedor? {"updated":true} : {"updated":false} );
        })
    }

    public Delete(req: Request, res: Response){
        Proveedor.findByIdAndDelete(req.params.id_prov,req.body,(err:Error, proveedor:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( proveedor? {"deleted":true} : {"deleted":false} );
        });
    }

    public NewOne(req: Request, res: Response){
        const p = new Proveedor(req.body);
        p.save((err:Error, proveedor: IProveedor)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( proveedor? {"successed":true, "Proveedor": proveedor } : {"successed":false} );
        });
    }

   

}

