import flatten from "flat";
import message from "./message.json";
import common from "./common.json";
import login from "./login.json";

const locale = {
  message: flatten(message, {
    delimiter: "_",
  }),
  login: flatten(login, {
    delimiter: "_",
  }),
  common: flatten(common, {
    delimiter: "_",
  }),
};
export default locale;
