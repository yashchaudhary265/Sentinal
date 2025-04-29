import React, { useEffect, useState } from "react";
import { getThreadsByAssistantId } from "@/lib/api";
import BasicLineChart from "../../dashbored/monitors/_components/AreaCurve";

type Props = {
  astId: string;
};

const LineChartSection: React.FC<Props> = ({ astId }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (astId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await getThreadsByAssistantId(astId);
          setData(response);
        } catch (error) {
          console.error("Error fetching chart data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [astId]); // Update only when `astId` changes

  // if (loading) {
  //   return <p className="text-center mt-10">Loading chart data...</p>;
  // }

  return (
    <div className="">
      <BasicLineChart threadData={data?.data || []} />
    </div>
  );
};

export default LineChartSection;