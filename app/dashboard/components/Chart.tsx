// components/Chart.tsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, Title, Tooltip, Legend);

import { ChartData } from 'chart.js';

interface ChartProps {
  data: {
    title: string;
    chartData: ChartData<'line'>;
  };
}

const Chart = ({ data }: ChartProps) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{data.title}</h3>
      <Line data={data.chartData} />
    </div>
  );
};

export default Chart;
