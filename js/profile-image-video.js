/*  ========================================================================  *\

    V M J  ~  P R O F I L E - I M A G E - V I D E O . J S

     - Kattintásra a profilképet videóvá alakítja, és lejátsza.
     - Hover hatás: nagyítás és árnyék (CSS-ben van), de a videó csak kattintásra indul el.
     - Ha elhagyjuk a területet, a videó leáll, és visszaáll a kép (ha nem vagyunk playing állapotban).
     - Ha a videó véget ér, automatikusan visszaáll a kép.

\*  ========================================================================  */

const profile = document.querySelector('.profile-image');
const video   = document.querySelector('.profile-video');

if (profile && video) {

    // Hover / leave – a preview-t kezeli (nagyítás és videó váltás CSS-ben van)
    profile.addEventListener('mouseleave', () => {
        // Mindig leállítjuk a videót, ha elhagyjuk a területet
        video.pause();
        video.currentTime = 0;

        // Ha NEM vagyunk playing állapotban → méretet is visszaállítjuk
        if (!profile.classList.contains('playing')) {
            profile.style.transform = 'scale(1)';
            profile.style.boxShadow = 'none';
        }
        // Ha playing van → a méret marad nagyítva (CSS .playing szabály miatt)
    });

    // Kattintás: toggle play / pause + playing class kezelése
    profile.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (video.paused || video.ended) {
            // Indítás vagy újraindítás
            video.muted = false;
            video.volume = 0.7;               // kicsit halkabb, finomabb
            video.currentTime = 0;
            video.play().catch(err => {
                console.log("Videó lejátszási hiba:", err);
            });

            // Playing állapot → marad nagyítva
            profile.classList.add('playing');
        } else {
            // Megszakítás / leállítás
            video.pause();
            video.currentTime = 0;

            // Playing állapot megszűnik → méret visszaáll (CSS hover nélkül)
            profile.classList.remove('playing');
            profile.style.transform = 'scale(1)';
            profile.style.boxShadow = 'none';
        }
    });

    // Opcionális: ha a videó természetesen véget ér → automatikusan megszüntetjük a playing állapotot
    video.addEventListener('ended', () => {
        profile.classList.remove('playing');
        profile.style.transform = 'scale(1)';
        profile.style.boxShadow = 'none';
    });
}