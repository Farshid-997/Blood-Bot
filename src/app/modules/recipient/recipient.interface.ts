export const recipientFilterableFields: string[] = ["searchTerm", "email"];
export const recipientSearchableFields: string[] = ["name", "email"];
export type IRecipientFilterRequest = {
  searchTerm?: string | undefined;
  email?: string | undefined;
  
};
