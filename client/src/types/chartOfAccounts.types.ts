// import { z } from "zod";

// export const chartsOfAccountsSchema = z.object({
//   code: z.string().min(4).max(45),
//   name: z.string().min(1).max(250),
//   description: z.string().max(250).optional(),
// });

// export type ChartOfAccounts = z.infer<typeof chartsOfAccountsSchema> & {
//   id?: number;
// };

export type ChartOfAccounts = {
  id?: number;
  allotment_classes_id: number;
  code: string;
  name: string;
};
