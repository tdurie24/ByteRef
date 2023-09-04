export const environment = {
  production: true,
  appVersion: "v" + require("../../package.json").version + "-qa",
  appId: "018595df-842f-ee11-b075-84160cd9a450",
  integration_service:
    "https://integration-qa.senwes.co.za/service/corporateservices/securedocuments/api",
  auth_service: "https://wsstaging.senwes.co.za/api/oneagri/security/api"
};
