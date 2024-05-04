import type { Login } from "$lib/Class/Type";

export async function logIn(loginData : Login) {
        const response = await fetch("http://localhost:5272/api/Account/login", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        return response;
}