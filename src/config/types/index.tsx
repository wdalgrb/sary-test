export interface EmployeeType {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  date: string;
  user_phone?: string;
  user_name?: string;
}

export interface filterItemsType {
  name: string;
  phone: string;
  email: string;
  date: string;
  country: string;
  company: string;
}
