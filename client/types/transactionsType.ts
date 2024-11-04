export type transactions = {
 category: string;
 location: string;
 paymentType: string;
 amount: number;
 _id: any;
 description: string;
};

export interface ChartData {
 labels: string[];
 datasets: {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
  borderRadius: number;
  spacing: number;
  cutout: number;
 }[];
}

export type stat = {
 category: string;
 totalAmount: string;
};
