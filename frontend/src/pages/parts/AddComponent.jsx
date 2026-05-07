import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddComponent() {
  const componentsType = {
    Drivetrain: ["Chain", "Cassette", "Crankset", "Derailleur"],
    Brakes: ["Disc Brake", "Brake Pads", "Rotor"],
    Suspensions: ["Fork", "Rear Shock"],
    Wheels: ["Rim", "Hub", "Spokes", "Tire"],
    Frame: ["Frame"],
  };

  const navigate = useNavigate();

  const [bikes, setBikes] = useState([]);
  const [bike, setBike] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [lifespanKm, setLifespanKm] = useState("");
  const [installedAtDate, setInstalledAtDate] = useState("");

  useEffect(() => {
    const fetchBikes = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:3000/api/bikes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBikes(data.data.bikes);
    };

    fetchBikes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    const componentData = {
      bike,
      name,
      category,
      type,
      lifespanKm: Number(lifespanKm),
      installedAtDate,
    };

    const res = await fetch("http://localhost:3000/api/components", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(componentData),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      navigate("/components");
    }
  };

  return (
    <div>
      <h1>Add a Component</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Bike: </label>
          <select
            value={bike}
            onChange={(e) => setBike(e.target.value)}
            required
          >
            <option value="">Select a bike</option>
            {bikes.map((bike) => (
              <option key={bike._id} value={bike._id}>
                {bike.brand} {bike.model} {bike.wheelSize}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setType("");
            }}
          >
            <option value="" disabled>
              Select category...
            </option>

            {Object.keys(componentsType).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={!category}
          >
            <option value="" disabled>
              Select type...
            </option>

            {componentsType[category]?.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Component name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Lifespan: </label>
          <input
            type="text"
            value={lifespanKm}
            onChange={(e) => setLifespanKm(e.target.value)}
          />
        </div>

        <div>
          <label>Installed Date: </label>
          <input
            type="date"
            value={installedAtDate}
            onChange={(e) => setInstalledAtDate(e.target.value)}
          />
        </div>

        <button type="submit">Add Service</button>
      </form>
    </div>
  );
}

export default AddComponent;
