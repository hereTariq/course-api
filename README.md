# Course Resources API

This API allows you to fetch,create,update and delete course.

The API is available at `https://course-resource-api.herokuapp.com/`

## Endpoints

### List of course

GET `/courses/all`

Returns all courses/programs.

### Get a single course

GET `/courses/single/:id`

Retrieve detailed information about a course.

### Create a course resource

POST `/courses/create`

Allows you to create a new course/program. Requires authentication and authorisation.

The request body needs to be in JSON format and include the following properties:

-   `title` - String- Required
-   `imageUrl` - String - Required
-   `universityName` - String- Required
-   `learningHours` - String - Required
-   `duration` - String- Required
-   `facutltyProfileUrl` - String - Not Required(Linkedin URL if available)
-   `price` - Number- Required
-   `certificateUrl` - String - Required
-   `eligibilityCriteria` - String - Required

Example

```
POST /courses/create
Authorization: Bearer <YOUR TOKEN>
{
    "title": "Nodejs full course",
    "imageUrl": "https://unsplash.com/random",
    "universityName": "Delhi University",
    "learningHours": "10 AM to 9 PM",
    "duration": "30 weeks",
    "certificateUrl": "https://unsplash.com/random",
    "eligibilityCriteria": "Graduation",
    "price" :"999"
}
```

The response body will contain the following object.

```
{
    "status": true,
    "msg": "course created successfully.",
    "course": {
        "title": "Nodejs full course",
        "imageUrl": "https://unsplash.com/random",
        "universityName": "HRPG University",
        "learningHours": "10 AM to 9 PM",
        "duration": "30 weeks",
        "price": 999,
        "certificateUrl": "https://unsplash.com/random",
        "eligibilityCriteria": "Graduation",
        "userId": "62f54b686b6f807d27202c27",
        "_id": "62f54d666b6f807d27202c3a",
        "__v": 0
    }
}
```

### Update a course

PUT `/courses/update/:id`

Update an existing book. Requires authentication and authorisation.

The request body needs to be in JSON format and allows you to update the following properties:
You do not need to give all the input fields in the body request, what field you want to update just write down like below.

-   `title` - String- Required
-   `price` - Number - Required

Example

```
PUT /courses/update/621cffb54d718b73f2662cd2
Authorization: Bearer <YOUR TOKEN>
{
  "title": "Python course",
  "price": 1999
}
```

### Delete a course

DELETE `/courses/delete/:id`

Delete an existing book. Requires authentication and authorisation.

The request body needs to be empty.

Example

```
DELETE /books/delete/621cffb54d718b73f2662cd2
Authorization: Bearer <YOUR TOKEN>
```

## API Authentication

To create or update or delete a book, you need to register and then login.

### SIGNUP

POST `/auth/signup`

The request body needs to be in JSON format and include the following properties:

-   `username` - String
-   `email` - String
-   `password` - String
-   `password2` - String

Example

```
{
   "username": "John",
   "email": "example@gmail.com"
   "password": "pass@123",
   "password2": "pass@123"
}
```

### LOGIN

POST `/auth/login`

The request body needs to be in JSON format and include the following properties:

-   `email` - String
-   `password` - String

Example

```
{
   "email": "example@gmail.com"
   "password": "pass@123"
}
```

The response body will contain the access token and other information about user. The access token is valid for 1 hour.

**Possible errors**

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 201         | `CREATED`               |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 401         | `UNAUTHORIZED`          |
| 422         | `VALIDATION ERROR`      |
| 500         | `INTERNAL SERVER ERROR` |
