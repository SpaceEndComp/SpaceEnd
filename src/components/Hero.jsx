export default function Hero() {
    return (
        <section className="h-screen flex flex-col justify-center items-center text-center bg-[url(/background-hero.jpg)] bg-cover bg-center mask-b-from-60% mask-b-to-90%">
            <div className="text-white">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
                    Jelajahi Alam Semesta dengan <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#45A29E] to-[#66FCF1]">Space End</span>
                </h1>
                <p className="text-lg mb-6">
                    Your gateway to the stars and beyond.
                </p>
                <button className="bg-black/70 px-8 py-3 rounded-lg hover:bg-teal-700 transition font-medium animate-bounce">
                    Get Started
                </button>
            </div>
        </section>
    );
}
