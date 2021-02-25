### What is this repository for? ###

This repository has the API code for our application. 

### How do I get set up? ###

To run the backend application do the following.

- Install the node modules using the npm -i command.
- run npm start to spin up a develoment server.

### Configuration Files ###

Set the appropriate parameters in the **settings.js** file in the **/config** folder. Given below are the various parameters that have be entered in this file.

    - local_host - The database host server
    - local_user  -The database user 
    - local_password - The database password
    - local_db - The database name
    - db_type - Database type (mysql in our case).
    - port - Database Port

Also, the backend service also uses firebase to store the reports uploaded by the user and also validate mobile app users. Please set up the appropriate firebase bucket and configuration. Please note that access to firebase admin API is required More info here:- https://firebase.google.com/.  Please update the file **auth/firebase.js** accordingly.

For user maintainance we use a service called AUTH0. Various parameters for AUTH0 needs to be set up and an account needs to created in the Auth0 service for the user signup / login process to work. Further information may be obtained from https://auth0.com/docs

Finally the APP sends a welcome email using the sendgrid service. You may signup for Sendgrid and enter the API key here. More info here :- https://sendgrid.com/docs


