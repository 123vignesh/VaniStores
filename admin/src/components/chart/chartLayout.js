import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, CartesianGrid } from 'recharts';


const ChartLayout = ({ data, bars }) => {
    return (
        <ResponsiveContainer
            width="100%"
            height="100%"
        >
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 10,
                    left: 0,
                    bottom: 5
                }}
            >
                <CartesianGrid vertical={false} stroke="#222222" />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    interval={1}
                    dataKey="name"
                />
                <YAxis
                    domain={[0, 300]}
                    axisLine={false}
                    tickLine={false}
                    width={50}
                />
                {bars.map((bar) => (
                    <Bar
                        key={bar.key}
                        barSize={16}
                        dataKey={bar.key}
                        stackId="a"
                        fill={bar.fill}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    )
}


export default ChartLayout