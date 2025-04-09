# Phone book demo app

This is a demo app that allows you to add entries to a phonebook database through an API built with a Java Spring Boot backend and a React Vite frontend.

## Planning

When tasked with creating a phonebook demo app, I aimed for a solution that would be simple to set up, easy to develop, and focused on demonstrating the core functionality. Here's why I chose the following technologies:

- **Spring Boot with In-Memory H2 Database**: Spring Boot is the only production viable java framework for development of backend applications with minimal configuration to get going. The in-memory H2 database was selected because it's easy to configure, doesn’t require external setup, and provides fast, temporary data storage, making it ideal for a demo app. It allows for quick testing and development without the overhead of setting up a full database system.

- **React with Vite**: React is the most used frontend javascript framework, and Vite was chosen as the build tool due to something like Next.js being too heavy for a simple application like this that has a separate backend api.

The frontend also incorporates **Tailwind CSS, Redux Toolkit, and React Hook Form**:

- Redux Toolkit is used for its powerful data fetching and caching capabilities through RTK Query, which simplifies API interaction and state management.

- Tailwind CSS is used for styling, chosen for its popularity, and my familiarity with it, allowing for fast UI development. The end result isn't pretty but it works :)

- React Hook Form helps manage form state and validation efficiently, making the phonebook form easier to develop.

## Prerequisites

- JDK 24
  [jdk download link](https://jdk.java.net/24/)
- node 22
  [node download link](https://nodejs.org/en)

Set the JAVA_HOME environment variable and add the binary to the PATH variable.

You can try setting the java language version in settings.gradle to something other than 24 if you feel like it, but I can not guarantee that it will work.

## Running the backend

Run the following gradle command in the phonebook-api directory:

```
./gradlew bootRun
```

You should at some point see a message like:
`2025-04-09T22:38:47.452+03:00  INFO 176028 --- [phonebook-api] [           main] c.e.p.PhonebookApiApplication            : Started PhonebookApiApplication in 2.06 seconds (process running for 2.25)`

## Running the frontend

Make sure that your consoles working directory is the phonebook-frontend directory.

Start by installing the dependencies:

```
npm i
```

**create a .env file** in the phonebook-frontend folder and copy the variable from env.example to it.

Run the frontend with the dev-command:

```
npm run dev
```

You should now be able to access the application frontend at http://localhost:5173
You can now add entries to the phonebook if the backend is running
