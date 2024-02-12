import { createContext, useState, ReactNode } from 'react';
import { Booking, BookingContextType } from './types/Booking';

export const BookingContext = createContext<BookingContextType>({
  bookings: [],
  deleteBooking: () => {},
  manageBookings: () => {},
  selectedBooking: '',
  setSelectedBooking: () => {},
  isUpdate: false,
  setIsUpdate:  () => {},
});

export const BookingProvider = ({ children }: {children: ReactNode}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState(false);

  const createBooking = (newBooking: Booking) => {
    return [...bookings, newBooking].sort((a, b) => {
      if (a.startDate && b.startDate) {
        return a.startDate.getTime() - b.startDate.getTime();
      }
      return 0;
    });
  };

  const updateBooking = (updatedBooking: Booking) => {
    setIsUpdate(false);
    return bookings.map(booking => 
      booking.id === updatedBooking.id ? { ...booking, name:updatedBooking.name, startDate: updatedBooking.startDate, endDate: updatedBooking.endDate } : booking
    );
  };

  const manageBookings = (update: boolean, newBooking: Booking) => {
    const updatedBookings = update? updateBooking(newBooking) : createBooking(newBooking);
    setBookings(updatedBookings);
  }

  const deleteBooking = (id: string) => {
    const index = bookings.findIndex(booking => booking.id === id);
    const updatedBookings = bookings.filter(booking => booking.id !== id);
    setBookings(updatedBookings);
    if (updatedBookings.length > 0) {
      if (index === 0) {
        setSelectedBooking(updatedBookings[0].id);
      } else {
        setSelectedBooking(updatedBookings[index - 1].id);
      }
    } else {
      setSelectedBooking('');
    }
  };

  const value = {
    bookings,
    deleteBooking,
    manageBookings,
    selectedBooking,
    setSelectedBooking,
    isUpdate,
    setIsUpdate
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};