# NotSquare

NotSquare is a web application for posting and viewing upcoming events. NotSquare was inspired by Meetup and built using React with Redux, and postgreSQL.
<br>
<br>
Explore the web application at [NotSquare](https://not-square.herokuapp.com)
<br>
<br>
### [Feature List](https://github.com/Geoffst3r/not-square/wiki/feature-list)
### [Database Schema](https://github.com/Geoffst3r/not-square/wiki/database-schema)
### Landing/Home Page:
![image](https://github.com/Geoffst3r/not-square/blob/main/images/landing-page.PNG)
<br>
### Event Creation Modal:
![image](https://github.com/Geoffst3r/not-square/blob/main/images/event-creation.PNG)
<br>
### Event Page:
![image](https://github.com/Geoffst3r/not-square/blob/main/images/single-event.PNG)
<br>
### Details:
The signup and login pages are modal in addition to event creation. NotSquare has different functionality depending on who the user is:
* on the home page:
> * if the user is logged in, a list of events will be shown that they have created (if none have been created, a message will display indicating that) and a button that opens the event form modal.
> * if the user is not logged in, a message will display that they need to log in to view events they have posted.
* on the event page:
> * if the user is logged in *AND* the creator of the event, they are given the option to edit or delete the event.
> > * the event modal will show with current event information when choosing to edit the event.
> * if the user is logged in *BUT NOT* the creator of the event, they are given the option to 'RSVP' to say whether they are attending an event.
> * if the user is not logged in, a message is displayed that they need to log in to RSVP
* all users can access all events from the home page
<br>
To-Do:
* let users view events that they are attending
* display event creation form from dropdown menu
* have number of attendees for an event
