import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import pick from "../../../utils/pick";
import sendResponse from "../../../utils/sendResponse";
import { donorFilterableFields } from "./donor.interface";
import { donorService } from "./donor.service";

const getAllDonor = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, donorFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await donorService.getAllDonors(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donors retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getDonorsById = catchAsync(async (req: Request, res: Response) => {
  const result = await donorService.getDonorById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donors fetched successfully",
    data: result,
  });
});



const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await donorService.deleteAllDonor(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donors deleted successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id, req.body);
  const result = await donorService.updateIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donor updated successfully",
    data: result,
  });
});



export const donorController = {
 getAllDonor,
 getDonorsById,
 updateIntoDB,
 deleteFromDB
};
