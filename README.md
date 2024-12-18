# National Park Trip Planner

## Description
The National Park Trip Planner is an app that allows the user to plan trips to any of the US National Parks. They can pick a park, a start date and an end date. They can also favorite parks to make them accessible from their homepage.

#### URL:  [Game deployed on Heroku](https://national-park-trip-planner-46d300a02e57.herokuapp.com/)

#### Technologies Used
* Javascript
* EJS
* CSS
* ChatGPT

## Screenshot - User Home Page

![Signed In Homepage](./assets/Signed%20In%20App%20Homepage.png 'Signed In Homepage')

## Instructions

To sign up, click the signup button on the index page. Next you will have to enter a unique username, an email address, and a password which you need to confirm. The password must include a capital letter, a lowercase letter, a special character, a number, and must be 8 characters long. Once the requirements are met, the user will be signed in with the new credentials. If the user returns to the app, they will be able to use the same username and password to access the app and their information. They can also edit their email, and change their password as long as they have access to their original password. 
Once signed in, the user can create trips by going to My Trips in the nav bar, then clicking on the Create a New Trip link. On this page, the user can pick a start and end date for their trip and the park they will be traveling to from the list of 171 National Parks. After they have created a trip, they can return to edit the trip by clicking on the Trip hyperlink.
A user can also view all National Parks by clicking on the Parks link in the nav bar. This will lead to a list of all the parks with some imformation about them. To view more detailed information, the user can click on any of the park links to go to a new page with the park information and a picture from the national database. Finally from this screen, a user can favorite a park, which will have it show up on their homepage.

## MVPs and Stretch Goals
#### MVPs
* AAU, I want to be able to create a unique user account
* AAU, I want to be able to edit my user account
* AAU, I want to be able to view all the National Parks
* AAU, I want to view a page on a Park that contains all pertinent information on it
* AAU, I want to be able to favorite a Park
* AAU, I want to create Trips which will contain the dates I am on the trip and the Park(s) I am visiting
* AAU, I want to be able to view my profile, which contains my Trips and my Favorite Parks
* AAU, I want to edit my Trips, or delete them
* AAU, I want to see total entrance fee cost for each of my Trips

#### Stretch Goals (Incomplete)
* AAU, I want to be able to see which other users have favorited a park
* AAU, I want to be able to see other users planned Trips
* AAU, I want to be able to leave a comment on a Park page

## Development Process

#### Phase 1: Planning
1. Define Requirements:

    Create an app that allows a user to view all the National Parks, pick their favorites, and pick a start and end date and a park for a "trip".
2. Project Structure:

    Set up separate files for EJS (views), CSS (styling), and JavaScript (backend logic).
    Outline the core functions needed for creating and editing an account, creating and editing a trip, and adding and removing favorite parks.
3. Seeding Database:

    Find and use the National Park Service API to seed my database with park information that is used in the app.

#### Phase 2: Design
1. UI/UX Design:

    Have a simple design of pages for the user to sign in, view trips and favorite parks. 
2. Wireframing:

    Sketched out a layout for each page.
3. ERD:
![App ERD](./assets/Final%20App%20ERD.png 'App ERD')

4. Routing Table:

| Name  | Endpoint   |  Purpose | Http Method   |
|---    |---         |---        |---            |
|Index  | /          | sign-in/sign up page | GET|
|New User| /user/new | form for new user    | GET|
|Create User| /user  | creating new user    | POST|
|Profile| /user/:userId| profile page for user| GET|
|Edit User| /user/:userId/edit| form for editing user| GET|
|Update User| /user/:userId| update user after edit| PUT|
|All Parks| /parks |view all parks| GET|
|Single Park| /parks/:parkId|   view single park|   GET|
|Favorite Park| /parks/:parkId/:userId| add to favorite parks| POST|
|All Trips| /user/:userId/trips| view all user trips| GET|
|New Trip| /user/:userId/trips/new| form for new trip| GET|
|Create Trip| /user/:userId/trips| creating new trip| POST|
|Edit Trip| /user/:userId/trips/:tripId/edit| form for editing trip| GET|
|Update Trip| /user/:userId/trips/:tripId| update trip after edit| PUT
|Delete Trip| /user/:userId/trips/:tripId| delete trip| DELETE|

#### Phase 3: Implementation
1. EJS Structure:

    View for each page
2. JavaScript Functionality:

    API and backed coding to handle routes and passing of data to each view.

3. CSS Styling

    Referenced Chat-GPT for basic styling design

    
#### Phase 4: Testing and Refinement

1. Initial Testing:

    Make sure a trip could be created and that favorite parks could be added correctly.
2. Editing Testing

    Make sure a user, trip and favorite parks could be edited.

#### Phase 5: Documentation and Deployment
1. Documentation:
    
    Updated ERD and Route Table to reflect final project implementation.

    Wrote this README file to guide users through the explination of the development process in detail.

2. Deployment:

    Deployed to Heroku to open testing to the public.