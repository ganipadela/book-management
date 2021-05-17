# book-management
A Book Management Backend built NodeJs using Typescript, ExpressJs and PostgreSQL databases using Sequelize ORM.

## Notes

- [Airbnb's javascript style guide](https://github.com/airbnb/javascript) is followed.
- Code depends on `.env` files and will validate the files to run properly.
- To reflect changes in `.env` files, a restart will be required.

### Install dependencies

```sh
npm i
```

### To setup the project

- Create an environment file `.env` by copying the `.env.example` file and add respective values.
- Create a database in postgres and define same name in database-uri in `.env`

### To run the project

```sh
npm start
```

### Postman collection
- You can import postman collection provided in `postman` folder.
- Replace the values in `variables` in collecction.
