export interface TransportBill {
  id: INTEGER;
  consigneeName: string;
  rcNo: string;
  gstin: string;
  date: Date;
  purpose: string;
  vehicleType: string;
  vehicleNo: string;
  from: string;
  to: string;
  purchaseOrderNo: string;
  exciseNo: string;
  remarks: string;
  goods: Goods[];
}
export interface Goods {
  id: INTEGER;
  description: string;
  quantity: INTEGER;
  totalAmount: INTEGER;
}
