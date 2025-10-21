import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />

      <main id="Home" className="container mx-auto px-4">
        <section className="text-center min-h-[70vh] flex flex-col justify-center items-center">
          <h1
            id="home-title"
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white"
          >
            Jelajahi Alam Semesta dengan
          </h1>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#45A29E] to-[#66FCF1] mt-2 animate-pulse">
            Space End
          </h2>
          <p className="text-lg md:text-md sm:text-sm max-w-3xl mx-auto text-[#C5C6C7] mt-4">
            Gerbang Anda menuju bintang dan lebih jauh lagi. Temukan pembaruan
            terbaru, fitur canggih, dan terhubung dengan komunitas sesama
            penjelajah.
          </p>
          <button
            type="button"
            aria-label="Lihat Pembaruan"
            className="mt-8 bg-[#45A29E] hover:bg-[#66FCF1] text-white hover:text-[#0B0C0C] font-semibold py-3 px-8 rounded-lg transition-all duration-300 text-lg"
          >
            Lihat Pembaruan
          </button>
        </section>

        {/* Changelog placeholder agar navbar link berfungsi */}
        <section
          id="Changelog"
          className="min-h-[60vh] py-16"
          aria-labelledby="changelog-title"
        >
          <div className="max-w-4xl mx-auto">
            <h3
              id="changelog-title"
              className="text-3xl font-bold text-white mb-4"
            >
              Changelog
            </h3>
            <p className="text-[#C5C6C7]">
              Daftar perubahan, pembaruan, dan perbaikan terbaru akan muncul di
              sini.
            </p>
          </div>
        </section>

        <section id="Komunitas" className="min-h-[50vh] py-16 bg-black/5">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Komunitas</h3>
            <p className="text-[#C5C6C7]">
              Bergabunglah dengan diskusi, acara, dan proyek open-source kami.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
