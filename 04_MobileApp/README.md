### What is this repository for? ###

This repository has the code for mobile application. The users may login or signup via the APP. They may also enter patient data and generate scores. React Native (EXPO) technology is used here.

### Prep ###

- First make sure that npm is install in your system.
- Install expo through npm if not installed previously.
- Update the URLs in the **app.json** file. **URL** should point to the backend server whose code is found here **'02_Backend'** and the online score prediction service whose code is found here **06_PredictionCode_Online**.
- The mobile app also uses firebase for carrying out 2 factor authentication (Mobile OTP verification). Please update the file **firebase.js** in the folder /app/database
