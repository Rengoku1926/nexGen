export interface SalesTargetData {
    inProgress: number;
    target: number;
  }
  
  export interface SalesPerformanceData {
    months: string[];
    averageSaleValues: number[];
    averageItemPersale: number[];
  }
  
  export const dashboardData: { salesTarget: SalesTargetData; salesPerformance: SalesPerformanceData } = {
    salesTarget: {
        inProgress: 231032444,
        target: 500000000,
      },
      salesPerformance: {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        averageSaleValues: [200000000, 220000000, 180000000, 190000000, 210000000, 250000000, 270000000, 280000000, 290000000, 300000000, 310000000, 330000000],
        averageItemPersale: [150000000, 160000000, 140000000, 145000000, 155000000, 175000000, 185000000, 190000000, 200000000, 215000000, 225000000, 235000000],
      },
  };

  export const locations = [
    { name: "East Java", lat: -7.2504, lng: 112.7688, color: "#7ED957", percentage: 50 },
    { name: "Kalimantan", lat: -1.25, lng: 113.5, color: "#FF3B30", percentage: 50 },
    { name: "Bali", lat: -8.3405, lng: 115.092, color: "#FFC107", percentage: 65 },
  ];
  
  export interface ProductData {
    id: string
    name: string
    price: number
    sales: number
    status: "Success" | "Processing" | "Failed"
    image: string
  }
  
  export const productData: ProductData[] = [
    {
      id: "021231",
      name: "Kanky Kitadakate (Green)",
      price: 20.00,
      sales: 3000,
      status: "Success",
      image: "/shoe-image.png" 
    },
    {
      id: "021231",
      name: "Kanky Kitadakate (Green)",
      price: 20.00,
      sales: 2311,
      status: "Success",
      image: "/shoe-image.png"
    },
    {
      id: "021231",
      name: "Kanky Kitadakate (Green)",
      price: 20.00,
      sales: 2111,
      status: "Success",
      image: "/shoe-image.png"
    },
    {
      id: "021231",
      name: "Kanky Kitadakate (Green)",
      price: 20.00,
      sales: 1661,
      status: "Success",
      image: "/shoe-image.png"
    },
  ]