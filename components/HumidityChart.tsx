// HumidityChart.tsx
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
  humidity: string;
}

interface HumidityChartProps {
  roomData: RoomData[];
  humMax: number | null;
  humMin: number | null;
}

const HumidityChart: React.FC<HumidityChartProps> = ({
  roomData,
  humMax,
  humMin,
}) => {
  const chartData = {
    labels: roomData.map((item) =>
      new Date(item.date_record).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Humidity (%)",
        data: roomData.map((item) => parseFloat(item.humidity)),
        fill: false,
        borderColor: "rgba(0, 0, 192, 1)",
        tension: 0.1,
      },

      ...(humMax !== null && humMax !== undefined
        ? [
            {
              label: "Humidity Max (%)",
              data: new Array(roomData.length).fill(humMax),
              fill: false,
              borderColor: "rgba(255, 0, 0, 1)",
              tension: 0,
            },
          ]
        : []),

      ...(humMin !== null && humMin !== undefined
        ? [
            {
              label: "Humidity Min (%)",
              data: new Array(roomData.length).fill(humMin),
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
        text: "Humidity",
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
          text: "Humidity (%)",
        },
        min: 0, // Set min value to 0
        max: 100, // Set max value to 100
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default HumidityChart;
