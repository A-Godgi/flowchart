import React, {useEffect, useState} from 'react';
import {ChartElement} from "../types";
import ChartElementComponent from "./ChartElementComponent";

interface Props {
    setServiceCounter: React.Dispatch<React.SetStateAction<number>>;
}

const Chart: React.FC<Props> = ({setServiceCounter}) => {
    const [chartData, setChartData] = useState<ChartElement[]>([
        {
            "id": "1",
            "title": "Categories",
            "type": "category",
            "isEditable": false,
            "children": []
        }
    ]);

    const countServices = (chartElement: ChartElement[]) => {
        let result = 0;
        for(let i of chartElement){
            if(i.type === 'service'){
                result++;
            }
            if(i.children){
                result += countServices(i.children);
            }
        }
        return result;
    }

    useEffect(() => {
        setServiceCounter(countServices(chartData));
    },[chartData, setServiceCounter])

    return (
        <React.Fragment>
            {chartData.map((rootElement: ChartElement) => (
                <ChartElementComponent
                    key={rootElement.id}
                    element={rootElement}
                    chartData={chartData}
                    setChartData={setChartData}
                />
            ))}
        </React.Fragment>
    );
};

export default Chart;