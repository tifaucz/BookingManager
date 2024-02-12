import React from 'react';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList'; 
import { BookingProvider } from './BookingContext';

const App: React.FC = () => {

  return (
    <BookingProvider>
      <div className="p-2 w-full h-full font-inter font-normal text-base text-[#00318d] bg-[#eae2dc] antialiased">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" >Booking Manager</h1>
        <BookingForm />
        <BookingList />
      </div>
    </BookingProvider>
  );
};

export default App;