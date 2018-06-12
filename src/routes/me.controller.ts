import * as e from "express"
import {Controller} from "../llama";
import {Post} from "../llama/post";
import User from "../db/schemas/user";
import * as jwt from 'jsonwebtoken';
import configuration from '../config';
import {Get} from "../llama/get";

@Controller()
export class MeController {

    @Get({path: '/'})
    me(request: e.Request, response: e.Response): void {
        User.findOne({}).exec().then(user => {
            response.send(user)
        }).catch(error => {
            response.status(402).send();
        })
    }
}