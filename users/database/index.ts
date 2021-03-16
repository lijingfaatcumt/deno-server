import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";

const client = new MongoClient();
await client.connect("mongodb://127.0.0.1:27017");

interface UserSchema {
  _id: {
    $oid: string;
  };
  username: string;
  password: string;
}

const db = client.database("users");
const userCollection = db.collection<UserSchema>("users");

export { Bson, userCollection };
