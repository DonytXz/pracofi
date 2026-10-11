import { useLocation } from "react-router-dom";
import RegisterScreen from "../features/accounts/RegisterScreen";

export default function Register() {
  const { search } = useLocation();
  const role = new URLSearchParams(search).get("role") === "CONTADOR" ? "CONTADOR" : "USER";
  return <RegisterScreen initialRole={role} key={role} />;
}
