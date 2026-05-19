import React, { useState, useMemo } from "react";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
import { Zap, Route } from "lucide-react";

const Row = ({
  label,
  value,
  unit,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs sm:text-sm font-medium text-foreground">{label}</span>
      <span className="text-xs sm:text-sm font-semibold tabular-nums">
        {value} {unit}
      </span>
    </div>
    <Slider
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={(v) => onChange(v[0])}
    />
  </div>
);

const ChargingCalculator = () => {
  // Maliyet hesaplayıcı
  const [consumption, setConsumption] = useState(15); // kWh/100km
  const [price, setPrice] = useState(9); // TL/kWh
  const [distance, setDistance] = useState(100); // km

  // Menzil hesaplayıcı
  const [percent, setPercent] = useState(80); // %
  const [battery, setBattery] = useState(60); // kWh

  const cost = useMemo(
    () => (consumption / 100) * distance * price,
    [consumption, distance, price]
  );

  const range = useMemo(() => {
    if (consumption <= 0) return 0;
    return ((battery * percent) / 100 / consumption) * 100;
  }, [battery, percent, consumption]);

  return (
    <section className="py-1 bg-background" aria-labelledby="calc-heading">
      <div className="container mx-auto px-2 sm:px-4">
        <h2
          id="calc-heading"
          className="text-base md:text-2xl font-bold text-center mb-1 leading-tight text-foreground"
        >
          Hesaplama
        </h2>

        <Card className="border border-border p-2 sm:p-4 md:p-6">
          <div className="grid md:grid-cols-[1fr_220px] gap-2 md:gap-6 items-center">
            <div className="space-y-2">
              <Row
                label="Ortalama Sarfiyat"
                value={consumption}
                unit="kWh"
                min={5}
                max={80}
                step={1}
                onChange={setConsumption}
              />
              <Row
                label="Şarj Fiyatı"
                value={price}
                unit="₺"
                min={1}
                max={25}
                step={0.1}
                onChange={(v) => setPrice(Number(v.toFixed(1)))}
              />
              <Row
                label="Gideceğim Mesafe"
                value={distance}
                unit="km"
                min={1}
                max={750}
                step={1}
                onChange={setDistance}
              />
            </div>
            <div className="flex items-center justify-between bg-muted/50 rounded-md px-2.5 py-1 border border-border">
              <div className="flex items-center gap-1.5 text-foreground text-base sm:text-lg font-bold">
                <Zap className="h-5 w-5 text-teal-500" /> Ne Tutar?
              </div>
              <div className="text-lg sm:text-xl font-bold text-teal-600 tabular-nums">
                {cost.toFixed(2)} ₺
              </div>
            </div>
          </div>

          <div className="my-2 md:my-6 border-t border-border" />

          <div className="grid md:grid-cols-[1fr_220px] gap-2 md:gap-6 items-center">
            <div className="space-y-2">
              <Row
                label="Şarj Yüzdem"
                value={percent}
                unit="%"
                min={1}
                max={100}
                step={1}
                onChange={setPercent}
              />
              <Row
                label="Toplam Bataryam"
                value={battery}
                unit="kWh"
                min={10}
                max={150}
                step={1}
                onChange={setBattery}
              />
            </div>
            <div className="flex items-center justify-between bg-muted/50 rounded-md px-2.5 py-1 border border-border">
              <div className="flex items-center gap-1.5 text-foreground text-base sm:text-lg font-bold whitespace-nowrap">
                <Route className="h-5 w-5 text-teal-500" /> Kaç Km Gider?
              </div>
              <div className="text-lg sm:text-xl font-bold text-teal-600 tabular-nums whitespace-nowrap">
                {range.toFixed(0)} km
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ChargingCalculator;
