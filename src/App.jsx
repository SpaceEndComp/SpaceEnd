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
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-once="true"
          >
            Jelajahi Alam Semesta dengan
          </h1>
          <h2
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#45A29E] to-[#66FCF1] mt-2 animate-pulse"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-once="true"
          >
            Space End
          </h2>
          <p
            className="text-lg md:text-md sm:text-sm max-w-3xl mx-auto text-[#C5C6C7] mt-4"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-once="true"
          >
            Gerbang Anda menuju bintang dan lebih jauh lagi. Temukan pembaruan
            terbaru, fitur canggih, dan terhubung dengan komunitas sesama
            penjelajah.
          </p>
          <a
            href="https://github.com/SpaceEndComp/Zombie-Apocalypse"
            type="button"
            aria-label="Lihat Pembaruan"
            className="mt-8 bg-[#45A29E] hover:bg-[#66FCF1] text-white hover:text-[#0B0C0C] font-semibold py-3 px-8 rounded-lg transition-all duration-300 text-lg"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            Lihat Pembaruan
          </a>
        </section>

        {/* Changelog placeholder agar navbar link berfungsi */}
        <section
          id="Changelog"
          className="min-h-[60vh] py-16 mt-32"
          aria-labelledby="changelog-title"
        >
          <div className="max-w-4xl mx-auto">
            <h3
              id="changelog-title"
              className="text-3xl font-bold text-white mb-4"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
              data-aos-once="true"
            >
              Changelog
            </h3>
            <p
              className="text-[#C5C6C7]"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
              data-aos-once="true"
            >
              Daftar perubahan, pembaruan, dan perbaikan terbaru akan muncul di
              sini.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <img
                  key={`changelog-${i}`}
                  src={`https://picsum.photos/seed/changelog-${i + 1}/800/600`}
                  alt={`Changelog image ${i + 1}`}
                  className="w-full h-48 object-cover rounded hover:transform hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={i * 100 + 200}
                  data-aos-once="true"
                />
              ))}
            </div>
          </div>
        </section>

        <section id="Komunitas" className="mt-32 min-h-[50vh] py-16 bg-black/5">
          <div className="max-w-4xl mx-auto">
            <h3
              className="text-3xl font-bold text-white mb-4"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
              data-aos-once="true"
            >
              Komunitas
            </h3>
            <p
              className="text-[#C5C6C7]"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
              data-aos-once="true"
            >
              Bergabunglah dengan diskusi, acara, dan proyek open-source kami.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <img
                  key={`komunitas-${i}`}
                  src={`https://picsum.photos/seed/komunitas-${i + 1}/800/600`}
                  alt={`Komunitas image ${i + 1}`}
                  className="w-full h-48 object-cover rounded hover:transform hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={i * 100 + 200}
                  data-aos-once="true"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
