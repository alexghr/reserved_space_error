import { open } from "lmdb";
import { randomBytes } from "node:crypto";
import { asyncPool } from "./async_pool.mjs";

const db = open({});

const maxItems = 10_000;
const batch = 1000;

let insertedItems = 0;
let deletedItems = 0;

let ids = [];

// a producer thread
const insertItems = async () => {
  if (insertedItems >= maxItems) {
    return;
  }

  console.log("Inserting %d items", batch);
  for (let i = 0; i < Math.min(batch, maxItems - insertedItems); i++) {
    const item = generateItem();
    await db.put(item.id, item);
    insertedItems++;
    ids.push(item.id);
  }

  setTimeout(insertItems, 100);
};
setImmediate(insertItems);

// a consumer thread
const deleteItems = async () => {
  if (deletedItems >= maxItems) {
    return;
  }

  const toDelete = [...ids];
  ids = [];
  console.log("Deleting %d items", toDelete.length);

  await asyncPool(batch, toDelete, async (id) => {
    await db.remove(id);
    deletedItems++;
  });

  setTimeout(deleteItems, 100);
};

setImmediate(deleteItems);

// wait for both threads to finish processing before exiting the script
await new Promise((res) => {
  const check = () => {
    if (insertedItems >= maxItems && deletedItems >= maxItems) {
      res();
    } else {
      setTimeout(check, 100);
    }
  };

  setImmediate(check);
});

// helper to generate an item
function generateItem() {
  const id = randomBytes(4).toString("hex");
  const type = (Math.random() * 12) | 0;
  const inputsUri = randomBytes(128 * 1024).toString("base64url");
  const epochNumber = (Math.random() * 100) | 0;

  return { id, type, inputsUri, epochNumber };
}
