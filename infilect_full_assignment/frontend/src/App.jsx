import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function App() {
  const [data, setData] = useState([]);

  const fetchMetrics = async () => {
    const res = await fetch('http://localhost:8000/metrics');
    const json = await res.json();
    setData(prev => [...prev.slice(-20), json]);
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Monitoring Dashboard</h2>

      <LineChart width={800} height={400} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="cpu_usage" stroke="red" />
        <Line type="monotone" dataKey="latency_ms" stroke="blue" />
        <Line type="monotone" dataKey="memory_usage" stroke="green" />
      </LineChart>

      <h4>Latest Metrics</h4>
      {data.length > 0 && (
        <div>
          CPU: {data[data.length-1].cpu_usage}% <br/>
          Latency: {data[data.length-1].latency_ms}ms <br/>
          Memory: {data[data.length-1].memory_usage}% <br/>
          Requests Count: {data[data.length-1].request_count}
        </div>
      )}
    </div>
  );
}

export default App;
