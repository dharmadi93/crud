# Web API Express RESTful CRUD

## Install Express

```
npm install express-generator -g
express --ejs
npm install
```

## Install Sequelize

```
npm install sequelize-cli -g
npm install sequelize --save
sequelize init
```

## Install Sqlite3

```
npm install sqlite3 --save
```

## Setting config.json

```
"development": {
    "storage": "./db/crud_db",
    "dialect": "sqlite"
  }
```

## Endpoint

```
| Endpoint      | HTTP      | Description       |
| ----------    | -----     | ------------      |
| api/memo      | POST      | Create memo       |
| api/memo      | GET       | Get all memo      |
| api/memo/:id  | GET       | Get memo by id    |
| api/memo/:id  | DELETE    | Delete memo by id |
| api/memo      | PUT       | Update memo       |
```

## Screenshot

### Home

Tampilan Utama

![Home](./public/images/home.png)

### Insert

Isi form untuk menambah data

![Home](./public/images/insert.png)

### Edit

Klik tombol edit untuk mengedit

![Home](./public/images/edit.png)

### Delete

Klik tombol delete untuk menghapus

![Home](./public/images/home.png)