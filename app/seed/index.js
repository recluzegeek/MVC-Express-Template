import { sequelize } from "../../config/db.js";
import { User, Habit } from "../models/index.js";

const seed = async () => {
  try {
    await sequelize.sync({ force: true });

    console.log("📦 Database synced");

    // Seed users
    const users = await User.bulkCreate([
      {
        name: "Alice Johnson",
        username: "alicej",
        email: "alice@example.com",
        password: "Password123!",
      },
      {
        name: "Bob Smith",
        username: "bobsmith",
        email: "bob@example.com",
        password: "Password123!",
      },
    ]);

    console.log("👤 Users seeded");

    // Seed habits
    await Habit.bulkCreate([
      {
        name: "Read a book",
        description: "Read at least 10 pages daily.",
        category: "Knowledge",
        status: "Pending",
        frequency: "Daily",
        user_id: users[0].id,
      },
      {
        name: "Workout",
        description: "Go to gym 3 times a week.",
        category: "Health",
        status: "In Progress",
        frequency: "Weekly",
        user_id: users[1].id,
      },
    ]);

    console.log("📘 Habits seeded");
    process.exit(0); // Exit process successfully
  } catch (error) {
    console.error("❌ Failed to seed DB:", error);
    process.exit(1); // Exit process with failure
  }
};

seed();
