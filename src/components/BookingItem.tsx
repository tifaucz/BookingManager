import React, { useContext, useState, useEffect } from 'react';
import { Booking } from '../types/Booking';
import { BookingContext } from '../BookingContext';

interface BookingItemProps {
  onUpdate: (booking: Booking) => void;
  onCancel: () => void;
}

const BookingItem: React.FC<BookingItemProps> = ({ onUpdate, onCancel }) => {
  const { selectedBooking, bookings, isUpdate, deleteBooking } = useContext(BookingContext);
  const booking = bookings.find(booking => booking.id === selectedBooking);
  const [animationKey, setAnimationKey] = useState(0);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1);
  }, [selectedBooking]);

  if(booking && booking.startDate && booking.endDate)
    return (
      <div key={animationKey} className="shadow-xl rounded-lg p-4 mb-4 animate-fade-in w-full">
        <div className="mb-2">
          <label className="font-bold">Booking for:</label> 
          <p>{booking.name}</p>
        </div>
        <div className="mb-2">
          <label className="font-bold">From:</label> 
          <p>{booking.startDate && formatDate(booking.startDate)}</p>
        </div>
        <div className="mb-4">
          <label className="font-bold">To:</label> 
          <p>{booking.endDate && formatDate(booking.endDate)}</p>
        </div>
        <div className="flex justify-between"> 
          {!isUpdate && (<><button
            onClick={() => onUpdate(booking)}
            className="border-black text-black py-2 px-4 rounded " 
          >
            Edit
          </button>
          <button
            onClick={() => deleteBooking(booking.id)}
            className="border-red text-red py-2 px-4 rounded"
          >
            Delete
          </button></>)}

          {isUpdate && (
          <button
            onClick={() => onCancel()}
            className="border-red text-red py-2 px-4 rounded"
          >
            Cancel
          </button>)}

        </div>
      </div>
    );
};

export default BookingItem;
