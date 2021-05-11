# my-kitsu-clone

A web app I made for practice using NodeJS and ReactJS, my first ever project.
Built using MERN stack.

### tech used :

- ReactJS(front-end)
- Redux(front-end)
- NodeJS(back-end)
- ExpressJS(back-end)
- MongoDB
- SocketIO

### install :

##### requirements :

- npm
- mongodb cluster

##### clone my repo :

```
git clone https://github.com/kaikaew13/my-kitsu-clone.git
cd my-kitsu-clone
```

###### inside my-kitsu-clone will have server and client directories.

###### cd into those directories and run npm i.

```
npm i
```

##### inside server directory create nodemon.json file and add these 2 environment variables in :

```JSON
{
  "env": {
    "MONGO_URI": "<your mongodb connection string>",
    "PORT": "<your port number>"
  }
}
```

##### inside client directory create .env file and add :

```
REACT_APP_URL=http://localhost:<your port number>
```

**note:** make sure your server and client PORT are not the same

### run the application :

run npm start from both server and client directories

```
npm start
```
