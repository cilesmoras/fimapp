export type UtilizationStatus = {
  obligation_request_id: number;
  date: Date;
  particulars: string;
  ref_no: string;
  utilization_amount: number;
  payable: number;
  payment: number;
};
