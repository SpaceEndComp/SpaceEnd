export default function Hero() {
    return (
        <section className="text-center min-h-[70vh] flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                Jelajahi Alam Semesta dengan
            </h1>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#45A29E] to-[#66FCF1] mt-2 animate-pulse">
                Space End
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#C5C6C7] mt-4">
                Gerbang Anda menuju bintang dan lebih jauh lagi. Temukan
                pembaruan terbaru, fitur canggih, dan terhubung dengan komunitas
                sesama penjelajah.
            </p>
            <button className="mt-8 bg-[#45A29E] hover:bg-[#66FCF1] text-white hover:text-[#0B0C0C] font-semibold py-3 px-8 rounded-lg transition-all duration-300 text-lg">
                Get Started
            </button>
        </section>
    );
}
