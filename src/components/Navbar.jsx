import NavLogo from "../assets/nav_logo.jpeg";

const navItem = ["Home", "Changelog", "Komunitas"];

export default function Navbar() {
    return (
        <nav className="sticky top-0 bg-black/60 backdrop-blur-md py-4 px-8 z-10">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img
                        src={NavLogo}
                        alt="Space End Logo"
                        className="w-8 h-8"
                    />
                    <p className="text-white text-2xl font-bold animate-pulse">
                        Space End
                    </p>
                </div>
                <div className="flex gap-8 items-center">
                    {navItem.map((link) => (
                        <a
                            href="#"
                            key={link}
                            className="text-white font-medium hover:text-teal-300 transition"
                        >
                            {link}
                        </a>
                    ))}

                    <button className="bg-primary text-black px-4 py-2 rounded hover:bg-secondary transition" id="loginButton">
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
}
