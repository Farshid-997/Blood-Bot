import { Prisma, Recipient } from "@prisma/client";
import { IGenericResponse } from "../../../interface/common";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../utils/paginationHelper";
import prisma from "../../../utils/prisma";
import { IRecipientFilterRequest, recipientSearchableFields } from "./recipient.interface";



const getAllRecipient = async (
  filters: IRecipientFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Recipient[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: recipientSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.RecipientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.recipient.findMany({
    where: whereConditions,
    skip,
    take: limit,
  });

  const total = await prisma.recipient.count({
    where: whereConditions,
  });

  const totalPages = Math.ceil(total / Number(limit));
  return {
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
    data: result,
  };
};

const getRecipientById = async (userId: string): Promise<Recipient | null> => {
  const result = await prisma.recipient.findUnique({
    where: {
      userId,
    },
  });
  return result;
};



const updateIntoDB = async (
  userId: string,
  payload: Partial<Recipient>
): Promise<Recipient> => {
  const result = await prisma.recipient.update({
    where: {
      userId,
    },
    data: payload,
  });
  return result;
};



const deleteAllRecipient= async (userId: string): Promise<unknown> => {
    const result = await prisma.recipient.deleteMany({
      where: { userId },
    });
    return result;
  };
  

export const recipientService = {
 
getAllRecipient,
getRecipientById,
updateIntoDB,
deleteAllRecipient
 
 
};
