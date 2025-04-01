import Image from "next/image";
import { dashboardData, locations, productData } from "@/data/dashboardData";
import { Slider } from "@/components/ui/slider";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { ProductCard } from "@/components/ProductCard";

interface DashboardCardProps {
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  isPositive,
}) => {
  return (
    <div className="w-full md:w-64 h-auto min-h-36 rounded-2xl border border-[#3D3D3D] p-4 bg-[#181818] flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="text-white text-sm font-medium">{title}</span>
        <ArrowUpRight className="text-gray-400 w-4 h-4" />
      </div>
      <span className="text-blue-500 text-3xl font-semibold">{value}</span>
      <div className="flex items-center gap-1 text-sm text-gray-400">
        {isPositive ? (
          <TrendingUp className="text-green-500 w-4 h-4" />
        ) : (
          <TrendingDown className="text-red-500 w-4 h-4" />
        )}
        <span className={isPositive ? "text-green-500" : "text-red-500"}>
          {change}%
        </span>
        <span>From last week</span>
      </div>
    </div>
  );
};

export default function Home() {
  const { salesTarget, salesPerformance } = dashboardData;

  const chartData = salesPerformance.months.map((month, index) => ({
    month,
    averageSaleValue: salesPerformance.averageSaleValues[index],
    averageItemPersale: salesPerformance.averageItemPersale[index],
  }));
  return (
    <div className="w-full">
      <h1 className="text-3xl">Dashboard</h1>
      <div className="w-full flex gap-2 flex-col">
        {/* first section */}
        <div className="w-full flex  flex-wrap">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 md:w-full flex justify-center items-center gap-3 flex-col">
            {/* Sales Target Section */}
            <div className="w-full max-w-xl h-auto h-36 rounded-2xl border border-[#3D3D3D] p-4 bg-[#181818]">
              <div className="flex justify-between text-white text-lg font-semibold">
                <span>Sales Target</span>
                <span>Sales Target</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm mt-2">
                <span>In Progress</span>
                <span>${salesTarget.target.toLocaleString()}</span>
              </div>
              <div className="text-white text-2xl font-bold mt-1">
                ${salesTarget.inProgress.toLocaleString()}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-gray-700 rounded-full mt-3 relative">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${
                      (salesTarget.inProgress / salesTarget.target) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Sales Performance Chart Section */}
            <div className="w-full max-w-xl h-auto min-h-96 rounded-2xl border border-[#3D3D3D] p-4 bg-[#181818]">
              <div className="flex justify-between text-white">
                <h3 className="text-lg font-semibold">Your Sales this Year</h3>
                <button className="text-gray-400 text-sm">Show All</button>
              </div>

              {/* Legend */}
              <div className="flex gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-white text-sm">Average Sale Value</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-white text-sm">
                    Average Item Persale
                  </span>
                </div>
              </div>
              {/* Chart */}
            </div>
          </div>
          {/* Right Section */}
          <div className="lg:w-1/2 md:w-1/2 sm:w-full flex flex-col gap-2">
            <div className=" flex gap-3 flex-col">
              <div className="flex gap-3">
                <DashboardCard
                  title="Total Revenue"
                  value="$81.000"
                  change={10.6}
                  isPositive={true}
                />
                <DashboardCard
                  title="Total Customer"
                  value="5.000"
                  change={1.5}
                  isPositive={true}
                />
              </div>
              <div className="flex gap-3">
                <DashboardCard
                  title="Total Transactions"
                  value="12.000"
                  change={3.6}
                  isPositive={true}
                />
                <DashboardCard
                  title="Total Product"
                  value="5.000"
                  change={-1.5}
                  isPositive={false}
                />
              </div>
            </div>
            <div className="w-full h-full md:pr-6">
              <div
                className="md:w-2/3 lg:w-2/3 sm:w-full h-full p-5 bg-cover rounded-4xl flex flex-col items-start justify-center text-white"
                style={{ backgroundImage: "url('/nexBg.jpeg')" }}
              >
                <h1 className="text-4xl font-bold">Increase your sales</h1>
                <p className="mt-2 text-lg">
                  Discover the Proven Methods to Skyrocket Your Sales! Unleash
                  the Potential of Your Business and Achieve Remarkable Growth.
                  Whether you're a seasoned entrepreneur or just starting out.
                </p>
                <button className="mt-4 px-6 py-2 border-3 border-blue-600 text-blue-600 bg-white rounded-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* second section */}
        <div className="w-full  flex flex-wrap">
          <div className="w-full lg:w-1/3 md:w-full flex justify-center lg:justify-end items-center">
            <Card className="w-full max-w-md h-auto min-h-96 border border-[#3D3D3D] rounded-2xl lg:mr-6 p-4 bg-black text-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Customer Growth <br /> 3 Province
                </h2>
                <a href="#" className="text-sm text-gray-400 flex items-center">
                  Show All &rarr;
                </a>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {locations.map((loc) => (
                  <div key={loc.name} className="flex items-center space-x-1">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: loc.color }}
                    ></span>
                    <span className="text-xs">
                      {loc.name} <strong>({loc.percentage}%)</strong>
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full h-64 border border-gray-700 rounded-2xl overflow-hidden bg-gray-200 relative">
                {/* Map Holder */}
                <div className="w-full h-full bg-gray-300 relative">
                  <img
                    src="/api/placeholder/400/320"
                    alt="Indonesia Map"
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-black font-semibold">
                    Indonesia
                  </div>

                  {/* Map Pins */}
                  {locations.map((locations, index) => (
                    <div
                      key={index}
                      className="absolute w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: locations.color,
                        // Position pins based on rough coordinates (would be more precise with actual map implementation)
                        left:
                          locations.name === "East Java"
                            ? "25%"
                            : locations.name === "Kalimantan"
                            ? "60%"
                            : "40%",
                        top:
                          locations.name === "East Java"
                            ? "75%"
                            : locations.name === "Kalimantan"
                            ? "35%"
                            : "65%",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          <div className="w-full lg:w-2/3 md:w-full">
            <ProductCard title="Product Popular" data={productData} />
          </div>
        </div>
      </div>
    </div>
  );
}
