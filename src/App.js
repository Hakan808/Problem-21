import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Bileşenimiz mouse hareketlerini takip eder ve koordinatları ekrana yazdırır.
// Bazı eksiklikler ve olası hatalar bulunuyor.

// Görevler:
// 1. useEffect içinde eklenen event listener, bileşen kaldırıldığında (unmount) temizlenmiyor.
//    - cleanup fonksiyonunu ekleyerek, bileşen kaldırıldığında event listener'ın kaldırılmasını sağlayın.
// 2. Mevcut kodda, "Can't perform a React state update on an unmounted component" hatası oluşabilir.
//    - Bu hatayı neden alabiliriz? Kodda değişiklik yapmadan nasıl önleyebiliriz?
// 3. Mouse'un X ve Y koordinatları state'te tutuluyor, ancak performans açısından gereksiz güncellemeler olabilir.
//    - Bunu optimize etmek için ne yapılabilir?

// Bonus:
// - React bileşeni Next.js veya başka bir SSR (Server-Side Rendering) ortamında çalıştırıldığında,
//   "document is not defined" hatası alınabilir.
//   - Bunun sebebi nedir? window nesnesi yalnızca tarayıcıda bulunduğuna göre, SSR uyumlu hale getirmek için ne yapmalıyız?
// - Tailwind CSS kullanılarak, mouse koordinatlarını ekranda bir tooltip efektiyle gösterecek stil ekleyin.
// - Tailwind'in eklenti sistemi ile özel bir shadow-glow efekti tanımlayın ve nasıl eklendiğini açıklayın.

export default function App() {
  return (
    <div className="flex justify-center flex-col items-center py-8">
      <h1 className="text-2xl font-bold pb-4">🐭</h1>
      <BrowserRouter>
        <nav className="flex justify-center max-w-sm p-4 pb-8 space-x-4">
          <Link className="underline" to="/">
            Home
          </Link>
          <Link className="underline" to="/about">
            About
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<MousePosition />} />
          <Route
            path="/about"
            element={<h1>Mouse&apos;unuzu takip edin!</h1>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function MousePosition() {
  const posRef = useRef({ x: 0, y: 0 });
  const resultRef = useRef(null);
  console.log(resultRef);
  useEffect(() => {
    if(typeof window === "undefined") return;


    function handleMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (resultRef.current) {
        resultRef.current.style.left = e.clientX + 10 + "px";
        resultRef.current.style.top = e.clientY + 10 + "px";
        resultRef.current.textContent = `X: ${e.clientX}, Y:${e.clientY}`;
      }
      console.log("Updating state");
    }
    window.addEventListener("pointermove", handleMove);

    return () => {
      console.log("Unmounted");
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return (
    <div className="space-y-5">
      <div ref={resultRef} className="fixed pointer-events-none px-2 py-1 text-white text-sm bg-black/80 rounded-xl shadow-glow">X: 0, Y: 0</div>
    </div>
  );
}
