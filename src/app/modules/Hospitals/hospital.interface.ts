export const hospitalFilterableFields: string[] = ["searchTerm", "name"];
export const hospitalSearchableFields: string[] = ["name"];
export type IHospitalFilterRequest = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  
};
