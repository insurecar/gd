import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { app } from "./app";

dotenv.config({
  path: `${__dirname}/../config.env`,
});

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  console.error("❌ DATABASE or DATABASE_PASSWORD not defined in config.env");
  process.exit(1);
}

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

(async function startServer() {
  try {
    await mongoose.connect(DB);
    console.log("✅ DB connection successful");

    const PORT = process.env.PORT || 8000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    process.on("unhandledRejection", (err: any) => {
      console.error("💥💥💥 UNHANDLED REJECTION! Shutting down...");
      console.error(err.name, err.message);
      server.close(() => process.exit(1));
    });
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
})();
