const navItem = ["Home", "About", "Community"];

export default function Navbar() {
    return (
        <nav className="sticky top-0 bg-black/50 backdrop-blur-md py-4 px-8 z-10">
            <div className="flex justify-between items-center">
                <p className="text-white text-2xl font-bold animate-pulse">
                    Space End
                </p>
                <div className="flex gap-8">
                    {navItem.map((link) => (
                        <a
                            href="#"
                            key={link}
                            className="text-white font-medium hover:text-teal-300 transition"
                        >{link}</a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
