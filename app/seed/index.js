import { has } from "browser-sync";
import { sequelize } from "../../config/db.js";
import { User, Habit, Category } from "../models/index.js";
import { hash } from "bcrypt";

const hashedPassword = await Promise.all([hash("Password123!", 10), hash("Password123!", 10)]);

const seed = async () => {
  const categoryEnum = ["Health", "Tech", "Social", "Knowledge", "Hobby", "House Chores"];
  try {
    await sequelize.sync({ force: true });

    console.log("📦 Database synced");

    const categories = await Category.bulkCreate(
      categoryEnum.map((name) => ({
        name,
      }))
    );
    console.log("📁 Categories seeded");

    // Seed users
    const users = await User.bulkCreate([
      {
        name: "Alice Johnson",
        username: "alicej",
        email: "alice@example.com",
        password: hashedPassword[0],
      },
      {
        name: "Bob Smith",
        username: "bobsmith",
        email: "bob@example.com",
        password: hashedPassword[1],
      },
    ]);

    console.log("👤 Users seeded");

    // Seed habits
    await Habit.bulkCreate([
      {
        name: "Read a book",
        description: "Read at least 10 pages daily.",
        status: "Pending",
        frequency: "Daily",
        user_id: users[0].id,
        category_id: categories[4].id,
      },
      {
        name: "Workout",
        description: "Go to gym 3 times a week.",
        status: "In Progress",
        frequency: "Weekly",
        user_id: users[1].id,
        category_id: categories[0].id,
      },
    ]);

    console.log("📘 Habits seeded");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed DB:", error);
    process.exit(1);
  }
};

seed();
