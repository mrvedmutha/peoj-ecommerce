import CxUser from "@/models/cxUser";

export const cxService = {
  async getAllCxUsers() {
    return await CxUser.find({});
  },
  async getCxUserById(id: string) {
    return await CxUser.findById(id);
  },
  async getCxUserByEmail(email: string) {
    return await CxUser.findOne({ email });
  },
  async getCxUserByUsername(username: string) {
    return await CxUser.findOne({ username });
  },
  async createCxUser(
    username: string,
    fullname: string,
    email: string,
    password: string,
    role: string
  ) {
    const user = new CxUser({
      username,
      fullname,
      email,
      password,
      role,
    });
    await user.save();
  },
  async createCxGoogleUser(
    profileEmail: string,
    profileName: string,
    role: string
  ) {
    const googleUser = new CxUser({
      username: profileEmail,
      fullname: profileName,
      email: profileEmail,
      role: role,
    });
    await googleUser.save();
  },
};
