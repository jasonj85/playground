import { BaseCake, Cake } from "../interfaces/cake.interface";
import { openDB } from "../database/connect";

// CREATE methods
export const create = async (newItem: BaseCake): Promise<Cake> => {
  const db = await openDB();
  const result = await db.run(
    "INSERT INTO cakes (name, comment, imageUrl, yumFactor) VALUES (?,?,?,?)",
    [newItem.name, newItem.comment, newItem.imageUrl, newItem.yumFactor]
  );

  const id = result.lastID || 0;
  const response = { ...newItem, id };

  return response;
};

// READ methods
export const findAll = async (): Promise<Cake[]> => {
  const db = await openDB();
  const result = await db.all<Cake[]>("SELECT * FROM cakes");

  return result;
};

export const find = async (id: number): Promise<Cake | undefined> => {
  const db = await openDB();
  const result = await db.get<Cake>("SELECT * FROM cakes where id = ?", [id]);

  return result;
};

// UPDATE methods
export const update = async (
  id: number,
  itemUpdate: BaseCake
): Promise<Cake | null> => {
  const db = await openDB();
  const result = await db.run(
    "UPDATE cakes set name = ?, comment = ?, imageUrl = ?, yumFactor = ? WHERE id = ?",
    [
      itemUpdate.name,
      itemUpdate.comment,
      itemUpdate.imageUrl,
      itemUpdate.yumFactor,
      id,
    ]
  );

  return { ...itemUpdate, id };
};

// DELETE methods
export const remove = async (id: number): Promise<null | void> => {
  const db = await openDB();
  const result = await db.run("DELETE FROM cakes where id = ?", [id]);
};
