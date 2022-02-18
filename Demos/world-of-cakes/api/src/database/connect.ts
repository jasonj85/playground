import sqlite3 from "sqlite3";
import { open } from "sqlite";

// open db connection to sqlite DB
export async function openDB() {
  return await open({
    filename: `${__dirname}/sqlite.db`,
    driver: sqlite3.Database,
  });
}

// initialise database
export async function initialiseDB() {
  const db = await openDB();
  console.log(__dirname);
  console.log("Checking DB...");

  // create database table
  await db.run(
    `CREATE TABLE IF NOT EXISTS cakes(
            id INTEGER PRIMARY KEY NOT NULL,
            name NVARCHAR(30)  NOT NULL,
            comment NVARCHAR(200)  NOT NULL,
            imageUrl NVARCHAR(200)  NOT NULL,
            yumFactor INTEGER  NOT NULL
        )`,
    (err: any) => {
      if (err) {
        console.log("Could not initialise db cakes table: " + err);
      }
    }
  );

  // seed data if no data exists
  const existing = await db.all("Select ID from cakes");

  if (existing.length === 0) {
    console.log("Seeding data...");

    const insertCakes =
      "INSERT INTO cakes (name, comment, imageUrl, yumFactor) VALUES (?,?,?,?)";

    await db
      .run(insertCakes, [
        "Angel Cake",
        "It’s a type of sponge cake made with egg whites, flour, and sugar. What makes it special is the lack of butter, and the light and fluffy texture that it has.",
        "https://res.cloudinary.com/developerjay/image/upload/v1645103230/cakes/angel-cake.jpg",
        4,
      ])
      .catch((err) => console.log(err));
    await db
      .run(insertCakes, [
        "Apple Cake",
        "There are different types of apple cakes, with variations in style, and the addition of spices such as cinnamon and nutmeg",
        "https://res.cloudinary.com/developerjay/image/upload/v1645103229/cakes/apple-cake.jpg",
        5,
      ])
      .catch((err) => console.log(err));
    await db
      .run(insertCakes, [
        "Blueberry Friands",
        "A friand is a small cake, baked in a small mold, containing flour, egg whites, butter, and powdered sugar. ",
        "https://res.cloudinary.com/developerjay/image/upload/v1645103229/cakes/blueberry-friands.jpg",
        5,
      ])
      .catch((err) => console.log(err));
    await db
      .run(insertCakes, [
        "Carrot and Walnut Cake",
        "Carrot cake is incredibly popular, with carrots as the main ingredient, along with eggs, flour, and sugar.",
        "https://res.cloudinary.com/developerjay/image/upload/v1645103230/cakes/carrot-and-walnut-cake.jpg",
        1,
      ])
      .catch((err) => console.log(err));
    await db
      .run(insertCakes, [
        "Charlotte Cake",
        "The Charlotte Cake is a popular dessert in the United Kingdom, and it can be served both cold and hot.",
        "https://res.cloudinary.com/developerjay/image/upload/v1645103223/cakes/charlotte-cake.jpg",
        3,
      ])
      .catch((err) => console.log(err));
    await db
      .run(insertCakes, [
        "Sponge Cake",
        "This is the simplest of simple cakes, which is what makes it a timeless classic loved by all.",
        "https://res.cloudinary.com/developerjay/image/upload/v1645103219/cakes/sponge-cake.jpg",
        2,
      ])
      .catch((err) => console.log(err));
  }
}
