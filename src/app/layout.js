import AppLayout from "@/components/common/AppLayout";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/common/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Pocket Library",
    description: "Quiz based learning platform",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="wrapper">
                    <AppLayout>
                        <Navbar />

                        {children}
                    </AppLayout>
                </div>
            </body>
        </html>
    );
}
