export const environment = {
  production: true,
  appVersion: "v" + require("../../package.json").version,
  appId: "",
  integration_service:
    "https://integration.senwes.co.za/service/corporateservices/securedocuments/api",
  auth_service: "https://ws.senwes.co.za/service/oneagri/security/api"
};
