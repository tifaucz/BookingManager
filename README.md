# Booking App Build with React, Vite, Typescript and Tailwind.
![image](https://github.com/tifaucz/BookingManager/assets/15833226/98402649-bfb6-418a-9185-839b847055f8)

A simple project featuring a calendar and list of bookings. It uses react-calendar as despite some quirks it's easy to use and very customizable. This project also uses React's own library for context, and Vite's vitest suite for testing, as at the moment Cypress is not compatible with Vite's latest version being used. Tailwind was added as it greatly facilitates anything regarding CSS, but it was still necessary to overwrite react-calendar's styles.

## Features
- Create bookings: Click on one or 2 dates to select a range, type a name and click on Add.
- Select a booking: Use the < and > buttons to navigate bookings, or click on a booked date to select the booking.
- Update a booking: With a booking selected, click on the Update button, select a new date and/or edit the name and click on Update.
- Delete a booking: With a booking selected, click on the Delete button.
