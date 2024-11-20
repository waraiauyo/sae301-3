import "./globals.css";
import {Main} from "@/components/wrappers";
import {Navbar} from "@/components/navigation";

export const metadata = {
    title: "v1",
    description: "",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <Main>
            <Navbar/>
            {children}
        </Main>
        </body>
        </html>
    );
}