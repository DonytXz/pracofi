import { Redirect, useParams } from "react-router-dom";
import BookingEditor from "../features/bookings/BookingEditor";
export default function AcountManBookingDetail() {
  const { id } = useParams();
  return id ? <BookingEditor readOnly /> : <Redirect to="/my-bookings-acountMan" />;
}
