# blog-list-app
I am building a blog list application using MERN stack, that allows users to save interesting blogs they have stumbled across on the internet so that they could come back later and visit the blogs. For each blog, fields like URL, Title, Author and num of likes are stored.

## How to run ?
-   clone the repo using: `git clone https://github.com/Vinayaka2k/blog-list-app.git`
-   Create a file `.env` in the root (folder that contains package.json)
-   Add the following Env variables : <br />
        `MONGODB_URI` = `<your mongodb URI specifying a database>`<br />
        `TEST_MONGODB_URI` = `<your mongodb URI for the test database>`<br />
        `PORT` = `3001`<br />
        `SECRET` = `<any string that can be used by jwt as the secret>`
-   install the dependencies listed below using: `npm install <package-name>`
-   For development dependency, use: `npm install <package-name> --save-dev`
-   Run the command for Development Environment: `npm run dev`
-   Run the command for testing Environment: `npm run test` or simply `npm test`

## Exposed Endpoints
The following restful endpoints are exposed for public consumption.

### Blogs
The blogs endpoint exposes the `GET`, `POST`, `DELETE` and `PUT` methods for execution and consumption.

#### `GET` 📖
There are *two* `GET` methods exposed for consumption, one is parameterless while the other has a single parameter.

##### Parameterless
The first method is parameterless and should be expected to return *all* available blogs. It can be consumed at the following endpoint:

```
endpoint here
```

##### Parameterized
The second method expects an `id` parameter and should be expected to return the blog associated with the specified `id`. If no blog is found, then a status code of `404` is returned. It can be consumed at the following endpoint:

```
endpoint here
```

### What has been completed till now ?
-   APIs for CRUD operations on a Blog
-   API for User Login : Token generation using jwt : Password Hashing using bcrypt
-   API for CRUD operations on a User
-   Created Schema for User and Blog
-   Every user document has a reference to list of blogs created by him
-   Every blog has the reference to the user who has created that blog
-   Unit and API Testing for few APIs of User and Blog using jest and supertest
-   Middlewares to handle exceptions thrown and handle invalid endpoints

### Which features are currently being developed ?
-   Currently developing the login functionality
-   Also working on Token Authentication using jwt

### TODO :
-   Start with the front end for the appliaction with React
-   Test Frontend with Jest
-   After completing the whole stack, End to End testing using Cypress
-   After making sure the app works locally, deploy frontend and backend independently to Vercel
-   Make sure that the deployed app works by Testing
-   Any other new feature that is suggested by the community !

#### Dependencies 
-   cors
-   dotenv
-   express
-   mongoose
-   nodemon         (dev-dependency)
-   jest            (dev-dependency)
-   cross-env            (dev-dependency)
-   supertest            (dev-dependency)
-   express-async-errors
-   bcrypt
-   mongoose-unique-validator
-   jsonwebtoken

#### Want to contribute? Would be more than happy to review and merge your changes... Please raise a PR !!