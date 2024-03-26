import { useAuthContext } from "../hooks/useAuthContext";
import { useEquipmentContext } from "../hooks/useEquipmentContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: equipmentDispatch } = useEquipmentContext();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    equipmentDispatch({ type: "SET_EQUIPMENT", paylod: null });
  };
  return { logout };
};
