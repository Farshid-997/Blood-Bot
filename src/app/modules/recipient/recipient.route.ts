import express from "express";
import { recipientController } from "./recipient.controller";



const router = express.Router();

router.get("/", recipientController.getAllRecipient);

router.get("/:id", recipientController.getRecipientById);
router.delete("/:id", recipientController.deleteFromDB);
router.patch("/:id", recipientController.updateIntoDB);


export const recipientRoutes = router;
