# Express Sweater Weather

### Introduction
Express Sweater Weather is a Mod 4 Project at the Turing School of Design. The goal of the project is to transition over a backend we built in Ruby on Rails and ActiveRecord to use Node, Express, and Sequelize. It takes in a location parameter, consumes Google's Geocoding API and DarkSky's weather forecast API, and gives back the forecast for that specific location. Users also have the ability to login, favorite locations, and delete favorited locations.

### Local Setup
1. `Clone` down this repo
1. `cd` into express-sweater-weather
1. Run `npm install`


### How To Use
1. Run `npm start`
1. Use Postman or go to `localhost:3000` to hit the endpoints

### API Endpoints
  - Account Creation
    - `POST /api/v1/users`
      - _Request_
        - body:

            {
              "email": "my_email@example.com",
              "password": "password"
              "password_confirmation": "password"
            }
            
      - _Response_
        - status: 201
        - body:

              {
                "api_key": "jgn983hy48thw9begh98h4539h4",
              }

  - Login
    - `POST /api/v1/sessions`
      - _Request_
        - body:

              {
                "email": "my_email@example.com",
                "password": "password"
              }

      - _Response_
        - status: 200
        - body:

              {
                "api_key": "jgn983hy48thw9begh98h4539h4",
              }

  - City Forecast
    - `GET /api/v1/forecast?location=locationName`
      - _Request_
        - body:

              {
                "api_key": "jgn983hy48thw9begh98h4539h4"
              }

      - _Response_
        - status: 200
        - body:

              {
              "location": "Denver, CO",
              "current_weather": {
                "summary": "Overcast",
                "icon": "cloudy",
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 54.91,
                "humidity": 0.65,
                "pressure": 1020.51,
                "windSpeed": 11.91,
                "windGust": 23.39,
                "windBearing": 294,
                "cloudCover": 1,
                "visibility": 9.12,
              }

  - Favorite City
    - `POST /api/v1/favorites`
      - _Request_
        - body:

              {
                "location": "Denver, CO",
                "api_key": "jgn983hy48thw9begh98h4539h4"
              }

      - _Response_
        - status: 201
        - body:
              {
                "message": "Denver, CO has been added to your favorites",
              }

  - List User Favorites
    - `GET /api/v1/favorites`
      - _Request_
        - body:

              {
                "api_key": "jgn983hy48thw9begh98h4539h4"
              }

      - _Response_
        - status: 200
        - body:

              [{
              "location": "Denver, CO",
              "current_weather": {
                "summary": "Overcast",
                "icon": "cloudy",
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 54.91,
                "humidity": 0.65,
                "pressure": 1020.51,
                "windSpeed": 11.91,
                "windGust": 23.39,
                "windBearing": 294,
                "cloudCover": 1,
                "visibility": 9.12,
              }]

  - Delete Favorite
    - `DELETE /api/v1/favorites`
    - _Request_
      - body:

            {
              "location": "Denver, CO",

              "api_key": "jgn983hy48thw9begh98h4539h4"
            }

    - _Response_
      - status: 204

### Testing
Currently the project is not internally tested. The project has been tested by hitting the endpoints using Postman and checking the responses. Future implementations will include Jest and/or Mocha and Chai testing.

### Tech Stack
###### Languages / Frameworks
  - JavaScript
  - Node
  - Express
  - Sequelize

###### APIs
  - Google Geocoding API
  - DarkSky API

### Core Contributors
Scott Thomas
