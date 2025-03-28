
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeChargersList from "@/components/HomeChargersList";

const HomeChargers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Ev Şarj Cihazları</h1>
            <p className="text-white text-center mt-4 max-w-3xl mx-auto">
              Elektrikli aracınızı evinizde güvenle şarj etmeniz için en uygun ev tipi şarj cihazları ve çözümleri.
              Enerji verimliliği ve kullanım kolaylığı sunan cihazlarla tanışın.
            </p>
          </div>
        </div>
        <HomeChargersList />
      </main>
      <Footer />
    </div>
  );
};

export default HomeChargers;
