// generateHash.js
import bcrypt from "bcryptjs";

const password = "";

bcrypt.hash(password, 10).then((hash) => {
  console.log("Hashed password:", hash);
});
