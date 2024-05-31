# Introduction

This is a chat application built with `NEXT JS`, `React-Query`, `Server Actions`, `Socket.IO` etc.

## Getting Started

First install the dependencies with

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Additional Steps to take

- To allow for image uploads, create an `uploads` folder inside the public folder. you can leave the folder empty. Or create a `Readme` file in there.

- Create a `.env` with the values in `.env.template`. Here are the keys and what they mean
  - `DATABASE_URL`: This is the postgress database url in this structure `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public`. For example: "postgresql://johndoe:randompassword@localhost:5432/mydbName?schema=public"
  - `MAILGUN_API_KEY`: This is the mailgun api-key from [mailgun](https://www.mailgun.com/) service. Creating a test account is free.
  - `MAILGUN_DOMAIN`: This is the mailgun domain from [mailgun](https://www.mailgun.com/). Creating a test account is free.
  - `JWT_KEY`: A key for JWT tokens
  - `SOCKET_ENDPOINT`: This is the endpoint associated to the [chat-socket-server](https://github.com/kenselasie/chat-sockets-server.git)
