import { success } from 'zod';
import User from '../models/user.model.js';
import { Webhook } from 'svix';
import { Message } from 'svix/dist/api/message.js';


const clerkWebhooks = async(req, res) => {
    try {
        // create a Svix instance with webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // Getting Headers
        const headers = {
            "svix-id" : req.headers["svix-id"],
             "svix-timestamp" : req.headers["svix-timestamp"],
             "svix-signature" : req.headers["svix-signature"],
        };

        // verify Headers
        await whook.verify(JSON.stringify(req.body), headers)

        // Getting data from request body
        const {data, type} = req.body

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_addresses,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
        }

        // switch cases for different Events
        switch (type) {
            case "user.created":{
                await User.create(userData)
                 break;
            }
                
            case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData)
                 break;
            }
              
             case "user.deleted":{
                await User.findByIdAndDelete(data.id)
                 break;
            }
        
            default:
                break;
        }
        res.JSON({success: true, Message: "Webhook Recieved"})
        
    } catch (error) {
        console.log(error.message);
        res.JSON( {success: false, message: error.message})
    }
}

export default clerkWebhooks;