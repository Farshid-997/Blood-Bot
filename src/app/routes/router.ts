import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { donorRoutes } from "../modules/donor/donor.routes";
import { hospitalRoutes } from "../modules/Hospitals/hospital.route";
import { recipientRoutes } from "../modules/recipient/recipient.route";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },

 
  {
    path: "/donors",
    route: donorRoutes,
  },
 

  {
    path: "/recipient",
    route: recipientRoutes,
  },

  {
    path: "/hospitals",
    route: hospitalRoutes,
  },
 
];

moduleRoutes.forEach((route) => router.use(route.path, route?.route));
export default router;
