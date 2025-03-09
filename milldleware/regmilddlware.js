const User=require("../model/user_reg")

User.pre('save', async function (next) {
    if (this.isNew || this.userId === 0) {
      // Find the document with the highest `userId`
      const lastUser = await User.findOne().sort({ userId: -1 });
      this.userId = lastUser ? lastUser.userId + 1 : 1; // Increment from the last `userId` or start at 1
    }
    next();
  });

  module.exports=User