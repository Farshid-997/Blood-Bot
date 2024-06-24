import express from "express";
import { donorController } from "./donor.controller";


const router = express.Router();

router.get("/", donorController.getAllDonor);

router.get("/:id", donorController.getDonorsById);
router.delete("/:id", donorController.deleteFromDB);
router.patch("/:id",donorController.updateIntoDB);


export const donorRoutes = router;
