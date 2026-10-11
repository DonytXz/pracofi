import { useEffect, useState } from "react";
import { areas, topics } from "../../services/Bookings";
import { getErrorMessage } from "../../shared/errors";

export default function useBookingCatalogs() {
  const [state, setState] = useState({ loading: true, error: "", topics: [], areas: [] });
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    Promise.all([topics(), areas()]).then(([topicResponse, areaResponse]) => {
      if (!Array.isArray(topicResponse.data) || !Array.isArray(areaResponse.data)) {
        throw new Error("No pudimos cargar los motivos y las áreas disponibles.");
      }
      if (active) setState({
        loading: false, error: "",
        topics: [...new Set(topicResponse.data.map((item) => item.motivos).filter(Boolean))],
        areas: [...new Set(areaResponse.data.map((item) => item.area).filter(Boolean))],
      });
    }).catch((error) => {
      if (active) setState({ loading: false, error: getErrorMessage(error), topics: [], areas: [] });
    });
    return () => { active = false; };
  }, [revision]);
  return { ...state, retry: () => {
    setState((previous) => ({ ...previous, loading: true, error: "" }));
    setRevision((value) => value + 1);
  } };
}
