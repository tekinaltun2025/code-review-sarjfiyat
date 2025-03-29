
import React from "react";
import { Card } from "./ui/card";

const ChargingStats = () => {
  return (
    <section id="charging-stats" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Türkiye'de Elektrikli Araç Şarj İstatistikleri
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-4xl font-bold text-teal-500 mb-2">5,000+</p>
            <p className="text-gray-600">Şarj İstasyonu</p>
          </Card>
          <Card className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-4xl font-bold text-blue-500 mb-2">15+</p>
            <p className="text-gray-600">Şarj Operatörü</p>
          </Card>
          <Card className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-4xl font-bold text-teal-500 mb-2">100,000+</p>
            <p className="text-gray-600">Elektrikli Araç</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChargingStats;
