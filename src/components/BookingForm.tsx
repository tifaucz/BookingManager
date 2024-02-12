import React, { useState, useEffect, useRef, useContext } from 'react';
import { BookingContext } from '../BookingContext';
import Calendar from 'react-calendar';
import '../styles/Calendar.css'
import { Booking } from '../types/Booking'; 
import { v4 as uuidv4 } from 'uuid';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const BookingForm: React.FC<{}> = () => {

  const {manageBookings, bookings, selectedBooking, setSelectedBooking, isUpdate } = useContext(BookingContext);
  const emptyBooking: Booking = {
    id: uuidv4(),
    name: '',
    startDate: null,
    endDate: null,
  }

  const defaultBooking: Booking = (() => {
    if (isUpdate) {
      const bookingToUpdate = bookings.find(b => b.id === selectedBooking);
      if (bookingToUpdate) {
        return { ...bookingToUpdate }; 
      }
    }
    return emptyBooking;
  })();

  const [booking, setBooking] = useState<Booking>(defaultBooking);  

  const [calendarKey, setCalendarKey] = useState<number>(0);  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeStartDate, setActiveStartDate] = useState<Date | undefined>(undefined);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      const [start, end] = value;
      if (start && end) {
        updateBooking(start, end)
      }
    }
  };
  
  const handleDayClick = (value: Date) => {
    const dateUnavailable = isDateUnavailable(value) 
    if (dateUnavailable) {
      setSelectedBooking(dateUnavailable)
      setBooking(defaultBooking);
      setCalendarKey(prevKey => prevKey + 1);
      return
    }else{
      updateBooking(value, value)
    }
  };

  const updateBooking = (start: Date, end: Date) => {
      const newBooking = { ...booking, startDate: start, endDate: end };
      if (doBookingsOverlap(newBooking)) {
        setError('This booking overlaps with an existing booking. Please choose different dates.');
        setIsDialogOpen(true);
        if(!isUpdate) setBooking({...booking, startDate: null, endDate: null});
        setCalendarKey(prevKey => prevKey + 1);
        return;
      }
      setBooking(newBooking);
  }

  const isDateInRange = (date: Date, rangeStart: Date, rangeEnd: Date) => {
    return date >= rangeStart && date <= rangeEnd;
  };

  const isDateUnavailable = (date: Date): string | undefined => {
    for (const b of bookings) {
      if (b.startDate && b.endDate && isDateInRange(date, b.startDate, b.endDate)) {
        if(isUpdate && b.id === selectedBooking)
          return undefined 
        return b.id;
      }
    }
    return undefined;
  };

  const tileBooked = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return;
    const dateUnavailable = isDateUnavailable(date) 
    if(dateUnavailable === selectedBooking) return 'selected animate-fade-in';
    if(dateUnavailable) return 'booked';
  };

  useEffect(() => {
    if (selectedBooking) {
      const selected = bookings.find(b => b.id === selectedBooking);
      if (selected && selected.startDate) {
        setActiveStartDate(new Date(selected.startDate.getFullYear(), selected.startDate.getMonth(), 1));
      }
    }
  }, [selectedBooking, bookings]);

  useEffect(() => {
    if (isUpdate){
      setBooking(defaultBooking)
      if (nameInputRef.current) nameInputRef.current.value = defaultBooking.name;
    } else {
      if (nameInputRef.current) nameInputRef.current.value = '';
    }
  }, [isUpdate]);

  const doBookingsOverlap = (newBooking: Booking): boolean => {
    return bookings.some(b => {
      if (b.startDate && b.endDate && newBooking.startDate && newBooking.endDate && b.id != newBooking.id) {
        return (
          (newBooking.startDate >= b.startDate && newBooking.startDate <= b.endDate) ||
          (newBooking.endDate >= b.startDate && newBooking.endDate <= b.endDate) ||
          (newBooking.startDate <= b.startDate && newBooking.endDate >= b.endDate)
        );
      }
      return false;
    });
  };

  const validateBooking = (): boolean => {
    if (!booking.name.trim()) {
      setError('Name cannot be empty.');
      return false;
    }
    if (!booking.startDate || !booking.endDate) {
      setError('Please select a date.');
      return false;
    }
    if (booking.startDate && booking.endDate && doBookingsOverlap(booking)) {
      setError('This booking overlaps with an existing booking. Please choose different dates.');
      setBooking(defaultBooking);
      setCalendarKey(prevKey => prevKey + 1);
      return false;
    }
    if(!isUpdate && bookings.some(existingBooking => existingBooking.id === booking.id)) {
      setError('Error creating booking. Please try again.');
      setBooking(emptyBooking);
      setCalendarKey(prevKey => prevKey + 1);
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = () => {

    if (!validateBooking()) {
      setIsDialogOpen(true);
      return;
    }

    if (nameInputRef.current) nameInputRef.current.value = '';
    setSelectedBooking(booking.id);
    setIsDialogOpen(false);
    setCalendarKey(prevKey => prevKey + 1);
    setBooking(emptyBooking);
    manageBookings(isUpdate, booking);
  };

  const selectedDates = (): [Date, Date] | undefined => {
    if (!isUpdate && booking.endDate && booking.startDate) {
      return [booking.startDate, booking.endDate];
    }
    return undefined;
  };

  return (
    <div>
      <div className="flex justify-center my-4">
        <Calendar
          key={calendarKey}
          onChange={handleDateChange}
          onClickDay={handleDayClick}
          selectRange={true}
          value={selectedDates()}
          minDate={new Date(new Date().setHours(0, 0, 0, 0))} // Prevents timezone issues
          tileClassName={tileBooked}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate !== null ? activeStartDate : undefined)}
        />
      </div>
      {error && <dialog open={isDialogOpen} className="dialog rounded-lg bg-white p-2 shadow-xl border-2 border-red" onClick={() => setIsDialogOpen(false)}>
        <p>{error}</p>
        <button>Close</button>
      </dialog>}
      <div className="flex items-center space-x-4 p-2">
        <input
          ref={nameInputRef}
          name="name"
          defaultValue={booking.name}
          onChange={(e) => {setBooking({ ...booking, name: e.target.value })}}
          placeholder="Name"
          className="flex-1"
        />
        <button
          type="button"
          id='submit'
          onClick={() => handleSubmit()}
          className={`px-4 py-2 ${isUpdate ? "border-green text-green" : "border-blue text-blue" }`}
        >
          {isUpdate ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
