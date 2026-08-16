import express from "express";
import validate from "../middleware/validate.middleware.js";
import { contactSchema, newsletterSchema } from "../validations/schemas.js";
import { submitContact } from "../controllers/contact.controllers.js";
import { subscribeNewsletter } from "../controllers/newsletter.controllers.js";

const publicRouter = express.Router();

publicRouter.post("/contact", validate(contactSchema), submitContact);
publicRouter.post("/newsletter", validate(newsletterSchema), subscribeNewsletter);

export default publicRouter;
