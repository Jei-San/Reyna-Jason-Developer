# Reyna-Jason-Developer

Welcome to PetShop developed by Jason Reyna.

## Running project for the first time

Before running the project for the first time, use `npm install` to install all necessary dependencies.

After the installation is done, use `npm start` to start the project.

## URI

The URI prefix is `https://localhost/`

---

## Pet

All pets has the following properties, they are identified by their id, which is unique and live under `/api/pet`

#### tblpet

Field       | Description                     | Type
------------|---------------------------------|------
**id**      | The pet's unique ID             | int
name        | The pet's first name            | str
tag         | The pet's last name             | str

#### List all pets

###### Definition

`GET ?page={number}&limit={number}`

###### Response

- `200 OK` On success
- `500 ERROR` On error

```json
{
    "result": [
    {
        "id": 0,
        "name": "Jerry",
        "tag": "Some text",
    },
    {
        "id": 1,
        "name": "Terry",
        "tag": "Some text",
    },
    ],
    "description": "https://localhost/api/pet?page={number+1}&limit={number}"
}
```

#### Get one pet

###### Definition

`GET /:id`

###### Response

- `200 OK` On success
- `500 ERROR` On error

```json
{
    "id": 0,
    "name": "Jerry",
    "tag": "Some text",
}
```

#### Update pet

###### Definition

`POST /`

###### Arguments

Name argument in this JSON is not optional but tag is.

- `name: str` name of the pet
- `tag: str` tag of the pet

###### Response

- `400 TYPE_ERROR` On type error
- `500 ERROR` On error
- `200 OK` On success

```json
  {
    "name" : "Terry",
    "tag" : ""
  }
```

#### Update pet

###### Definition

`PUT /:id`

###### Arguments

Name argument in this JSON is not optional but tag is.

- `name: str` name of the pet
- `tag: str` tag of the pet

###### Response
- `400 NOT_EXIST` pet doesn't exist
- `500 ERROR` On error
- `200 OK` On success

```json
  {
    "message": "pet {id} has been updated!"
  }
```

#### Delete pet

###### Definition

`DELETE /:id`

###### Response

- `400 NOT_EXIST` pet doesn't exist
- `500 ERROR` On error
- `200 OK` On success

```json
  {
    "message": "pet {id} has been deleted!"
  }
```

## Testing

Testing is done with mocha, supertest and chai. Simply type in the console `npm test` to do unitary tests.

`NOTE`: the project must be running with `npm start` before running tests!