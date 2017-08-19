# before run
install node.js v6+, then, after you cloned repo, run
```
npm i
```

# run scripts
You may see all run scripts in package.json. You will find in there build scripts that are not described in this readme, and place where MongoDB url is set. I'm using MongoLabs, so you don't need Mongo to be installed locally (it is a test task anyway).

## Run backend
```
npm run server:nodemon
```

## Run frontend 
```
npm run start-ui
```

# Unsecured things

If app is running in http, it will be unsecured by default.
Some places can be unsecured, like empty username and password on backend, but it compares password by hash. 
Update request is also unsafe.
Access to images is unsecured.
Update button will be never disabled, even if inputs were touched.
Registration is quite unsafe (we don't ask to confirm anything via email).
Images are stored locally, not on remote service, and db is remote, so if you somehow access users that I've created - you will be not able to see their images.

