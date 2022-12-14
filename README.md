<p align="center">
  <a href="" rel="noopener">
 <img width=400px height=210px src="https://i.imgur.com/D7lZnjb.png" alt="Project logo"></a>
</p> 

<h3 align="center">Luckydraw-server</h3>
<p align="center">https://dylantsouy.github.io/luckydraw-frontend/#/login
</p>


---

## ð Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Deployment](#deployment)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## ð§ About <a name = "about"></a>

 This is the Luckydarw api, This is just a project. If you need more information, Please feel free to contact me at any time

## ð Getting Started <a name = "getting_started"></a>






### Installing

In the project directory, you can run:

```
npm i
```

Install the necessary package for project before start.

```
npm run db:reset
```

You can simply run this script to reset DB or follow below to run seperately


```
npx sequelize-cli db:create
```

Sequelize CLI to create the database form config/config.json, and don't forget to edit db config before create

```
npx sequelize-cli db:migrate
```

Automatically creates both a model file and a migration with the attributes weâve specified

```
npx sequelize-cli db:seed:all
```

run both seed files to add our fake data to the database

```
npm run dev
```

Open [http://localhost:3000/api/](http://localhost:3000/api/) to connect it.

The api will reload if you make edits by using nodemon.

## ð Usage <a name="usage"></a>
In the project directory, you can run:

```
npx sequelize-cli db:drop
```

If you want to clear the db and migrations

```
npx sequelize-cli model:generate --name User --attributes email:string,password:string
```

If you want to generate model

```
npx sequelize-cli seed:generate --name users
```

If you want to generate seed

## ð Deployment <a name = "deployment"></a>

Frontend Deploy By github page
https://pages.github.com/

API Deploy By Render
https://render.com/

## âï¸ Built Using <a name = "built_using"></a>

- [Mysql](https://www.mysql.com/) - Database
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework
- [Sequelize](https://sequelize.org/) - Node.js ORM
- [Render](https://render.com/) - Clould

## âï¸ Authors <a name = "authors"></a>

- [@Dylan Tsou](https://github.com/dylantsouy) 

## ð Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
