export const environment = {
    production: false,
    appVersion: "v" + require("../../package.json").version + "-dev",
    appId: "018595df-842f-ee11-b075-84160cd9a450",
    integration_service: "https://integration-qa.senwes.co.za/service/corporateservices/securedocuments/api",
    auth_service: "https://wsstaging.senwes.co.za/api/oneagri/security/api",
    events_service: "https://localhost:59874/api",
    //apiUrl:"http://localhost:3000/",
    api_logistics_base_url: 'https://integration-qa.senwes.co.za/service/retail/b2c_logistics/api/',
    api_orders_base_url: "https://integration-qa.senwes.co.za/service/retail/b2c_orders/api/",
    //'https://integration-qa.senwes.co.za/service/retail/b2c_orders/api/Order/Status/All
    demoToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IndlYmRldnMiLCJuYW1laWQiOiJ3ZWJkZXZzIiwiZW1haWwiOiJkZXZlbG9wZXJAc2Vud2VzLmNvLnphIiwiZ2l2ZW5fbmFtZSI6IlNlbndlcyIsImZhbWlseV9uYW1lIjoiTXVsdGlzaXRlIiwicm9sZSI6IlN5c3RlbVVzZXIiLCJ3aW5kb3dzdXNlcmNsYWltIjoid2ViIiwiZW1wbG95ZWVObyI6IjAwMDAiLCJvbmVpZCI6IndlYmRldnMiLCJuYmYiOjE2MDI1MDY0MjcsImV4cCI6MTg5MzQ1NjAwMCwiaWF0IjoxNjAyNTA2NDI3LCJpc3MiOiJTZW53ZXMgQXV0aCBTZXJ2aWNlIiwiYXVkIjoiU2Vud2VzIEFwcGxpY2F0aW9uIFVzZXJzIn0.BH7RM778YrbK9iV2Sk2fXusCVJzUtWyfjjHuy-ysc8U"

};
