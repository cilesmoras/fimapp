export type ObligationUtilizationStatus = {
  id?: number;
  obligation_request_id: number;
  date: string;
  particulars: string;
  ref_no: string;
  utilization_amount: number;
  payable: number;
  payment: number;
};
