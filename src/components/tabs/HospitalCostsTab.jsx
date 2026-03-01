import { useState, useMemo } from "react";
import { MapPin, Sparkles } from "lucide-react";

export default function HospitalCostsTab() {
  const [zipCode, setZipCode] = useState("");
  const [sortBy, setSortBy] = useState("none");

  // Fake regional mapping based on ZIP
  const getRegionFromZip = (zip) => {
    if (zip.startsWith("94")) return "Peninsula";
    if (zip.startsWith("95")) return "Santa Cruz";
    if (zip.startsWith("93")) return "Santa Clara";
    return "All";
  };

  const hospitalData = [
    {
      procedure: "Vaginal Delivery",
      hospital: "Peninsula Medical Center",
      region: "Peninsula",
      price: 12595,
    },
    {
      procedure: "Vaginal Delivery",
      hospital: "Sutter Maternity & Surgery Center of Santa Cruz",
      region: "Santa Cruz",
      price: 11125,
    },
    {
      procedure: "Cesarean Section",
      hospital: "Santa Clara Valley Medical Center",
      region: "Santa Clara",
      price: 40541,
    },
    {
      procedure: "Vaginal Delivery Only",
      hospital: "Santa Clara Valley Medical Center",
      region: "Santa Clara",
      price: 19083,
    },
    {
      procedure: "Obstetrical Care w/Postpartum Care",
      hospital: "Santa Clara Valley Medical Center",
      region: "Santa Clara",
      price: 13278,
    },
  ];

  const region = getRegionFromZip(zipCode);

  const filteredData = useMemo(() => {
    let data =
      region === "All"
        ? hospitalData
        : hospitalData.filter((h) => h.region === region);

    if (sortBy === "price") {
      return [...data].sort((a, b) => a.price - b.price);
    }

    return data;
  }, [zipCode, sortBy]);

  const cheapest = useMemo(() => {
    if (filteredData.length === 0) return null;
    return filteredData.reduce((min, curr) =>
      curr.price < min.price ? curr : min
    );
  }, [filteredData]);

  return (
    <div className="flex flex-col gap-10">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Compare Local Hospital Delivery Costs
        </h1>
        <p className="text-slate-500">
          Transparent pricing to help you confidently plan your delivery.
        </p>
      </div>

      {/* ZIP + Controls */}
      <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <MapPin className="text-teal-600" />
          <input
            type="text"
            placeholder="Enter ZIP Code (ex: 94025)"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <button
          onClick={() => setSortBy("price")}
          className="px-6 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
        >
          Sort by Lowest Price
        </button>
      </div>

      {/* Results */}
      <div className="grid gap-6">

        {filteredData.length === 0 && (
          <div className="text-slate-500">
            Enter a ZIP code to see hospitals in your region.
          </div>
        )}

        {filteredData.map((item, index) => {
          const savings =
            cheapest && item.price !== cheapest.price
              ? item.price - cheapest.price
              : 0;

          return (
            <div
              key={index}
              className={`bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center transition hover:shadow-md ${
                cheapest && item.price === cheapest.price
                  ? "border-2 border-teal-500"
                  : ""
              }`}
            >
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  {item.procedure}
                </h2>
                <p className="text-slate-500">{item.hospital}</p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-teal-700">
                  ${item.price.toLocaleString()}
                </div>

                {cheapest && item.price === cheapest.price && (
                  <div className="flex items-center gap-2 text-sm text-teal-600 font-semibold mt-1">
                    <Sparkles size={14} />
                    Lowest in Region
                  </div>
                )}

                {savings > 0 && (
                  <div className="text-sm text-rose-500 mt-1">
                    ${savings.toLocaleString()} more than lowest
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
