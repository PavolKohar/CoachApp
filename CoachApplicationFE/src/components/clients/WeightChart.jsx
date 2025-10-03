import { LineChart,Line,XAxis,YAxis,CartesianGrid,ResponsiveContainer,Tooltip } from "recharts";


function WeightChart ({records}){


    
      return (
            <div className="card p-4 shadow">
            <h5 className="text-center mb-4">📉 Weight Progress</h5>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={records}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} unit="kg" />
                <Tooltip formatter={(value) => [`${value} kg`, 'Weight']} />
                <Line type="monotone" dataKey="weight" stroke="#28a745" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
            </div>
  );
    
}

export default WeightChart;