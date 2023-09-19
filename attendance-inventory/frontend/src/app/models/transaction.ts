export interface Transaction {
  id: INTEGER;
  inventoryId: INTEGER;
  inventoryItem?: string;
  userName?: string;
  userId?: INTEGER;
  date: Date;
  inward: INTEGER;
  outward: INTEGER;
}
