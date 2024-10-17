"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface RoomData {
  data_id: number;
  room_id: number;
  date_record: string;
  temperature: string;
}

interface TemperatureChartProps {
  roomData: RoomData[];
  tempMax: number | null;
  tempMin: number | null;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({
  roomData,
  tempMax,
  tempMin,
}) => {
  const chartData = {
    labels: roomData.map((item) =>
      new Date(item.date_record).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: roomData.map((item) => parseFloat(item.temperature)),
        fill: false,
        borderColor: "rgba(0, 0, 192, 1)",
      },
      ...(tempMax !== null && tempMax !== undefined
        ? [
            {
              label: "Temperature Max (°C)",
              data: new Array(roomData.length).fill(tempMax),
              fill: false,
              borderColor: "rgba(255, 0, 0, 1)",
              tension: 0,
            },
          ]
        : []),

      ...(tempMin !== null && tempMin !== undefined
        ? [
            {
              label: "Temperature Min (°C)",
              data: new Array(roomData.length).fill(tempMin),
              fill: false,
              borderColor: "rgba(255, 0, 0, 1)",
              tension: 0,
            },
          ]
        : []),
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Temperature",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        min: 0,
        max: 30,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TemperatureChart;
