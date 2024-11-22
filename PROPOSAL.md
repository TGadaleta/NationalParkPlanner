# Tony's National Park Trip Planner Proposal

## Project Description
My app is a trip planner for visiting America's National Parks. A user will be able to view pertinent information about a National Park (dates closed, address, if camping is available, etc.), create Trips which will hold the parks that a user is planning on going to between certain dates, view, edit, and delete those Trips, favorite Parks to access quicker, and view other users trips to the Park.


## User Stories
#### MVP Goals
* AAU, I want to be able to create a unique user account
* AAU, I want to be able to edit my user account
* AAU, I want to be able to view all the National Parks
* AAU, I want to view a page on a Park that contains all pertinent information on it
* AAU, I want to be able to favorite a Park
* AAU, I want to create Trips which will contain the dates I am on the trip and the Park(s) I am visiting
* AAU, I want to be able to view my profile, which contains my Trips and my Favorite Parks
* AAU, I want to edit my Trips, or delete them
* AAU, I want to see total entrance fee cost for each of my Trips

#### Stretch Goals
* AAU, I want to be able to see which other users have favorited a park
* AAU, I want to be able to see other users planned Trips
* AAU, I want to be able to leave a comment on a Park page


## Wire Frames
### Signup/Signin Index Page

![Index Page](./assets/1%20App%20Signup%20Signin%20Page.png 'Index Page')
![Signup Page](./assets/2%20App%20Signup%20Page.png 'Signup Page')
![Profile Homepage](./assets/2%20App%20Profile%20Homepage%20.png 'Profile Homepage')
![My Trips Page](./assets/3%20App%20My%20Trips%20Page.png 'My Trips Page')
![All Parks Page](./assets/3%20App%20All%20Parks%20Page.png 'All Parks Page')
![Solo Park Page](./assets/4%20App%20Solo%20Park%20Page.png 'Solo Park Page')
![Single Trip Page](./assets/4%20App%20Single%20Trip%20Page.png 'Single Trip Page')
![Edit Trip Page](./assets/5%20App%20Single%20Trip%20Edit%20Page.png 'Edit Trip Page')


## ERD
![App ERD](./assets/App%20ERD.png 'App ERD')


## Route Table

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
|View Favorites| /user/:userId/favorites | view all favorite parks| GET|
|All Trips| /user/:userId/trips| view all user trips| GET|
|New Trip| /user/:userId/trips/new| form for new trip| GET|
|Create Trip| /user/:userId/trips| creating new trip| POST|
|Single Trip| /user/:userId/trips/:tripId| view a single trip| GET|
|Edit Trip| /user/:userId/trips/:tripId/edit| form for editing trip| GET|
|Update Trip| /user/:userId/trips/:tripId| update trip after edit| PUT
|Delete Trip| /user/:userId/trips/:tripId| delete trip| DELETE|


## Psuedocode

```
Pages
Login EJS containing signin and signup buttons
    signup goes to signup form
    signin goes to profile page
Nav Bar
    Home goes to profile
    Parks goes to all parks view
    My Trips goes to all user trips
    Signout ends session and returns to Login page
Signup EJS containing create a user field and buttons
    username, email, password, confirm password
    create goes to profile page
Profile EJS containing lists of planned trips and favorited parks
    edit button goes to edit form
    each trip is a link to the individual trip
    each park is a link to the individual park
    view all links for both trips and parks
Edit Profile EJS allowing to change user info
    username cannot be changed
    password can be changed if original password is given
    button updates and returns to profile
All parks EJS showing all parks in alphabetical order
    each entry is a link that goes to the individual park
    contains information such as open/close date, state etc
Single park EJS showing all information about the park
    dates, description, full address, etc.
    button that adds park to user favorite parks
All trips EJS showing all the trips created by the user
    each entry is a link that goes to the individual trip
    button to create a new trip
New Trip EJS form for creating a new trip
    choose parks from database and dates for trip
Single trip EJS includes all parks, dates, and passes for trip
    button to edit trip
Edit trip EJS allowing to change trip info or delete

controllers
authentication controller
    includes user creation and editing controls
parks contorller
    show all, show one, favorite
trips controller
    create, show all, show one, update, delete
server controller
    handling the index route and middleware

database connection file

middleware
    read form information
    user info is passed by session data
    verify user when attempting CRUD functions
    method override to all for PUT and DELETE
```
Timeline

| Date  | Task      |Notes
|---    |---          |--- |
|Fri, Nov 22| final approval, create schema, seed database| user, trips, parks|
|Sat, Nov 23| nav bar partial initiate server.js||
|Sun, Nov 24| create create user page and user profile page|auth controler|
|Mon, Nov 25| all park page, single park page, and routes|park controller|
|Tue, Nov 26| deployment||
|Wed, Nov 27| view, create, edit, delete trips pages|trips contoller|
|Thu, Nov 28| Thanksgiving| DAY OFF|
|Fri, Nov 29| style pages||
|Sat, Nov 30| add favorite park functionality||
|Sun, Dec 01| finish up MVPs and start stretch goals||
|Mon, Dec 02| continue with stretch goals||
|Tue, Dec 03| presentation||