import { Inter } from "next/font/google";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/font-awesome-4/css/font-awesome.min.css";
import "./globals.css";
import Navbar from "./templateParts/Navbar";
import Footer from "./templateParts/Footer";
import { Toaster } from "react-hot-toast";
import { UserProviderWrapper } from "@/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Delivery Guy",
  description: "Delivery App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body className={inter.className}>
        <UserProviderWrapper>
          <Toaster />
          <Navbar />
          <div className="container-fluid py-5">{children}</div>
          <Footer />
        </UserProviderWrapper>
      </body>
    </html>
  );
}
