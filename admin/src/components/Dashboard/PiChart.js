import './DashboardUi.scss'
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";

const data = [
    { name: "Buisness", value: 400 },
    { name: "History", value: 300 },
    { name: "Space Science", value: 300 },
    { name: "Agriculture", value: 200 }
];

const data1 = [
    { name: "Journalism", value: 500 },
    { name: "Psycology", value: 100 },
    { name: "Literature", value: 300 },
    { name: "Engineering", value: 400 }
];

const data2 = [
    { name: "Regional", value: 200 },
    { name: "Kids", value: 200 },
    { name: "JEE/NEET", value: 500 },
    { name: "Health", value: 400 }
];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="black"
            >{`Sold ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="black"
            >
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        </g>
    );
};

export default function Example() {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <>
            <div className="PieChartHolder">
                <PieChart width={400} height={400}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx={200}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="var(--Tertiary-color)"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />


                </PieChart>

                <PieChart width={400} height={400}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data1}
                        cx={200}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="var(--Tertiary-color)"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />


                </PieChart>

                <PieChart width={400} height={400}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data2}
                        cx={200}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="var(--Tertiary-color)"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />


                </PieChart>
            </div>
        </>
    );

}
