export const donorFilterableFields: string[] = ["searchTerm", "email"];
export const donorSearchableFields: string[] = ["name", "email"];
export type IDonorFilterRequest = {
  searchTerm?: string | undefined;
  email?: string | undefined;
  
};
