import axios from "axios";
import params from "./../constants/params";

function isAuth(router) {
  if (localStorage.getItem("token")) {
    axios
      .get(`${params.serverUrl}/isauth`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((data) => router.navigate(["/chat"]))
      .catch((err) => console.log("err", err));
  } else {
    router.navigate(["/"]);
  }
}

export default isAuth;
