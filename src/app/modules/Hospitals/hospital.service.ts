import { Hospital, Prisma } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { IGenericResponse } from "../../../interface/common";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../utils/paginationHelper";
import prisma from "../../../utils/prisma";
import {
    hospitalSearchableFields,
    IHospitalFilterRequest,
} from "./hospital.interface";

const createHospital = async (hospital: Hospital): Promise<Hospital | null> => {
  const result = await prisma.hospital.create({
    data: hospital,
  });

  if (!result) {
    throw new ApiError(400, "failed to created new hospital");
  }
  return result;
};

const getAllHospital = async (
  filters: IHospitalFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Hospital[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: hospitalSearchableFields.map((field) => ({
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
  const whereConditions: Prisma.HospitalWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.hospital.findMany({
    where: whereConditions,
    skip,
    take: limit,
  });

  const total = await prisma.hospital.count({
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

const getHospitalById = async (id: string): Promise<Hospital | null> => {
  const result = await prisma.hospital.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Hospital>
): Promise<Hospital> => {
  const result = await prisma.hospital.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteAllHospital = async (id: string): Promise<unknown> => {
  const result = await prisma.hospital.deleteMany({
    where: { id },
  });
  return result;
};

export const hospitalService = {
  createHospital,
  getAllHospital,
  getHospitalById,
  updateIntoDB,
  deleteAllHospital,
};
