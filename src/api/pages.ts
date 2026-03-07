export const toLoginPage = () => {
  uni.navigateTo({ url: "/pages/login" });
};

export const toHomePage = () => {
  uni.switchTab({ url: "/pages/index" });
};
