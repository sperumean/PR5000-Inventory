import React, { useEffect, useState } from "react";
import { useReservationContext } from "../hooks/useReservationContext";
import { useAuthContext } from "../hooks/useAuthContext";

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [editingReservationId, setEditingReservationId] = useState(null);

  const { dispatch } = useReservationContext();
  const { user } = useAuthContext();

  const handleEditDate = (id) => {
    setReservationId(id);
    setEditingReservationId(id);
    setShowEditForm(!showEditForm);
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toISOString().substring(0, 10);
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      const response = await fetch("http://47.153.42.179:19133/api/reservations/" + reservationId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_RESERVATION", payload: json });
        setReservations((prevReservations) =>
          prevReservations.filter((prev) => prev._id !== json._id)
        );
      } else {
        console.error("Failed to delete reservation");
      }
    } catch (error) {
      console.error("Error deleting reservation", error);
    }
  };

 // const handleDateChange = (date) => {
 //   setNewDate(date);
 // };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://47.153.42.179:19133/api/reservations/${reservationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ date: newDate }),
      });
      if (response.ok) {
        const updatedReservations = reservations.map((reservation) => {
          if (reservation._id === reservationId) {
            return { ...reservation, date: newDate };
          }
          return reservation;
        });
        setReservations(updatedReservations);
        setShowEditForm(false);
      } else {
        console.error("Failed to update reservation date");
      }
    } catch (error) {
      console.error("Error updating reservation date:", error);
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://47.153.42.179:19133/api/reservations", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setReservations(data);
          dispatch({ type: "SET_RESERVATIONS", payload: data });
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, [dispatch, user]);

  return (
    <div className="content-wrapper">
      <div className="reservations-wrapper">
        <h2 className="listTitle">My reservations:</h2>

        <ul className="reservationList">
          {reservations && reservations.length > 0 ? (
            reservations.map((reservation) => (
              <li key={reservation._id}>
                <div className="details">
                  <img src={reservation.image} alt={reservation.title} />
                  <p>
                    <strong>{reservation.title}</strong>
                  </p>
                  <p>{formatDate(reservation.date)}</p>
                  <p>{reservation.reservation_status}</p>
                  <p>
                    <strong>{reservation.price} </strong>
                  </p>

                  {reservation.reservation_status === "Rented" ||
                  reservation.reservation_status === "Not approved" ? (
                    ""
                  ) : (
                    <div className="details">
                      <button onClick={() => handleEditDate(reservation._id)}>
                        Edit Reservation Date
                      </button>
                      <button
                        className="delete-eq"
                        onClick={() =>
                          handleCancelReservation(
                            reservation._id,
                            reservation.equipmentId
                          )
                        }
                      >
                        Cancel Reservation
                      </button>
                    </div>
                  )}
                </div>

                {reservation._id === editingReservationId && showEditForm && (
                  <div className="editDateForm">
                    <p>Edit reservation date:</p>
                    <input
                      type="datetime-local"
                      value={newDate}
                      min={new Date().toISOString().slice(0, 16)}
                      onChange={(e) => setNewDate(e.target.value)}
                    />
                    <button onClick={() => handleEditSubmit()}>Submit</button>
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

export default UserReservations;
