import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import pick from "../../../utils/pick";
import sendResponse from "../../../utils/sendResponse";

import { recipientFilterableFields } from "./recipient.interface";
import { recipientService } from "./recipient.service";

const getAllRecipient = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, recipientFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await recipientService.getAllRecipient(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recipient retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getRecipientById = catchAsync(async (req: Request, res: Response) => {
  const result = await recipientService.getRecipientById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recipient fetched successfully",
    data: result,
  });
});



const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await recipientService.deleteAllRecipient(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recipient deleted successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id, req.body);
  const result = await recipientService.updateIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recipient updated successfully",
    data: result,
  });
});



export const recipientController = {
getAllRecipient,
getRecipientById,
 updateIntoDB,
 deleteFromDB
};
