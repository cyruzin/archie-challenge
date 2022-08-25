# Archie

Archie back-end challenge.

## Running Local

Rename the **.env_example** to **.env** and fill the variables.

Make sure you have Docker installed in your machine.

The app uses Postgres, the SQL script should be executed automatically.

Run the command below to run the database:

```sh
 docker-compose up -d
```

Install dependencies:

```sh
 yarn install
```

Then:

```sh
 yarn start
```

## Tests

```sh
 yarn test
```

## Documentation

Go to the **docs** folder. It has an Insomnia schema inside, just import it to test the endpoints.
