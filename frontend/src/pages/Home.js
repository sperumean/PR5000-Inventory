import { useEffect } from "react";
import { useEquipmentContext } from "../hooks/useEquipmentContext";
import EquipmentCard from "../components/EquipmentCard";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { equipment, dispatch, setEquipment } = useEquipmentContext();
  const { user } = useAuthContext();
  const todaysDayFormated = new Date().toISOString().substring(0, 10);

  // const updateEquipment = async (equip) => {
  //   try {
  //     const response = await fetch("http://47.153.42.179:19133/api/equipment", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //       body: JSON.stringify({
  //         availability: false,
  //       }),
  //     });

  //     if (response.ok) {
  //       const updatedEquip = await response.json();
  //       setEquipment((prevEquip) =>
  //         prevEquip.map((e) =>
  //           e._id === updatedEquip._id
  //             ? { ...e, availability: updatedEquip?.availability }
  //             : e
  //         )
  //       );

  //       dispatch({ type: "SET_EQUIPMENT", payload: updatedEquip });
  //       console.log("Equipment updated successfully");
  //     } else {
  //       console.error("Failed to update equipment");
  //     }
  //   } catch (error) {
  //     console.error("Error updating equipment:", error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentResponse = await fetch("/api/equipment");
        const equipmentJson = await equipmentResponse.json();

        if (equipmentResponse.ok) {
          dispatch({ type: "SET_EQUIPMENT", payload: equipmentJson });

          // Tik jei sėkmingai gauta įranga, tada vykdyti kitus žingsnius
          // const reservationsResponse = await fetch("/api/reservations", {
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: `Bearer ${user.token}`,
          //   },
          // });
          // const reservationsData = await reservationsResponse.json();

          // if (reservationsResponse.ok) {
          //   if (!equipment || equipment.length === 0) {
          //     console.error("Equipment is null or empty.");
          //     return;
          //   }

          //   if (typeof setEquipment !== "function") {
          //     console.error("setEquipment is not a function.");
          //     return;
          //   }
          //   const reservationsToUpdate = reservationsData.filter(
          //     (reservation) => {
          //       const condition1 =
          //         todaysDayFormated === reservation.date.substring(0, 10);
          //       const condition2 = reservation.reservation_status === "Rented";
          //       const condition3 = equipment.some(
          //         (equip) => equip._id === reservation.equipment_id
          //       );

          //       return condition1 && condition2 && condition3;
          //     }
          //   );

          //   if (reservationsToUpdate.length > 0) {
          //     const updatedEquipments = equipment.map((equip) => {
          //       const reservationToUpdate = reservationsToUpdate.find(
          //         (reservation) => reservation.equipment_id === equip._id
          //       );
          //       if (reservationToUpdate) {
          //         updateEquipment(equip);
          //       }
          //       return equip;
          //     });

          // dispatch({ type: "SET_EQUIPMENT", payload: updatedEquipments });
          //   }
          // }

          // dispatch({ type: "SET_RESERVATIONS", payload: reservationsData });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, setEquipment, user?.token, todaysDayFormated]);

  return (
    <div className="home content-wrapper">
      <h1>PR5000 Scanners</h1>
      <div className="equipment">
        {equipment && equipment.length > 0 ? (
          equipment.map((equip) =>
            user && user.role === "user" && equip.draft ? null : (
              <EquipmentCard key={equip._id} equipment={equip} />
            )
          )
        ) : (
          <p>No equipment found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
