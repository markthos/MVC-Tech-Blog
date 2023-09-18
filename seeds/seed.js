const sequelize = require("../config/connection");
const {
  User,
  BlogPost,
  Comments,
} = require("../models");
const userData = require("./userData.json");
const blogPostData = require("./blogPostData.json");
const commentData = require("./commentData.json");
// const collaboratorData = require("./collaboratorData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  try {
    const users = [];
    for (const userDataItem of userData) {
      const user = await User.create(userDataItem);
      users.push(user);
    }
    console.log("\n----- SEEDED -----\n");
    await BlogPost.bulkCreate(blogPostData);
    console.log("\n----- BLOG POSTS SEEDED -----\n");
    await Comments.bulkCreate(commentData);
    console.log("\n----- COMMENTS SEEDED -----\n");
    // await Collaborator.bulkCreate(collaboratorData);
    // console.log("\n----- COLLABORATORS SEEDED -----\n");
    console.log("\n----- DB SEEDED! -----\n");
  } catch (error) {
    console.error("Error seeding db", error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
