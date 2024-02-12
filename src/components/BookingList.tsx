import React, { useContext, useMemo } from 'react';
import BookingItem from './BookingItem';
import { BookingContext } from '../BookingContext';

const BookingList: React.FC<{}> = () => {
  const { bookings, selectedBooking, setSelectedBooking, isUpdate, setIsUpdate } = useContext(BookingContext);
  const selectedBookingIndex = bookings.findIndex(booking => booking.id === selectedBooking);
  
  const validBookings = useMemo(() => {
    return bookings.filter(booking => booking.startDate != null && booking.endDate != null);
  }, [bookings]);

  const handleNext = () => {
    const nextIndex = (selectedBookingIndex + 1) % validBookings.length;
    setSelectedBooking(validBookings[nextIndex].id);
  };

  const handlePrevious = () => {
    const prevIndex = (selectedBookingIndex - 1 + validBookings.length) % validBookings.length;
    setSelectedBooking(validBookings[prevIndex].id);
  };

  return (
    <div className="flex items-center justify-between">
      {bookings.length > 0 && selectedBooking && (
        <>
          <button 
            onClick={handlePrevious}
            className={`${isUpdate || validBookings.length<2 ? 'invisible' : ''}`}
          >{'<'}</button>
          <div className='w-full p-4'>
            <BookingItem
              onUpdate={() => {setIsUpdate(true)}}
              onCancel={() => {setIsUpdate(false)}}
            />
          </div>
          <button 
            onClick={handleNext}
            className={`${isUpdate || validBookings.length<2 ? 'invisible' : ''}`}
          >{'>'}</button>
        </>
      )}
    </div>
  );
};
export default BookingList;