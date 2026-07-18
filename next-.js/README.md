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


## 🔄 Client-Side Redirect After Successful Login

After a successful login, the application displays a success toast notification and redirects the user to the dashboard using Next.js `useRouter()`.

> **💡 Highlights**
>
> - Displays a success message using **react-hot-toast**.
> - Redirects authenticated users to the **Dashboard**.
> - Shows an error toast if the login attempt fails.
> - Uses `useEffect` to react to changes in the authentication state.

```tsx
const router = useRouter();

useEffect(() => {
  if (!state) return;

  if (state.success) {
    toast.success(state.message || "Login successful");
    router.push("/dashboard");
  }

  if (!state.success) {
    toast.error(state.message || "Login failed");
  }
}, [state, router]);
```

> **📌 Note:**  
> `router.push("/dashboard")` performs a **client-side navigation**, meaning the page changes without a full browser refresh, providing a faster and smoother user experience.