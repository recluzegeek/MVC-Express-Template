# Express MVC Starter

==================================
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/oguzhanoya/express-mvc-boilerplate.svg?branch=master)](https://travis-ci.org/oguzhanoya/express-mvc-boilerplate)

> An updated yet simple mvc boilerplate for express.js (gulp + expressjs + nodemon + browser-sync)

## Related modules

- express - web application framework for node
- pug - template engine
- stylus - pre-processor CSS
- sequelize - nodejs orm for sql dbs
- bower - a package manager for the web
- gulp - automate workflow
- routes => api || web
- joi => advance http request validation
- winston => for advance logging capabilities

## Prerequisites

- Node.js `http://nodejs.org`

## Project Structure

```sh
.
├── app/
│   └── controllers           # contains controller files
│   └── middleware            # contains middleware files
│   └── models                # contains model files
│   └── requests              # contains http request validation files
│   └── seeds                 # contains database seeding files
│   └── utils                 # contains helper files
│   └── views                 # contains express view (pug) files
├── config/
│   ├── index.js              # environment config file
│   └── db.js                 # db config
├── public/                   # contains static assets
│   ├── components            # bower components folder
│   │   └── ...
│   ├── favicon               # favicon folder
│   ├── fonts                 # contains font files
│   ├── css                   # all files will generate from gulp
│   ├── styl                  # contains style sheets (stylus)
│   ├── js                    # contains js files
│   └── img                   # contains image files
├── routes/
│   ├── web.js                # routes for web
│   └── api.js                # routes for api
├── test/
│   └── spec.js               # unit & func tests
├── .bowerrc                  # bower config
├── .env                      # .env config system
├── .bower.json               # bower dependencies
├── .Procfile                 # process file for heroku implementation
├── .gitignore                # specifies intentionally untracked files to ignore
├── .editorconfig.js          # editor config
├── .gulpfile.js              # gulp config
├── .eslintrc.yml             # eslint config
├── .eslintignore             # eslint ignore specific files and directories config file
├── .travis.yml               # travis ci config
├── app.js                    # app setup file
└── package.json              # build scripts and dependencies

```

## Getting Started

The easiest way to get started is to clone the repository:

```sh
# Get the latest snapshot
$ git clone https://github.com/recluzegeek/express-mvc-starter.git myproject
$ cd myproject

# Install dependencies
$ npm install
$ bower install

$ node app.js
```

## Development

    npm run dev

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Endpoints

### Users

1. `GET /api/`

   - **request body:** None
   - **request params:** None
   - **response - JSON**

     ```json

         {
         "status": "success",
         "message": "Success",
         "data": [
             {
                 "id": "8da9e3f3-54ef-4bc0-83b0-e7ac12a6230b",
                 "name": "Alice Johnson",
                 "username": "alicej",
                 "email": "alice@example.com",
                 "password": "$2b$10$V1bN5EBohxE7hROKsHLSg.5fvB/Q1.2de7BOv7KWkiCdKo.LXkp5O",
                 "createdAt": "2025-06-26T04:50:33.743Z",
                 "updatedAt": "2025-06-26T04:50:33.743Z",
                 "Habits": [
                     {
                         "name": "Read a book",
                         "description": "Read at least 10 pages daily.",
                         "status": "Pending",
                         "frequency": "Daily",
                         "createdAt": "2025-06-26T04:50:33.760Z",
                         "updatedAt": "2025-06-26T04:50:33.760Z"
                     }
                 ]
             },
             .... ,
             .... ,
             .... ,
         ]

       }
     ```

   - **throws:**
     - `DatabaseError`

1. `POST /api/signup` - Creates a new User, and returns its id

   - **request body:**

     ```json
     {
       "name": "Michael Jason",
       "username": "json.michael",
       "email": "json.michael@example.com",
       "password": "superStro32ngPassword#$",
       "repeat_password": "superStro32ngPassword#$"
     }
     ```

   - **request params:** None

   - **response - JSON**

     ```json
     {
       "status": "success",
       "message": "User saved successfuly!",
       "data": {
         "id": "bc29700d-6252-43ae-b715-eac25cbfbf9b"
       }
     }
     ```

   - **throws:**

     - `ValidationFailed` - HTTP Validation Failed (JOI HTTP Schema)
     - `SequelizeUniqueConstraintError` - Uniqueness failed (email, username already taken)
     - `SequelizeValidationError`

1. `PUT /api/update/:id` - Update provided fields for a given user
   <!-- TODO: Needs more scrutiny, for password, repeat_password, email and username -->

   - **request body:**
     All fields are optional for updation, except user_id

     ```json
     {
       "name": "recluzegeek",
       "email": "test@gmail.com"
     }
     ```

   - **request params**

     ```json
     {
       "id": "8da9e3f3-54ef-4bc0-83b0-e7ac12a6230b" // user_id to update record of
     }
     ```

   - **response - JSON**

     ```json
     {
       "status": "success",
       "message": "User updated successfully!",
       "data": {}
     }
     ```

   - **throws:**

     - `ValidationFailed` - HTTP Validation Failed (JOI HTTP Schema)
     - `RecordNotFoundError` - If the user with given id doesn't exists
     - `AppError` - No valid fields are provided for updation

1. `GET /api/habits/:id` - Returns all habits of a given user

- **request body:** None

- **request params**

  ```json
  {
    "id": "8da9e3f3-54ef-4bc0-83b0-e7ac12a6230b" // user_id to fetch habits of
  }
  ```

- **response - JSON**

  ```json
  {
    "status": "success",
    "message": "Success",
    "data": [
      {
        "name": "Read a book",
        "description": "Read at least 10 pages daily.",
        "status": "Pending",
        "frequency": "Daily",
        "category_id": 5,
        "createdAt": "2025-06-26T04:50:33.760Z",
        "updatedAt": "2025-06-26T04:50:33.760Z",
        "Category": {
          "name": "Hobby",
          "description": null,
          "createdAt": "2025-06-26T04:50:33.720Z",
          "updatedAt": "2025-06-26T04:50:33.720Z"
        }
      },
      ....,
      ....,
      ....,

    ]
  }
  ```

- **throws:**
  - `RecordNotFoundError` - Either the user doesn't exists or doesn't have any habits associated with.

### Habits

1. `GET /api/habits` - Returns all habits, including Category Name (fetched from `categories` table)

   - **request body:** None

   - **request params:** None

   - **response - JSON**

     ```json
     {
       "status": "success",
       "message": "Success",
       "data": [
         {
           "id": 1,
           "name": "Read a book",
           "description": "Read at least 10 pages daily.",
           "status": "Pending",
           "frequency": "Daily",
           "user_id": "8da9e3f3-54ef-4bc0-83b0-e7ac12a6230b",
           "createdAt": "2025-06-26T04:50:33.760Z",
           "updatedAt": "2025-06-26T04:50:33.760Z",
           "Category": {
             "name": "Hobby"
           }
         },
         {
           "id": 2,
           "name": "Workout",
           "description": "Go to gym 3 times a week.",
           "status": "In Progress",
           "frequency": "Weekly",
           "user_id": "e030c38f-2d95-4eb2-a5a7-170e0272c8e1",
           "createdAt": "2025-06-26T04:50:33.760Z",
           "updatedAt": "2025-06-26T04:50:33.760Z",
           "Category": {
             "name": "Health"
           }
         },
       ....,
       ....,
       ....,

       ]
     }
     ```

   - **throws:**
     - `DatabaseError`

1. `POST api/habits/create` - Creates a new Habit

   - **request body:**

     ```json
     {
       "name": "youtube-binge-watch",
       "frequency": "Daily",
       "status": "In Progress",
       "description": "i may need to do it on my own",
       "category_id": 2,
       "user_id": "8da9e3f3-54ef-4bc0-83b0-e7ac12a6230b"
     }
     ```

   - **request params:** None

   - **response - JSON**

     ```json
     {
       "status": "success",
       "message": "Habit saved successfuly!",
       "data": {
         "id": 3
       }
     }
     ```

   - **throws:**
     - `ValidationFailed` - HTTP Validation Failed (JOI HTTP Schema)
     - `RecordNotFoundError` - If the user with the given id doesn't exists, leading to ForeignKeyConstraint Failure
     - `ForeignKeyConstraintFailed` - If the provided user doesn't exists

1. `PUT /api/habits/update/:id` - Update provided fields for a given habit

   - **request body:**
     All fields are optional for updation, except user_id

     ```json
     {
       "user_id": "e030c38f-2d95-4eb2-a5a7-170e0272c8e1",
       "status": "In Progress"
     }
     ```

   - **request params**

     ```json
     {
       "id": "2" // habit_id to update record of
     }
     ```

   - **response - JSON**

     ```json
     {
       "status": "success",
       "message": "Habit updated successfully!",
       "data": {}
     }
     ```

   - **throws:**
     - `ValidationFailed` - HTTP Validation Failed (JOI HTTP Schema)
     - `OwnershipError` when the provided `user_id` doesn't match with the `user_id` present on the Habits Object
     - `RecordNotFoundError` when the `id` of the habit is not found in the database

### Categories

1.  `GET /api/categories` - Returns all categories

    - **request body:** None

    - **request params:** None

    - **response - JSON**

      ```json
      {
        "status": "success",
        "message": "Success",
        "data": [
          {
            "id": 1,
            "name": "Health",
            "description": null,
            "createdAt": "2025-06-26T04:50:33.720Z",
            "updatedAt": "2025-06-26T04:50:33.720Z"
          },
          {
            "id": 2,
            "name": "Tech",
            "description": null,
            "createdAt": "2025-06-26T04:50:33.720Z",
            "updatedAt": "2025-06-26T04:50:33.720Z"
          },
          {
            "id": 3,
            "name": "Social",
            "description": null,
            "createdAt": "2025-06-26T04:50:33.720Z",
            "updatedAt": "2025-06-26T04:50:33.720Z"
          },
          ....,
          ....,
          ....,

        ]
      }
      ```

    - **throws:**
      - `DatabaseError`

1.  `POST api/categories/create` - Creates a new Category

    - **request body:**

      ```json
      {
        "name": "Cooking",
        "description": "some random description about my new category"
      }
      ```

    - **request params:** None

    - **response - JSON**

      ```json
      {
        "status": "success",
        "message": "Category saved successfuly!",
        "data": {
          "id": 7
        }
      }
      ```

    - **throws:**
      - `DatabaseError`
      - `ValidationFailed` - HTTP Validation Failed (JOI HTTP Schema)

## Test

npm test

## Lint

npm run lint

## Docker Support

- Docker `https://docs.docker.com/engine/installation/`

```

# Build the project

docker-compose build

# Start the application

docker-compose up

```

## Deploy

Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```

heroku create
git push heroku master
heroku open

```

## License

MIT

```

```

```

```

```

```
