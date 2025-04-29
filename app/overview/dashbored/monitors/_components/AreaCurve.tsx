import * as React from 'react';
import { LineChart, areaElementClasses } from '@mui/x-charts/LineChart';

type ThreadData = {
  userId: string;
  astId: string;
  threadId: string;
  threadTitle: string;
  createdAt: string;
  updatedAt: string;
};

type BasicLineChartProps = {
  threadData: ThreadData[];
};

const countThreadsPerDate = (threadData: ThreadData[]): Record<string, number> => {
  const threadCountByDate: Record<string, number> = {};
  threadData.forEach((thread) => {
    const createdAtDate = new Date(thread.createdAt).toDateString();
    threadCountByDate[createdAtDate] = (threadCountByDate[createdAtDate] || 0) + 1;
  });
  return threadCountByDate;
};

const BasicLineChart: React.FC<BasicLineChartProps> = ({ threadData }) => {
  const threadCounts = countThreadsPerDate(threadData);

  const dates = Object.keys(threadCounts);
  const counts = Object.values(threadCounts);

  const formattedDates = dates.map((_, index) => index);

  return (
    <div className="w-full h-[40vh]">
      <svg width="0" height="0">
        <defs>
          <linearGradient id="swich-color-id-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3474eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#a4c8f7', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>

      <LineChart
        xAxis={[{ data: formattedDates }]}
        series={[
          {
            data: counts,
            area: true,
          },
        ]}
        sx={{
          [`& .${areaElementClasses.root}`]: {
            fill: 'url(#swich-color-id-2)',
          },
        }}
      />
    </div>
  );
};

export default BasicLineChart;