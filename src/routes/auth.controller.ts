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
            if(error) {
                return response.send(error);
            }

            if(!user) {
                return response.status(404).send({
                    success: false
                })
            }

            user.comparePassword(password).then(matched => {
                if(matched) {
                    let token = jwt.sign({ id: user._id }, configuration.auth.secret, {
                        expiresIn: '2 days'
                    });

                    response.send({
                        token,
                        success: true
                    })
                }
                else {
                    response.status(404).send({
                        success: false
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
            firstName,
            lastName,
            password
        } = request.body;

        let user = new User({
            email,
            name: {
                first: firstName,
                last: lastName
            },
            password
        });

        user.save().then(result => {
            let token = jwt.sign({ id: user._id }, configuration.auth.secret, {
                expiresIn: '2 days'
            });

            response.send({
                token,
                success: true
            })

        }).catch(error => {
            console.log("error", error);
            response.send({
                error,
                success: false
            })
        })
    }
}