
# REST API for issue tracker

This is the backend for the issue-tracking application, made with NodeJS and express.

## Need 
- All requests must pass the auth check before making changes to the database.
- Different users with different roles must be able to perform different actions.
- Users should be able to add others in the teams and modify as required.





## To Do
- [x] Schema for the Project, Users, and bugs.
- [x] Controllers for different crud operations on Users.
- [x] Controllers for different crud operations on Projects and Teams.
- [x] Users can create teams, add, remove, and edit members.
- [x] Users can create, delete, modify projects under different teams.
- [x] Users can report bugs on different projects, and can be assigned bugs to work on. 


## Run Locally

Clone the project

```bash
  git clone https://github.com/adhishVerma/issue-tracker-REST.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
