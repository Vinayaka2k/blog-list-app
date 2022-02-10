# blog-list-app
I am building a blog list application using MERN stack, that allows users to save interesting blogs they have stumbled across on the internet so that they could come back later and visit the blogs. For each blog, fields like URL, Title are stored.

## Dependencies 
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

#### Want to contribute? Would be more than happy to review and merge your changes... Please raise a PR !!