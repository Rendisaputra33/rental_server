# API SPEC

- ### REGISTER

```json
{
  "method": "POST",
  "path": "api/v1/auth",
  "payload": {
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "password": "string"
  }
}
```

- ### LOGIN

```json
{
  "method": "POST",
  "path": "api/v1/auth/signin",
  "payload": {
    "email": "string",
    "password": "string"
  },
  "response": {
    "statusCode": "number",
    "message": "string",
    "data": {
      "access_token": "string"
    }
  }
}
```

- ### GET PACKAGE

```json
{
  "method": "GET",
  "path": "api/v1/package",
  "payload": {},
  "response": {
    "statusCode": "number",
    "message": "string",
    "data": [
      {
        "id": 1,
        "code": "ABC123",
        "name": "Product Name",
        "description": "Product Description",
        "price": 9.99,
        "lat_start": 37.7749,
        "lngt_start": -122.4194,
        "lat_destination": 34.0522,
        "lngt_destination": -118.2437
      }
    ]
  }
}
```

- ### GET BIKE

```json
{
  "method": "GET",
  "path": "api/v1/bike/{id}",
  "payload": {},
  "response": {
    "statusCode": "number",
    "message": "string",
    "data": [
      {
        "id": 123,
        "code": "ABC123",
        "name": "Product Name",
        "available": true
      }
    ]
  }
}
```
