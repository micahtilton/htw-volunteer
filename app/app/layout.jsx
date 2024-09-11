// app/layout.jsx
import Header from "@/components/header";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <Header></Header>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
