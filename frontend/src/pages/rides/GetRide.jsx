import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function GetRide() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchRide = async () => {
      const res = await fetch(`http://localhost:3000/api/rides/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setRide(data.data.ride);
    };

    fetchRide();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/rides/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      navigate("/rides");
    }
  };

  if (!ride) return <p>Loading...</p>;

  return (
    <div>
      <h1>Ride details</h1>
      <p>
        Bike: {ride.bike.brand} {ride.bike.model}
      </p>
      <p>Type: {ride.bike.type}</p>
      <p>Distance: {ride.distance} km</p>
      <p>Duration: {ride.duration} min</p>
      <p>Date: {new Date(ride.date).toLocaleDateString()}</p>

      <Link to={`/rides/${ride._id}/edit`}>Edit</Link>
      {" | "}
      <Link onClick={handleDelete}>Delete</Link>
    </div>
  );
}

export default GetRide;
