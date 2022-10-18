# Coding Challenge for Axon Company

## ⚠️ You need to setup up backend and frontend servers at the same time, here is the guide:

## How to setup the backend server:

## 🔴 You will need Node version >= 18.0.0 for this to work properly.

### 1) Install the dependencies:

```
npm i
```

### 2) Compile the typescript files to a single javascript files. run:

```
npm run build
```

### 3) Run the server:

```
npm start
```

## How to setup the frontend server:

### 1) Install the dependencies:

You have to have yarn installed on your system.

```
yarn
```

### 2) Create the production bundle:

```
yarn build
```

### 3) Start the server:

```
yarn start
```

### You can use the project now with diffrent people (you can simulate that with opening multiple tabs) and start chatting with each other. Everyone will get notified when a new room is craeted.

### The tech-stack for this project is Typescript, Next, SCSS, Node, Express and Socket.io.

### I decided to keep everything really simple. There was no need to use a state manager so I went with Context API. There is no db involved so your data will be gone on closing the sessions.

### I also didn't remove the env files for convenience.
