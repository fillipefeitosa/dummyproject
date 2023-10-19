import { createApp, reactive } from "https://unpkg.com/petite-vue?module";

const cartListApp = reactive({
  cart: null,
  userId: localStorage.getItem("userId"),
  isLoggedIn: localStorage.getItem("isLoggedIn"),

  async checkifLoggedIn() {
    if (this.isLoggedIn == false) {
      alert("You must be logged in to access your cart!");
      console.log("Logged in:" + this.isLoggedIn);
      // window.location.replace("http://localhost:3000/login.html");
    } else {
      console.log("Logged in:" + this.isLoggedIn);
      await this.getUserCart();
    }
  },

  async getUserCart() {
    console.log("entrei!");
    try {
      const cartsResponse = await fetch(
        "https://dummyjson.com/carts/user/" + this.userId
      );
      if (!cartsResponse.ok) {
        throw new Error("carts not found:" + cartsResponse.status);
      }
      const data = await cartsResponse.json();
      if (data) {
        this.cart = data;
        console.log("cart:" + this.cart);
      }
    } catch (error) {
      console.log("error:" + error);
      alert("Failed to get carts");
    }
  },
});

createApp({
  cartListApp,
  mounted() {
    this.checkifLoggedIn();
  },
}).mount();
// this.getUserCart();
