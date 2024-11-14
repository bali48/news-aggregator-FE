# News Hub FrontEnd

This is the front end of the NewsHub Web application. Here, I am Presenting the Home Page, which displays News from different sources, including NewsAPI, the New York Times, and Guardians.

## Key Features

Here Firstly we can see the news from different sources alongside some features added here

- Virtual Scrolling to fetch news when user scrolls the page
- spinner to engage the user when fetching the data from the Backend
- a slider on top to show the data loading progress on top

- USER can set preferences by clicking on the user icon and set the sources, author and category they wanted to see.

- USER can search and filter the results by typing the keyword in the search bar.
- IF the user is logged in the data will be shown according to the set preferences.

## How to Setup

For running the backend of the application run this command.
make sure you have installed docker already

```bash
docker-compose up -d --build
```

once the container is up we can see the app running on

```bash
http://localhost:3000
```

## Author

Muhammad Bilal
