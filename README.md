#  Frontend by Lucas Low Yee Yung
### Purpose
Quick within 72 hours built up data table from json file.

Installation 
```
yarn install
yarn dev
```

### Features
- Table, date range filter, search filter, sorting, pagination
- React route to particular accounts details

### Plan, todos and structure for future improvements
- Start development on mobile responsiveness on the first time
- Speed up Redux-toolkit setup with modifier actions boilerplate
- Iterate each functionality then commit instead
- Improve performance and reduce memory usage

### Summary of Thought process, Design and Experience
<br> This is more of a thought and decision process for this project and a note for the future

## Unit, E2E, Tntegration test, linter
 Use Ts-jest for unit tests, react-testing-library for react test. Perform E2E, integration test with Cypress for routing navigation and user interaction. Eslint to test linter errors.

## Design System
I've realized standardization of development process is really needed especially in collborative envornment for consistent pattern readability and that depends on leadership.

I've gone with Nextjs highly opinionated framework for now with its static site generation capabilities especially for SEO optimization down the line.

## Mantine
I've considered antD and MaterialUI (but daterangepicker is only now available in pro).
Chose to go with Mantine as its by default built with typescript so its more convenient to combine with Typescript development for me (plus high recommendations to try it out on Reactjs subreddit so decided to try it out) 

The experience using the library has been quite positive for me compared to MUI. In the end, Mantine is very convenient with unstyled props and inbuilt hooks especially for this project size.

## Typescript
I've based on the [TypeScript React Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) for opinionated best practices, its been touted for collaborative development with static types and type checking, so far can understand why. Frequently reused types will have top level types.ts file while react components specific wil be in same file.

## Redux with Redux-Toolkit
Initially avoided Redux figuring unnecessary complexity and time consuming for this project. Redux results in more robust, scalable and easier to reason about. Redux Toolkit massively simplifies the process. 

[Redux Style Guide](https://redux.js.org/style-guide/) folder architecture interestingly does it with features in 1 folder with slice, reducer logic and react component in it. Makes things more readable.

## NEXTJS
I went with Nextjs because of its server-rendered React App in the future as the pagination for large data should be done in backend 
Meanwhile was recommended to try out Nextjs for its opinionated style and typescript support by default by my Futurelab programme mentor.

## Theming
I used Mantine theme thats just an object to give the app uniform look and feel that wraps MantineProvider as global theming with fontFamily 'Space Grotesk': ; because by default Mantine uses system fonts according to devices; macOS vs windows different font etc. In future, easier to adjust for responsiveness and requirements with hooks connected to this object.

## Conclusions
All in all, this was a great exercise,decide consider multiple technologies and learn new ones. Really had to make last minute time bound decisions due to my covid positive clash with the timelimit set for myself.
