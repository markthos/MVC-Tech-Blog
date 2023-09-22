const User = require("./user");
const BlogPost = require("./blogPost");
const Comments = require("./comments");

User.hasMany(BlogPost, {
  foreignKey: "owner_id",
  onDelete: "CASCADE",
});

User.hasMany(Comments, {
  foreignKey: "comment_id",
});

BlogPost.belongsTo(User, {
  foreignKey: "owner_id", 
});

BlogPost.hasMany(Comments, {
  foreignKey: "blogPost_id",
});

Comments.belongsTo(BlogPost, {
  foreignKey: "blogPost_id",
});

Comments.belongsTo(User, {
  foreignKey: "creator_id",
});

module.exports = {
  User,
  BlogPost,
  Comments
};//
