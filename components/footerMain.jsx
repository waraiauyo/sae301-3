import Link from "next/link";

const FooterHome = () => {
    return (
        <footer className="bg-black text-gray-400 py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="text-lg font-bold text-white">
                        <Link href="/">
                            MSTR<span className="text-primary">Finder</span>
                        </Link>
                    </div>

                    <div className="flex space-x-6">
                        <a href="/about" className="hover:text-white">
                            À propos
                        </a>
                        <a href="/legal" className="hover:text-white">
                            Mentions légales
                        </a>
                        <a href="/privacy" className="hover:text-white">
                            Politique de confidentialité
                        </a>
                    </div>

                    <div className="flex space-x-4">
                        <a href="https://facebook.com" aria-label="Facebook" className="hover:text-primary">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" aria-label="Twitter" className="hover:text-primary">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-primary">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>

                <div className="mt-4 text-center text-sm border-t border-gray-700 pt-4">
                    © 2024 MSTRfinder. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
};

export {FooterHome}
