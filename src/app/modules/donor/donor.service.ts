import { Donor, Prisma } from "@prisma/client";
import { IGenericResponse } from "../../../interface/common";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../utils/paginationHelper";
import prisma from "../../../utils/prisma";
import { donorSearchableFields, IDonorFilterRequest } from "./donor.interface";


const getAllDonors = async (
  filters: IDonorFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Donor[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: donorSearchableFields.map((field) => ({
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
  const whereConditions: Prisma.DonorWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.donor.findMany({
    where: whereConditions,
    skip,
    take: limit,
  });

  const total = await prisma.donor.count({
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

const getDonorById = async (userId: string): Promise<Donor | null> => {
  const result = await prisma.donor.findUnique({
    where: {
      userId,
    },
  });
  return result;
};



const updateIntoDB = async (
  userId: string,
  payload: Partial<Donor>
): Promise<Donor> => {
  const result = await prisma.donor.update({
    where: {
      userId,
    },
    data: payload,
  });
  return result;
};



const deleteAllDonor= async (userId: string): Promise<unknown> => {
    const result = await prisma.donor.deleteMany({
      where: { userId },
    });
    return result;
  };
  

export const donorService = {
 
 getAllDonors,
 getDonorById,
 updateIntoDB,
 deleteAllDonor
 
 
};
