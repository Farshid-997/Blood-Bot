import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import pick from "../../../utils/pick";
import sendResponse from "../../../utils/sendResponse";

import { Hospital } from "@prisma/client";
import { hospitalFilterableFields } from "./hospital.interface";
import { hospitalService } from "./hospital.service";

const createHospital: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.body);
    const result = await hospitalService.createHospital(req.body);
    sendResponse<Hospital>(res, {
      success: true,
      statusCode: 200,
      message: "Hospital created successfully",
      data: result,
    });
  }
);

const getAllHospital = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, hospitalFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await hospitalService.getAllHospital(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hospital retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getHospitalById = catchAsync(async (req: Request, res: Response) => {
  const result = await hospitalService.getHospitalById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hospital fetched successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await hospitalService.deleteAllHospital(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hospital deleted successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id, req.body);
  const result = await hospitalService.updateIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hospital updated successfully",
    data: result,
  });
});

export const hospitalController = {
  createHospital,
  getAllHospital,
  getHospitalById,
  updateIntoDB,
  deleteFromDB,
};
