import * as e from "express"
import {Controller} from "../llama";
import {Post} from "../llama/post";
import User from "../db/schemas/user";
import * as jwt from 'jsonwebtoken';
import configuration from '../config';

@Controller()
export class AuthController {

    @Post({path: '/login'})
    login(request: e.Request, response: e.Response): void {
        let {
            email,
            password
        } = request.body;

        User.findOne({email}, (error, user) => {
            user.comparePassword(password).then(matched => {
                if(matched) {
                    let token = jwt.sign(user, configuration.auth.secret);

                    response.send({
                        token
                    })
                }
            }).catch(error => {
                response.send(error)
            })
        });
    }

    @Post({ path: '/register' })
    register(request: e.Request, response: e.Response): void {
        let {
            email,
            name,
            password
        } = request.body;

        let user = new User({
            email,
            name,
            password
        });

        user.save().then(user => {
            response.send(user);
        }).catch(error => {
            response.send(error)
        })
    }
}