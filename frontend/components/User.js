import { createApp, reactive } from "https://unpkg.com/petite-vue?module";

const loginApp = reactive({
  username: "",
  password: "",
  userAuth: null,
  profile: null,
  isLoggedIn: false,
  isLoading: false,

  async login() {
    try {
      this.isLoading = true;
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });

      // check if userAuth exists
      if (!response.ok) {
        throw new Error("userAuth not found:" + response.status);
      }

      const data = await response.json();
      if (data && data.token) {
        localStorage.setItem("isLoggedIn", true); // save to local storage
        this.userAuth = data;
        console.log("userAuth:" + this.userAuth.firstName);
        this.isLoggedIn = true; // update reactive state
        this.isLoading = false;
        await this.getUserData(this.userAuth.id);
      } else {
        throw new Error("Invalid Credentials:" + response.status);
      }
    } catch (error) {
      console.log("error:" + error);
      alert("Failed to login");
    }
  },

  async getUserData(userId) {
    try {
      console.log("userId:" + userId);
      const getUserResponse = await fetch(
        "https://dummyjson.com/users/" + userId
      );

      if (!getUserResponse.ok) {
        throw new Error("user not found:" + getUserResponse.status);
      }
      const data = await getUserResponse.json();
      if (data) {
        this.profile = data;
        localStorage.setItem("userId", this.profile.id); // save user ID to other components usage
      }
    } catch (error) {
      console.log("error:" + error);
      alert("Failed to get user data");
    }
  },

  logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    this.isLoggedIn = false;
    this.userAuth = null;
  },
});

createApp({ loginApp }).mount();
