import express from "express";
import { hospitalController } from "./hospital.controller";




const router = express.Router();

router.post(
    '/add-hosspital',
    
    hospitalController.createHospital,
  );
  
router.get("/", hospitalController.getAllHospital);

router.get("/:id", hospitalController.getHospitalById);
router.delete("/:id", hospitalController.deleteFromDB);
router.patch("/:id", hospitalController.updateIntoDB);


export const hospitalRoutes = router;
