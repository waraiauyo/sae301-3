import "./globals.css";
import {ThemeProvider} from "next-themes";
import {Main} from "@/components/wrappers";
import {Navbar} from "@/components/navigation";

export const metadata = {
    title: "MSTRFinder",
    description: "",
};

export default function RootLayout({children}) {
    return (
        <html lang="fr">
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
        >
            <Main>
                <Navbar/>
                {children}
            </Main>
        </ThemeProvider>
        </body>
        </html>
    );
}
