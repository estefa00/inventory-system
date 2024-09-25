import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement } from "chart.js";
import './InventoryPage.css';

// Registrar componentes de ChartJS
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement);

function InventoryPage() {
  const [inventoryData, setInventoryData] = useState({
    devices: 10,
    devicesInUse: 4,
    devicesCharging: 3,
    devicesNeedCharging: 2,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventoryData((prevState) => ({
      ...prevState,
      [name]: Number(value)
    }));
  };

  const barData = {
    labels: ["En Uso", "Disponibles"],
    datasets: [
      {
        label: "Dispositivos",
        data: [inventoryData.devicesInUse, inventoryData.devices - inventoryData.devicesInUse],
        backgroundColor: ["#4ade80", "#86efac"],
        borderColor: "#ffffff",
        borderWidth: 1,
      }
    ]
  };

  const pieData = {
    labels: ["En Carga", "Necesitan Carga"],
    datasets: [
      {
        data: [inventoryData.devicesCharging, inventoryData.devicesNeedCharging],
        backgroundColor: ["#4ade80", "#f59e0b"],
        borderColor: "#ffffff",
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="container">
      <h2>Gestión de Inventario</h2>

      <form className="inventory-form">
        <div>
          <label>Total de Dispositivos:</label>
          <input
            type="number"
            name="devices"
            value={inventoryData.devices}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div>
          <label>Dispositivos en Uso:</label>
          <input
            type="number"
            name="devicesInUse"
            value={inventoryData.devicesInUse}
            onChange={handleChange}
            min="0"
            max={inventoryData.devices}
          />
        </div>
        <div>
          <label>Dispositivos en Carga:</label>
          <input
            type="number"
            name="devicesCharging"
            value={inventoryData.devicesCharging}
            onChange={handleChange}
            min="0"
            max={inventoryData.devices}
          />
        </div>
        <div>
          <label>Dispositivos que Necesitan Carga:</label>
          <input
            type="number"
            name="devicesNeedCharging"
            value={inventoryData.devicesNeedCharging}
            onChange={handleChange}
            min="0"
            max={inventoryData.devices}
          />
        </div>
      </form>

      <div className="chart-container">
        <h3>Estado de los Dispositivos</h3>
        <Bar data={barData} options={{ responsive: true }} />
      </div>

      <div className="chart-container">
        <h3>Estado de la Carga de los Dispositivos</h3>
        <Pie data={pieData} options={{ responsive: true }} />
      </div>

      <div className="inventory-info">
        <p>Total de dispositivos: {inventoryData.devices}</p>
        <p>Dispositivos en uso: {inventoryData.devicesInUse}</p>
        <p>Dispositivos disponibles: {inventoryData.devices - inventoryData.devicesInUse}</p>
        <p>Dispositivos en carga: {inventoryData.devicesCharging}</p>
        <p>Dispositivos que necesitan carga: {inventoryData.devicesNeedCharging}</p>
      </div>

      <button className="button">Actualizar Inventario</button>
    </div>
  );
}

export default InventoryPage;
