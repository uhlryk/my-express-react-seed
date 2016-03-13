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

### Config files

All configs are in :

    src/config
    
You can try to run `npm init` which create configs files.
Or if this not working do it manually:

1 copy server.template.js config file and name it server.local.js

    cp src/configs/server.template.js src/configs/server.local.js
    
2 copy server.template.js config file and name it server-test.local.js

    cp src/configs/server.template.js src/configs/server-test.local.js

3 copy client.template.js config file and name it client.local.js

    cp src/configs/client.template.js src/configs/client.local.js
 
    
In both cases edit this files with your local settings.

## Commands:

### For production:

Transform all server and client source files:

    gulp compile
   
### For development:

Transform all server source files and test them:

    gulp test
    
Transform all server source files, test them and create coverage report:

    gulp coverage
    
Run server and client with watch changes (default url `http://localhost:3000`):

    gulp dev-normal

Run server and client with watch changes and hot reloading (default url `http://localhost:3001`):

    gulp dev-hot
        
## Structure:

 * **app.js**              executable server file (config and run compiled server)
 * **devServer.js**        executable dev server for client files (hot reloading)
 * **webpack.config.server.js** webpack configuration to compile server files
 * **webpack.config.client.prod.js** webpack configuration to production compile client files
 * **webpack.config.client.dev.js** webpack configuration to dev compile client files (hot loading)
 * **dist/**                directory with compiled files
 * **dist/server.js**      compiled server bundle file
 * **src/**                 all source files
 * **src/client/**          client source files
 * **src/config/**          all config files
 * **src/config/server.js**  global config file
 * **src/config/*.local.js** all local config file
 * **src/server/**          server source files 
 * **tests/**               all tests files
 * **tests/server/**        server tests
 
## Technology:

  * express
  * node.js
  * sequelize
  * react
  * server side react render
  * react-router
  * jsx
  * redux
  * hot-loader
  * webpack
  * ES6 & ES7
  * gulp
  * bootstrap 3
  * sass
  * compass
  
## Licence

MIT
