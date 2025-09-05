import { useEffect, useState } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { apiTokenRequest } from "./auth/authConfig";

function App() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [accessGranted, setAccessGranted] = useState(false);
  const [result, setResult] = useState("");

  const handleLogin = async () => {
    try {
        const response = await instance.loginPopup(apiTokenRequest);
        instance.setActiveAccount(response.account);
    } catch (err) {
        console.error(err);
    }
  };

  const handleLogout = () => {
    instance.logoutPopup().catch(e => console.error(e));
  };

  useEffect(() => {
    if (isAuthenticated) {
      instance.acquireTokenSilent({
        ...apiTokenRequest,
        account: accounts[0],
        forceRefresh: true
      })
      .then(async (tokenRes) => {
        setAccessGranted(true);
        const response = await fetch("http://localhost:4000/api/protected", {
            headers: {
              Authorization: `Bearer ${tokenRes.accessToken}`,
            },
          });
          const res = await response.json();
          setResult(res.message);
      })
      .catch(err => console.error("Token acquisition failed", err));
    }
  }, [isAuthenticated, instance, accounts]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React + MSAL + Group Restriction</h1>

      {!isAuthenticated ? (
        <button onClick={handleLogin}>Login with Microsoft</button>
      ) : (
        <>
          <p>Logged in as: <b>{accounts[0]?.username}</b></p>
          <button onClick={handleLogout}>Logout</button>

          {accessGranted ? (
            <div>
              <h2>✅ Access Granted</h2>
              <p>Welcome! You are in the allowed security group.</p>
              <h1>Result: {result || ""}</h1>
            </div>
          ) : (
            <div>
              <h2>❌ Access Denied</h2>
              <p>You are not a member of the required group.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
