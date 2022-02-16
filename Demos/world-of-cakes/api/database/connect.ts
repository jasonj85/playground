import sqlite3 from "sqlite3";
import { open } from "sqlite";

// open db connection to sqlite DB
export async function openDB() {
  return await open({
    filename: "./database/sqlite.db",
    driver: sqlite3.Database,
  });
}

// initialise database
export async function initialiseDB() {
  const db = await openDB();
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

  if (existing.length == 0) {
    console.log("Seeding data...");

    const insertCakes =
      "INSERT INTO cakes (name, comment, imageUrl, yumFactor) VALUES (?,?,?,?)";

    await db.run(insertCakes, [
      "Angel Cake",
      "It’s a type of sponge cake made with egg whites, flour, and sugar. What makes it special is the lack of butter, and the light and fluffy texture that it has.",
      "angel-cake.jpg",
      4,
    ]);
    await db.run(insertCakes, [
      "Apple Cake",
      "There are different types of apple cakes, with variations in style, and the addition of spices such as cinnamon and nutmeg",
      "apple-cake.jpg",
      5,
    ]);
    await db.run(insertCakes, [
      "Blueberry Friands",
      "A friand is a small cake, baked in a small mold, containing flour, egg whites, butter, and powdered sugar. ",
      "blueberry-friands.jpg",
      5,
    ]);
    await db.run(insertCakes, [
      "Carrot and Walnut Cake",
      "Carrot cake is incredibly popular, with carrots as the main ingredient, along with eggs, flour, and sugar.",
      "carrot-and-walnut-cake.jpg",
      1,
    ]);
    await db.run(insertCakes, [
      "Charlotte Cake",
      "The Charlotte Cake is a popular dessert in the United Kingdom, and it can be served both cold and hot.",
      "charlotte-cake.jpg",
      3,
    ]);
    await db.run(insertCakes, [
      "Sponge Cake",
      "This is the simplest of simple cakes, which is what makes it a timeless classic loved by all.",
      "sponge-cake.jpg",
      2,
    ]);
  }
}
