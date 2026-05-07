import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddService() {
  const navigate = useNavigate();

  const [bikes, setBikes] = useState([]);
  const [components, setComponents] = useState([]);

  const [bike, setBike] = useState("");
  const [component, setComponent] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

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

  useEffect(() => {
    const fetchComponents = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:3000/api/components", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setComponents(data.data.components);
    };

    fetchComponents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    const serviceData = {
      bike,
      component,
      description,
      date,
    };

    const res = await fetch("http://localhost:3000/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      navigate("/services");
    }
  };

  return (
    <div>
      <h1>Add a Service</h1>

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
                {bike.brand} {bike.model}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Component: </label>

          <select
            value={component}
            onChange={(e) => setComponent(e.target.value)}
            required
          >
            <option value="">Select a component</option>

            {components.map((component) => (
              <option key={component._id} value={component._id}>
                {component.name} ({component.type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Description: </label>

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Date: </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit">Add Service</button>
      </form>
    </div>
  );
}

export default AddService;
