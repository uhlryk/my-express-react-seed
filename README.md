# Express React seed

## Installation:

How to use this code as new app:

1 Clone this repository to new empty dir:

    git clone https://github.com/uhlryk/my-express-react-seed.git newDirectory

2 Create your app repository

3A Change remote git url to your repository url

    git remote set-url origin https://github.com/yournick/your-app-url.git
    
3B If you don't want to have this boilerplate commit history you can remove it and create new own git init:

    rm -rf .git
    git init
    git remote add origin https://github.com/yournick/your-app-url.git
    git add .
    git commit

4 change app info in package.json 

5 update npm modules

    npm install

6 copy server config file and name it server.local.js

    cp src/configs/server.js src/configs/server.local.js
    
7 copy server config file and name it server-test.local.js

    cp src/configs/server.js src/configs/server-test.local.js

8 edit locals config files. This files are only local, therefore in production they have to be created too.

## Server Commands:

Transform all server source files:

    gulp compile-dev-server
    
Transform all server source files and test them:

    gulp test-server
    
Transform all server source files, test them and create coverage report:

    gulp coverage-test-server
    
Run server with watch changes (default url `http://localhost:3000`):

    gulp run-dev-server
    
## Structure:

## Technology:

## Licence
