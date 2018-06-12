import * as e from "express"
import {Controller} from "../llama";
import {Post} from "../llama/post";
import Donation from "../db/schemas/donation";
import User from "../db/schemas/user";

@Controller()
export class DonationsController {

    @Post({path: "/save", authorise: true})
    save(request: e.Request, response: e.Response): void {
        let { donation_id } = request.body;

        if(!donation_id) {
            response.status(400).send({
                success: false
            })
            return;
        }

        User.findById(request.user.id).exec().then(user => {
            if(user.donation) {
                response.status(400).send({
                    success: false
                })
                return;
            }
            
            let donation = new Donation({
                user: user._id,
                donation_id
            });

            donation.save().then(result => {
                user.donation = result._id;
                user.save().then(result => {
                    response.send({
                        success: true
                    })
                }).catch(() => {
                    response.status(400).send({
                        success: false
                    })
                })
            }).catch(() => {
                response.status(400).send({
                    success: false
                })
            })
            
        }).catch(error => {
            response.status(400).send({
                success: false
            })
        });
    }
}