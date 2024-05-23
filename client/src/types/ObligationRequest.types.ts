export type ObligationRequest = {
  id?: number;
  serial_no: string;
  fund_cluster: string;
  payee: string;
  payee_office: string;
  payee_office_address: string;
  particulars: string;
  date: string;
};

export type ViewObligationRequest = {
  id?: number;
  serial_no: string;
  fund_cluster: string;
  payee: string;
  payee_office: string;
  payee_office_address: string;
  particulars: string;
  date: string;
  total_amount: number;
};
