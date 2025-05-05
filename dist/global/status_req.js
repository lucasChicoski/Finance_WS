"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/global/status_req.ts
var status_req_exports = {};
__export(status_req_exports, {
  StatusReq: () => StatusReq
});
module.exports = __toCommonJS(status_req_exports);
var StatusReq = class {
  constructor(status, data, message) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.statusText = "success";
  }
  static response(status, data, message) {
    return {
      "status": status,
      "data": data,
      "message": message,
      "statusText": "success"
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StatusReq
});
