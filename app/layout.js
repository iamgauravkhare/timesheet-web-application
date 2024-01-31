import "./globals.css";
import Context from "./context";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Employee Timesheet Application",
  description: "Employee Timesheet Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div className="bg-white w-full min-h-screen gilroy-semibold flex flex-col gap-10 pb-10 capitalize">
          <Context>
            <Navbar />
            {children}
          </Context>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
