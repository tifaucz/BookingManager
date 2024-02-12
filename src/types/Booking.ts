// src/types/Booking.ts
export interface Booking {
  id: string;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
}

export type BookingContextType = {
  bookings: Booking[];
  deleteBooking: (bookingId: string) => void;
  manageBookings: (update: boolean, booking: Booking) => void;
  selectedBooking: string;
  setSelectedBooking: React.Dispatch<React.SetStateAction<string>>;
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};
