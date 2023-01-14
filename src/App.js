import "./styles/App.css";
import config from "./resources/config.json";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function Discord() {
      const fragment = new URLSearchParams();

      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get("code");

      fragment.append("client_id", config.clientId);
      fragment.append("client_secret", config.clientSecret);
      fragment.append("grant_type", "authorization_code");
      fragment.append("code", code);
      fragment.append("redirect_uri", "http://localhost:3000");

      let site = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: fragment,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      let response = await site.json();
      let accessToken = response["access_token"];

      fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
        .then((result) => result.json())
        .then((response) => {
          const { username, discriminator, id } = response;
          console.log(`${username}#${discriminator} ${id}`);
        })
        .catch(console.error);
    }

    Discord();
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>Thank you for registration!</p>
        <a
          className="App-link"
          href="https://discord.gg/pTtQTUQM68"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord
        </a>
      </header>
    </div>
  );
}

export default App;
