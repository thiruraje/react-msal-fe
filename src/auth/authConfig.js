export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MSAL_CLIENT_ID,       // from Azure
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MSAL_TENANT_ID}`,
    redirectUri: process.env.REACT_APP_MSAL_REDIRECT_URL
  }
};

export const loginRequest = {
  scopes: ["User.Read", "GroupMember.Read.All"],  // permissions you need
};
    

export const apiTokenRequest = {
    scopes: [`api://${process.env.REACT_APP_MSAL_CLIENT_ID_BE}/Read`],
};