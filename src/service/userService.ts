import User from "@/models/user";

export const userService = {
  async createUser(
    username: string,
    fullname: string,
    email: string,
    password: string,
    role: string,
    createdBy: any
  ) {
    const user = new User({
      username,
      fullname,
      email,
      password,
      role,
      createdBy,
    });
    await user.save();
  },
  async getUser() {
    return await User.find({});
  },
  async getUserbyUsername(username: string) {
    return await User.findOne({ username });
  },
  async getUserbyEmail(email: string) {
    return await User.findOne({ email });
  },
};
