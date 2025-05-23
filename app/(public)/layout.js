import localFont from "next/font/local";
import "../globals.css";
import InsertPosts from '../components/hooks/InsertPost';
import QueryProvider from "../components/hooks/QueryProvider";
import AuthProvider from "../components/hooks/AuthProvider";
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body theme="light"
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans text-gray-800`}
      >

        <AuthProvider>
          <InsertPosts>
            {children}
          </InsertPosts>
        </AuthProvider>
      </body>
    </html>
  );
}
