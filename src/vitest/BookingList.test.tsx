import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BookingList from '../components/BookingList'; 
import { BookingContext } from '../BookingContext';
import { addDays } from 'date-fns';
import { ReactNode } from 'react';
import { BookingContextType } from '../types/Booking';

const defaultContext = {
    bookings: [],
    manageBookings: vi.fn(),
    deleteBooking: vi.fn(),
    createBooking: vi.fn(),
    selectedBooking: '',
    setSelectedBooking: () => {},
    isUpdate: false,
    setIsUpdate: () => {},
  };

const MockBookingProvider = ({ children, context }: {
    children: ReactNode;
    context: BookingContextType;
  }) => {
  return (
    <BookingContext.Provider value={context}>
      {children}
    </BookingContext.Provider>
  );
};

describe('<BookingList />', () => {
  it('check if selected booking is rendered', async () => {

    const bookings = [
        {
          id: '1',
          name: 'Booking One',
          startDate: new Date(),
          endDate: addDays(new Date(), 1),
        },
        {
          id: '2',
          name: 'Booking Two',
          startDate: addDays(new Date(), 2),
          endDate: addDays(new Date(), 3),
        },
    ];

    render(
      <MockBookingProvider context={{...defaultContext, bookings, selectedBooking: bookings[0].id, }}>
        <BookingList />
      </MockBookingProvider>
    );

    await waitFor(() => {
        expect(screen.getByText('Booking One')).toBeInTheDocument();
        expect(screen.queryByText('Booking Two')).not.toBeInTheDocument();
    });

  });

  it('navigates to the next and previous bookings', async () => {
    const bookings = [
        {
          id: '1',
          name: 'Booking One',
          startDate: new Date(),
          endDate: addDays(new Date(), 1),
        },
        {
          id: '2',
          name: 'Booking Two',
          startDate: addDays(new Date(), 2),
          endDate: addDays(new Date(), 3),
        },
        {
            id: '3',
            name: 'Booking Three',
            startDate: addDays(new Date(), 2),
            endDate: addDays(new Date(), 3),
        },
    ];
    const setSelectedBookingSpy = vi.fn();

    render(
      <MockBookingProvider context={{...defaultContext, bookings, setSelectedBooking: setSelectedBookingSpy, selectedBooking: bookings[0].id, }}>
        <BookingList />
      </MockBookingProvider>
    );

    userEvent.click(screen.getByText('>'));
    await waitFor(() => {
        expect(setSelectedBookingSpy).toHaveBeenCalledWith(bookings[1].id);
    });

    userEvent.click(screen.getByText('<'));
    await waitFor(() => {
        expect(setSelectedBookingSpy).toHaveBeenCalledWith(bookings[2].id);
    });

  });

  it('hides navigation buttons when updating a booking', async () => {
    const bookings = [
        {
          id: '1',
          name: 'Booking One',
          startDate: new Date(),
          endDate: addDays(new Date(), 1),
        },
        {
          id: '2',
          name: 'Booking Two',
          startDate: addDays(new Date(), 2),
          endDate: addDays(new Date(), 3),
        },
    ];

    render(
        <MockBookingProvider context={{...defaultContext, bookings, selectedBooking: bookings[0].id, isUpdate: true, }}>
        <BookingList />
      </MockBookingProvider>
    );

    await waitFor(() => {
        expect(screen.getByText('>')).toHaveClass('invisible');
        expect(screen.getByText('<')).toHaveClass('invisible');
    });
    
  });
});
