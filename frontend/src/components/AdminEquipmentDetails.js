import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEquipmentDetails = () => {
  const { equipmentId } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        const response = await fetch(`http://47.153.42.179:19133/api/equipment/${equipmentId}`);
        const data = await response.json();
        if (response.ok) {
          setEquipment(data);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching equipment details:", error);
        setError("Error fetching equipment details:", error);
      }
    };
    fetchEquipmentDetails();
  }, [equipmentId]);

  const handleDeleteEquipmentClick = async (id) => {
    try {
      const response = await fetch(`http://47.153.42.179:19133/api/equipment/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setError(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Error trying to delete:", error);
      setError("Error deleting the equipment:", error);
    }
  };

  const handleClick = (id) => {
    navigate(`/admin/equipment/edit/${id}`);
  };

  return (
    <div className="equipment-details">
      {equipment ? (
        <>
          <div className="img-title flex-container">
            <div className="picture">
              <img src={equipment.image} alt={equipment.title} />
            </div>
            <h3>{equipment.title}</h3>
          </div>

          <div className="bottom-parent flex-container">
            <div className="details">
              <p>{equipment.description}</p>
              <p>
                Price: <strong>{equipment.price} </strong>
              </p>
            </div>

            <div className="reservation-div">
              <p
                className={
                  equipment.availability ? "available" : "not-available"
                }
              >
                <strong>
                  {equipment.availability ? "Available" : "Not available"}
                </strong>
              </p>

              <button onClick={() => handleClick(equipment._id)}>Edit</button>
              <button onClick={() => handleDeleteEquipmentClick(equipment._id)}>
                Delete
              </button>
            </div>
          </div>

          {equipment.draft ? (
            <p className="draft">
              <strong>{equipment.draft ? "Draft" : "Not draft"}</strong>
            </p>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
};

export default AdminEquipmentDetails;
