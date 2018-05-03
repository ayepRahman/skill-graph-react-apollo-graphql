import _ from "lodash";

export const formatErrors = e => {
  console.log("FORMATERRORS", e.errors);
  if (e && e.name === "ValidationError") {
    return e.errors.map(error => _.pick, ["path", "message"]);
  }
  return [{ path: "other", message: "something when wrong" }];
};
