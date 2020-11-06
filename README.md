# Tandem for 400

## Live Version: 

Click [HERE](https://tandem-for-400.web.app) to check out the deployed version.


## Description

Tandem for 400 is a multiple choice trivia game built with React.  Users participate in a session of trivia that consists of a series 10 questions selected from a larger collection of provided questions.  The series of questions that a player is presented with will differ from round to round and will not repeat in the same round.  Before playing, a user will be prompted to authenticate so that the application can keep track of a particular user's overall performance.  This project was built in reponse to the 2020 Apprentice Software Engineer code challenge prompt provided by Tandem.

## Project Requirements

 - A user can view questions.
 - Questions with their multiple choice options must be displayed one at a time.
 - Questions should not repeat in a round.
 - A user can select only 1 answer out of the 4 possible answers.
 - The correct answer must be revealed after a user has submitted their answer
 - A user can see the score they received at the end of the round

## Technologies Used

- Axios 0.21.0
- Bootstrap 4.5.3
- Firebase 7.24.0
- Font Awesome 5.15.1
- Moment 2.29.1
- React 17.0.1
- React DOM 17.0.1
- React Router DOM 5.2.0

## How To Run:

1. Clone down this repository to a local directory of your choosing.
2. `cd` into the repository and run `npm install` in your terminal.
3. Create a new Firebase project [HERE](https://console.firebase.google.com/).
4. Register your new Firebase project as a web app.  The selection for this should be at the top of the screen when viewing the main project console.
1. Enable authentication for this project: in the sidebar on the left, select `Authentication`.  Next select the button that says `Set up sign in method`.  From there select `Google` and then select `Enable`.  At this point you will be prompted to input an email in the text field labelled `Project Supported Email`.  Enter a Gmail address of your choosing and then click `Save`.
4. At `src/helpers`, create a `apiKeys.json` file.  Within this file, insert the Firebase keys that were generated at the creation of your new Firebase project.  Please reference `apiKeys.example.json` to structure this file correctly.  Double check that `apiKeys.json` is included in the `.gitignore` file.
5. In your new Firebase project, in the sidebar on the left, select `Realtime Database`.  Next, click the button that says, `Create Database` at appears at the top.  In the subsequent modal that appears, select `Start in test mode` and click `Enable`.
6. In the next screen, you will need to upload the seed data.  Click on the vertical ellipsis icon at the right of the screen and select `Import JSON`.  Next, select `Browse`.  You will need to then navigate to the current project directory and find the folder labeled `db` which contains our seed JSON files.  First, upload the file called `!base.json`.  Then, click on each node of the `!base.json` file in Firebase (players, question_options, questions, etc.) and upload each respective JSON file in the `db` directory.
7. Next, click on the tab labeled `Rules` in Firebase and make sure the rules object looks like the following: 
```js
{
  "rules": {
    ".read": "now < 1606284000000",  // 2020-11-25
    ".write": "now < 1606284000000",  // 2020-11-25
      "players": {
        ".indexOn": "email"
      },
    "question_options": {
      ".indexOn": "question_id"
    }
  }
}
```
7. In your terminal in the project directory, run `npm start`.  Your browser should automatically open to `localhost:3000` and the app should be up and running.  If this is not the case, run `hs -p 3000` and then navigate to [https://localhost:3000](https://localhost:3000).
