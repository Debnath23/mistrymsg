import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("DB already connected!");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(db);
    console.log(db.connections);

    connection.isConnected = db.connections[0].readyState;

    console.log("DB connected successfully!");
  } catch (error: any) {
    console.log("DB connection failed!", error);
    process.exit(1);
  }
}

export default dbConnect;
