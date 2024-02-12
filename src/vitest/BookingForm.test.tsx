import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from '../components/BookingForm';
import '@testing-library/jest-dom';
import { addDays, format } from 'date-fns'; // You may need to install date-fns if you haven't already
import { BookingContext } from '../BookingContext';
import { ReactNode } from 'react';
import { Booking, BookingContextType } from '../types/Booking';


const manageBookingsSpy = vi.fn();

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

// Create a mock context provider with a spy for manageBookings
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

describe('BookingForm', () => {
  it('renders the form with name, start date, and end date inputs', () => {

    render(
      <MockBookingProvider context={defaultContext}>
        <BookingForm />
      </MockBookingProvider>
    );
    
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('prevents user from submiting without a name', async () => {
    render(
      <MockBookingProvider context={{...defaultContext, manageBookings: manageBookingsSpy}}>
        <BookingForm />
      </MockBookingProvider>
    );

    // Simulate user input for the start date and end date
    const startDate = addDays(new Date(), 2);
    const endDate = addDays(new Date(), 5);
    
    // Format the dates to match the aria-label format used by react-calendar
    const startDateLabel = format(startDate, 'MMMM d, yyyy'); // e.g., "February 19, 2024"
    const endDateLabel = format(endDate, 'MMMM d, yyyy'); // e.g., "February 22, 2024"
    
    // Query the buttons by their aria-label
    const startDateButton = screen.getByLabelText(startDateLabel);
    const endDateButton = screen.getByLabelText(endDateLabel);
    
    // Simulate user clicking on start date and end date
    userEvent.click(startDateButton);
    userEvent.click(endDateButton);
    
    // Simulate form submission
    userEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      // Check if the error message is displayed in a dialog
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Name cannot be empty.')).toBeInTheDocument();
    });
  });

  it('prevents user from submiting without selecting a date', async () => {
    render(
      <MockBookingProvider context={{...defaultContext, manageBookings: manageBookingsSpy}}>
        <BookingForm />
      </MockBookingProvider>
    );

    // Simulate user input for the name
    const nameInput = screen.getByPlaceholderText(/name/i);
    await userEvent.type(nameInput, 'John Doe');
    
    // Simulate form submission
    userEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      // Check if the error message is displayed in a dialog
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Please select a date.')).toBeInTheDocument();
    });
  });

  it('allows a user to enter a name, select dates, and submit a booking', async () => {
    // Render the BookingForm with the MockBookingProvider
    render(
      <MockBookingProvider context={{...defaultContext, manageBookings: manageBookingsSpy}}>
        <BookingForm />
      </MockBookingProvider>
    );

    // Simulate user input for the name
    const nameInput = screen.getByPlaceholderText(/name/i);
    await userEvent.type(nameInput, 'John Doe');

    // Simulate user input for the start date and end date
    // Assuming you have inputs with these labels
    const startDate = addDays(new Date(), 2);
    const endDate = addDays(new Date(), 5);
    
    // Format the dates to match the aria-label format used by react-calendar
    const startDateLabel = format(startDate, 'MMMM d, yyyy'); // e.g., "February 19, 2024"
    const endDateLabel = format(endDate, 'MMMM d, yyyy'); // e.g., "February 22, 2024"
    
    // Query the buttons by their aria-label
    const startDateButton = screen.getByLabelText(startDateLabel);
    const endDateButton = screen.getByLabelText(endDateLabel);
    
    // Simulate user clicking on start date and end date
    userEvent.click(startDateButton);
    userEvent.click(endDateButton);
    
    // Simulate form submission
    userEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(manageBookingsSpy).toHaveBeenCalledWith(false,expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
        startDate: expect.any(Date),
        endDate: expect.any(Date),
      }));
    });

  });

  it('should not allow booking overlaping dates with another booking', async () => {
    const bookings: Booking[] = [
      {
        id: '1',
        name: 'Mary Sue',
        startDate: addDays(new Date(), 3),
        endDate: addDays(new Date(), 4),
      }
    ]
    render(
      <MockBookingProvider context={{...defaultContext, manageBookings: manageBookingsSpy, bookings}}>
        <BookingForm />
      </MockBookingProvider>
    );

    // Simulate user input for the name
    const nameInput = screen.getByPlaceholderText(/name/i);
    await userEvent.type(nameInput, 'John Doe');

    // Simulate user input for the start date and end date
    const startDate = addDays(new Date(), 2);
    const endDate = addDays(new Date(), 5);
    
    // Format the dates to match the aria-label format used by react-calendar
    const startDateLabel = format(startDate, 'MMMM d, yyyy'); // e.g., "February 19, 2024"
    const endDateLabel = format(endDate, 'MMMM d, yyyy'); // e.g., "February 22, 2024"
    
    // Query the buttons by their aria-label
    const startDateButton = screen.getByLabelText(startDateLabel);
    const endDateButton = screen.getByLabelText(endDateLabel);
    
    // Simulate user clicking on start date and end date
    userEvent.click(startDateButton);
    userEvent.click(endDateButton);
    
    // Simulate form submission
    userEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      // Check if the error message is displayed in a dialog
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('This booking overlaps with an existing booking. Please choose different dates.')).toBeInTheDocument();
    });
  });

});
