import { useReservationContext } from "../hooks/useReservationContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserEquipmentDetails = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [error, setError] = useState(null);
  const [reservationStatus, setReservationStatus] = useState("");


  const { dispatch } = useReservationContext();
  const { user } = useAuthContext();
  const { equipmentId } = useParams();

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        const response = await fetch(`/api/equipment/${equipmentId}`);
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

  const handleReserveClick = async () => {
    if (!user || !equipment) {
      return;
    }

    const reservation = {
      equipment_id: equipmentId,
      title: equipment.title,
      image: equipment.image,
      date: selectedDate,
      price: equipment.price,
      reservation_status: "Waiting for approval...",
    };

    try {
      const reservationResponse = await fetch(`/api/reservations`, {
        method: "POST",
        body: JSON.stringify(reservation),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await reservationResponse.json();

      if (reservationResponse.ok) {
        setReservationStatus("reserved");

        dispatch({ type: "CREATE_RESERVATION", payload: json });
      }
      if (!reservationResponse.ok) {
        console.error(
          "Error making reservation:",
          reservationResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error making reservation:", error);
    }
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
                Price: <strong>{equipment.price}</strong>
              </p>
            </div>
            {reservationStatus === "reserved" ? (
              <div className="reserved">
                <p>Reserved</p>
              </div>
            ) : (
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

                {equipment.availability ? (
                  <div>
                    <label>Choose date for reservation:</label>
                    <input
                      type="datetime-local"
                      value={selectedDate}
                      min={new Date().toISOString().slice(0, 16)}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <button onClick={handleReserveClick}>Reserve</button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
};
export default UserEquipmentDetails;