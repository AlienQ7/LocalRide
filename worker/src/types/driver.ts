export type VehicleType =
  | "bike"
  | "auto"
  | "car";

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleType: VehicleType;
  vehicleNumber: string;
  licenseNumber: string;
  verified: boolean;
}
