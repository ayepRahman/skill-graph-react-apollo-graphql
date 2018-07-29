import _ from "../../../../../../Library/Caches/typescript/2.9/node_modules/@types/lodash";

export const formatErrors = e => {
  let arrayErrors = [];

  if (e && e.name === "ValidationError") {
    for (let field in e.errors) {
      const objError = e.errors[field];
      const obj = _.pick(objError, ["path", "message"]);

      arrayErrors.push(obj);

      console.log("ARRAY", arrayErrors);
    }
    return arrayErrors;
  }

  return [{ path: "other", message: "something when wrong" }];
};
