export interface BookingDetails {
  departure: string;
  arrival: string;
  departDate: Date;
  returnDate?: Date;
  passengers: number;
  oneway: boolean;
  refine?: number;
}
