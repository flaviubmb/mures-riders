import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function EditComponent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [bike, setBike] = useState(null);
  const [component, setComponent] = useState("");
  const [lifespanKm, setLifespanKm] = useState("");
  const [usedKm, setUsedKm] = useState("");
  const [installedAtKm, setInstalledAtKm] = useState("");
  const [installedAtDate, setInstalledAtDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchComponents = async () => {
      const res = await fetch(`http://localhost:3000/api/components/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const component = data.data.component;

      setBike(component.bike);
      setComponent(component.name);
      setLifespanKm(component.lifespanKm);
      setUsedKm(component.usedKm);
      setInstalledAtKm(component.setInstalledAtKm);
      setInstalledAtDate(component.setInstalledAtDate);
    };

    fetchComponents();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    const componentData = {
      bike,
      component,
      lifespanKm: Number(lifespanKm),
      installedAtKm: Number(installedAtKm),
      usedKm: Number(usedKm),
      installedAtDate,
    };

    const res = await fetch(`http://localhost:3000/api/components/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(componentData),
    });

    if (res.ok) {
      navigate("/components");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/components/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      navigate("/components");
    }
  };

  return (
    <div>
      <h1>Edit a Component</h1>

      {bike && (
        <p>
          Bike: {bike.brand} {bike.model}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Component: </label>
          <input
            type="text"
            value={component}
            onChange={(e) => setComponent(e.target.value)}
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
          <label>Used: </label>
          <input
            type="text"
            value={usedKm}
            onChange={(e) => setUsedKm(e.target.value)}
          />
        </div>

        <div>
          <label>Installed: </label>
          <input
            type="text"
            value={installedAtKm}
            onChange={(e) => setInstalledAtKm(e.target.value)}
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

        <button type="submit">Save changes</button>
      </form>

      <Link onClick={handleDelete}>Delete</Link>
    </div>
  );
}

export default EditComponent;
