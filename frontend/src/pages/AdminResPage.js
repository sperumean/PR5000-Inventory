import React, { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useReservationContext } from "../hooks/useReservationContext"; // Use the correct context


const AdminResPage = () => {
  const [equipmentAvailabilityUpdated, setEquipmentAvailabilityUpdated] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [reservationUpdated, setReservationUpdated] = useState(false);

  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useReservationContext(); // Use the correct context

  const fetchReservations = useCallback(async () => {
    try {
      const response = await fetch("/api/reservations", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      console.log(data); // Add this line to debug

      if (response.ok) {
        setReservations(data);
        setError(null); // Reset error state if fetch is successful
      } else {
        throw new Error(data.message || "Failed to fetch reservations");
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setError("Failed to fetch reservations");
    }
  }, [user.token]); // Depend on user.token since it's used in the fetch

  useEffect(() => {
    if (reservationUpdated) {
      fetchReservations();
      setReservationUpdated(false);
    }
  }, [reservationUpdated, fetchReservations]);


  //
  useEffect(() => {
  fetchReservations();
  }, [fetchReservations]);

  useEffect(() => {
    if (equipmentAvailabilityUpdated) {
      fetchReservations(); // Refetch reservations if availability is updated
      setEquipmentAvailabilityUpdated(false);
    }
  }, [equipmentAvailabilityUpdated, fetchReservations]); // Also depend on fetchReservations here





  const handleUpdateResStatus = async (reservationId) => {
    try {
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          reservation_status: "Rented",
        }),
      });

      if (response.ok) {
        const updatedReservation = await response.json();

        console.log("Before update:", reservations);

        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation._id === updatedReservation._id
             
              ? { ...reservation, reservation_status: updatedReservation.reservation_status }
              : reservation
          )
        );
        console.log("After update:", reservations);


        dispatch({ type: "SET_RESERVATIONS", payload: updatedReservation });
        fetchReservations();
      } else {
        console.error("Failed to update reservation status");
        setError("Failed to update reservation status");
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
      setError("Error updating reservation status");
    }
  };

const handleApproveRes = async (reservationId) => {
  try {
    const response = await fetch(`/api/reservations/${reservationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ reservation_status: "Approved" }),
    });

    if (response.ok) {
      const updatedReservation = await response.json();
      dispatch({ type: "SET_RESERVATIONS", payload: updatedReservation });
      setReservationUpdated(true);

      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === updatedReservation._id
            ? {
                ...reservation,
                reservation_status: updatedReservation.reservation_status,
              }
            : reservation
        )
      );
    } else {
      console.error("Failed to update reservation status");
      setError("Failed to update reservation status");
    }
  } catch (error) {
    console.error("Error updating reservation status:", error);
    setError("Failed to update reservation status");
  }
};

const handleNotApproveRes = async (reservationId) => {
  try {
    const response = await fetch(`/api/reservations/${reservationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ reservation_status: "Not approved" }),
    });

    if (response.ok) {
      const updatedReservation = await response.json();
      dispatch({ type: "SET_RESERVATIONS", payload: updatedReservation });
      setReservationUpdated(true);

      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === updatedReservation._id
            ? {
                ...reservation,
                reservation_status: updatedReservation.reservation_status,
              }
            : reservation
        )
      );
    } else {
      console.error("Failed to update reservation status");
      setError("Failed to update reservation status");
    }
  } catch (error) {
    console.error("Error updating reservation status:", error);
    setError("Failed to update reservation status");
  }
};

  const formatDate = (isoDate) => {
    return new Date(isoDate).toISOString().substring(0, 10);
  };

  return (
    <div className="content-wrapper">
      <div className="reservations-wrapper">
        <h2 className="listTitle">All reservations:</h2>

        {error && <p className="error">{error}</p>}

        <ul className="reservationList admin">
          {reservations && reservations.length > 0 ? (
            reservations.map((reservation) => (
              <li key={reservation._id}>
                <div className="details">
                  <img src={reservation.image} alt={reservation.title} />
                  <p>
                    <strong>{reservation.user_name}</strong>
                  </p>
                  <p>{reservation.title}</p>
                  <p>{formatDate(reservation.date)}</p>
                  <p>
                    <strong>{reservation.reservation_status}</strong>
                  </p>
                  <p>{reservation.price} eur</p>
                </div>

{reservation.reservation_status === "Waiting for approval..." && (
  <div className="buttons ">
    <button onClick={() => handleApproveRes(reservation._id)}>
      Approved
    </button>
    <button
      onClick={() => handleNotApproveRes(reservation._id)}
    >
      Not Approved
    </button>
  </div>
)}

{reservation.reservation_status === "Approved" && (
  <div className="buttons">
    <button
      onClick={() => handleUpdateResStatus(reservation._id)}
    >
      Update status to "Rented"
    </button>{" "}
  </div>
)}
              </li>
            ))
          ) : (
            <p>No reservations yet</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminResPage;
