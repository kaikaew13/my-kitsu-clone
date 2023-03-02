# my-kitsu-clone

A web app I made for practice using NodeJS and ReactJS, my first ever project.
Built using MERN stack.

**note:** WIP, not responsive

### screenshots :

<img width="1432" alt="Screen Shot 2564-05-11 at 22 43 23" src="https://user-images.githubusercontent.com/77256757/117850422-79f43300-b2af-11eb-9719-d6428a2f3cfa.png">
<img width="1440" alt="Screen Shot 2564-05-11 at 22 47 09" src="https://user-images.githubusercontent.com/77256757/117850590-a6a84a80-b2af-11eb-8d9a-61d7447637f7.png">
<img width="1438" alt="Screen Shot 2564-05-11 at 23 03 13" src="https://user-images.githubusercontent.com/77256757/117850694-be7fce80-b2af-11eb-834e-cb734922530e.png">
<img width="1439" alt="Screen Shot 2564-05-11 at 22 48 08" src="https://user-images.githubusercontent.com/77256757/117850766-d6575280-b2af-11eb-8d8f-c16faae2420e.png">
<img width="1438" alt="Screen Shot 2564-05-11 at 23 03 29" src="https://user-images.githubusercontent.com/77256757/117850865-ec651300-b2af-11eb-970c-4481dfa4a219.png">
<img width="1440" alt="Screen Shot 2564-05-11 at 23 18 09" src="https://user-images.githubusercontent.com/77256757/117850938-fdae1f80-b2af-11eb-8bac-0b1c402aa3ac.png">

<img width="1432" alt="Screen Shot 2564-05-11 at 22 43 23" src="https://user-images.githubusercontent.com/77256757/117850422-79f43300-b2af-11eb-9719-d6428a2f3cfa.png">

### tech used :

- ReactJS(front-end)
- Redux(front-end)
- NodeJS(back-end)
- ExpressJS(back-end)
- MongoDB
- SocketIO

### features :

1. populate home page with animes by status
2. signup & signin
3. view animes in your library
4. filter animes in your library by watching status('Completed','Currently Watching',etc.)
5. add new anime to your library
6. create a reaction for any animes that are in your library (after posting will update every users via socketio)
7. upvote and un-upvote yours and other users reaction
8. view your followers/following list
9. follow other users (both you and the user you followed list of follower/following will be updated via socketio)
10. view others anime library + all reactions + followers/following list
11. view all animes available
12. view each specific anime
13. 404 page
14. add a new anime to the database (only user with the status 'admin', including image upload to server)
15. edit an anime ('admin' only)

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

**note:** make sure your **server** and **client** PORT are not the same

### run the application :

run npm start from both server and client directories

```
npm start
```
