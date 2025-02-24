import User from "@/models/user";

export const userService = {
  async createUser(
    username: string,
    fullname: string,
    email: string,
    password: string,
    role: string
  ) {
    const user = new User({ username, fullname, email, password, role });
    await user.save();
  },
  async getUser() {
    return await User.find({});
  },
  async getUserbyUsername(username: string) {
    return await User.findOne({ username });
  },
};
