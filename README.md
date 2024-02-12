# Booking App Build with React, Vite Typescript and Tailwind.

A simple project featuring a calendar and list of bookings. It uses react-calendar as despite some quirks it's easy to use and very customizable. This project also uses React's own library for context, and Vite's vitest suite for testing, as at the moment Cypress is not compatible with Vite's latest version being used. Tailwind was added as it greatly facilitates anything regarding CSS, but it was still necessary to overwrite react-calendar's styles.

## Features
- Create bookings: Click on one or 2 dates to select a range, type a name and click on Add.
- Select a booking: Use the < and > buttons to navigate bookings, or click on a booked date to select the booking.
- Update a booking: With a booking selected, click on the Update button, select a new date and/or edit the name and click on Update.
- Delete a booking: With a booking selected, click on the Delete button.





























































## Requirements
Use functional components
Create one webpage that allows a user to create / manage bookings.
The following operations must be present:
• Create a booking;
• Read a booking;
• Update a booking;
• Delete a booking.
● Global State
Store the state from bookings in a global state store of your choice.
● Validation & User Experience
Have some logic in place to prevent double (overlapping) bookings.
Validate the start and end dates for a booking.
● UI Design and Architecture knowledge
Review and enhance the overall UI design to improve functionality,
performance, scalability and readability. Make sure it has a good UI /
UX and is responsive.
● Responsive Design
The webpages should be fully responsive for desktop and mobile.
● Terminology
A booking is when a guest selects a start and end date and submits a
reservation on a property.



Implementing good tests is MANDATORY
Consider adding component and snapshot tests as well - feel free to use tools such as Cypress to do so.

Document your code and your architecture


Implement all requested Functionality
Complete all required functionalities as specified - make sure to handle all edge cases
Make sure it’s all mobile-friendly

Use known libs for common issues (such as moment.js)
Use Vite.js if possible
Write your code in Typescript if possible

UI Design and Architecture knowledge: Review and enhance the overall UI design to improve functionality, performance, scalability and readability. Make sure it has a good UI / UX and is responsive
Be sure to be able to discuss and implement improvements to your code on performance and scalability issues
Review your component architecture and be ready to explain your choices
Use Styled Components
Validate all data input
Handle errors gracefully - handle not only the happy path, but all edge cases for the implemented functionalities
Log what matters and clean up development logs before sending code


Make sure to check for this common mistakes:
“Price as string, not number”:
Use the right type for each property


“Hooks not in dedicated files”
Organize your code for better management


“Confusing location input”, “Poorly designed UI”
Create a nice looking UI, with a good UX flow


“Lack of validation”
Implement data validation for all inputs

“Manual styling”
Use libraries for styling


“Datepicker not visible on mobile”
Make sure the code is responsive and mobile-friendly