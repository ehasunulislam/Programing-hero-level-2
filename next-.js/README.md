## 🍪 Store Authentication Tokens in HTTP-Only Cookies

After a successful login, securely store the access token and refresh token using Next.js Server Actions and the `cookies()` API.

```ts
import { cookies } from "next/headers";

const result = await res.json();

// Store tokens in HTTP-Only cookies
if (result.success) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: "lax",
  });

  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  });
}
```