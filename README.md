# Receipe App

In this project, I made a website which fetch meals from the free API website https://www.themealdb.com/api.php and you can get meal receipe instructions and ingredients after clicking on specific meal. 

You can also add a meal in your favourite list and it will get store by using localStorage propery of javascript in the web browser with no expiration date. So it will persist even after you close the browswer or restart the system.

## My site is live at https://receipe-finder-app.netlify.app/

## API Reference

#### Get all meals

```http
  GET https://www.themealdb.com/api/json/v1/1/search.php?s=${receipe-name}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Meal Name` | `string` | **Required**. Your API key |

#### Get item

```http
  GET www.themealdb.com/api/json/v1/1/lookup.php?i=${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)




## Authors

- Made by [@Harsh Ghanghoriya]


## Features

- Auto-suggestion search bar
- Locally web browser stored favourite option with "ADD TO FAVOURITE" and "REMOVE FROM FAVOURITE" option
- Receipe instructions 
- RESPONSIVE Website

## Tech Stack

**Client:** HTML, CSS, JAVASCRIPT



