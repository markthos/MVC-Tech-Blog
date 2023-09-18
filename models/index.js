const User = require("./user");
const BlogPost = require("./blogPost");
const Comments = require("./comments");

User.hasMany(BlogPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// User.hasMany(Comments, {
//   foreignKey: "comment_id",
// });

// User.belongsToMany(BlogPost, {
//   through: {
//     model: Collaborator,
//     foreignKey: "user_id",
//   },
//   onDelete: "CASCADE",
//   as: "collaborations",
// });

// BlogPost.belongsToMany(User, {
//   through: {
//     model: Collaborator,
//     foreignKey: "blogPost_id",
//   },
//   onDelete: "CASCADE",
//   as: "collaborators",
// });

// BlogPost.belongsTo(User, {
//   foreignKey: "owner_id", 
// });

// BlogPost.hasMany(Comments, {
//   foreignKey: "blogPost_id",
// });

// Comments.belongsTo(BlogPost, {
//   foreignKey: "blogPost_id",
// });

// Comments.belongsTo(User, {
//   foreignKey: "creator_id",
// });

// Collaborator.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Collaborator.belongsTo(BlogPost, {
//   foreignKey: "blogPost_id",
// });

module.exports = {
  User,
  BlogPost,
  Comments
};//
