import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const EquipmentCard = ({ equipment }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClick = () => {
    navigate("/equipment/" + equipment._id);
  };
  return (
    <div onClick={handleClick} className="equipment-card-parent">
      {equipment ? (
        <div className="equipment-card">
          <div className="image-div">
            <img src={equipment.image} alt={equipment.title} />
          </div>
          <div className="details">
            <p>
              <strong>{equipment.title}</strong>
            </p>
            <p>
              Price: <strong>{equipment.price}</strong>
            </p>
          </div>
          <p>
            <strong
              className={equipment.availability ? "available" : "not-available"}
            >
              {equipment.availability ? "Available" : "Not available"}
            </strong>
          </p>
          {user && user.role === "admin" ? (
            <p className="draft">{equipment.draft ? "Draft" : ""}</p>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
};

export default EquipmentCard;
