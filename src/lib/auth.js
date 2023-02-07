import { AppConfig, UserSession, showConnect } from "@stacks/connect";
window.Buffer = window.Buffer || require("buffer").Buffer;

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacalc",
      icon: ".",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession: userSession,
  });
}

export function getUserData() {
  return userSession.loadUserData();
}

export const logoutUser = () => {
  userSession.signUserOut(window.location.origin);
};
