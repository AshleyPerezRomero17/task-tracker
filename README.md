# task-tracker

This project consisted of building different components in order to create a todo application:

## API
Had to create a Node.js using Express to build and API to handle creating a todo, deleting a todo, updating a todo and returning all todos.

#### Routes

| Method | URL       | Description   |
|--------|-----------|---------------|
| GET    | /         | Renders index |
| POST   | /todo     | Creates TODO  |
| PUT    | /todo/:id | Updates TODO  |
| DELETE | /todo/:id | Deletes TODO  |

## Views
Used pug.js, a HTML template engine for Node and integrate it with Express as view engine. For styling used a CSS stylesheet.

## Data
Used a JSON file and file system to maintain data

## Validation
Used npm package `express-validator` to add JS validation to form task input. If validation fails then it will return a status code `400 Bad Request` and the response contains the validdation errors.

## Deployment
- Deploy using AWS
