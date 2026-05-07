import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function GetComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [component, setComponent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchComponent = async () => {
      const res = await fetch(`http://localhost:3000/api/components/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setComponent(data.data.component);
    };

    fetchComponent();
  }, [id]);

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

  if (!component) return <p>Loading...</p>;

  return (
    <div>
      <h1>Component details</h1>
      <p>
        Bike: {component.bike.brand} {component.bike.model}
      </p>
      <p>Component: {component.name}</p>
      <p>Lifespan: {component.lifespanKm} km</p>
      <p>Used: {component.usedKm} km</p>
      <p>Installed: {component.installedAtKm} km</p>
      <p>
        Installed Date:{" "}
        {new Date(component.installedAtDate).toLocaleDateString()}
      </p>

      <Link to={`/components/${component._id}/edit`}>Edit</Link>
      {" | "}
      <Link onClick={handleDelete}>Delete</Link>
    </div>
  );
}

export default GetComponent;
