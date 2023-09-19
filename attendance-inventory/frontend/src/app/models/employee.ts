import { Department } from "./department";
export interface Employee {
  id: INTEGER;
  name: string;
  empId: string;
  department?: Department;
  mentorId?: INTEGER;
  mentorName?: INTEGER;
}
