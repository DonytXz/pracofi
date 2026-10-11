import { useRef, useState } from "react";
import { getErrorMessage } from "../../shared/errors";

export default function useSubmission() {
  const lock = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const run = async (action) => {
    if (lock.current) return;
    lock.current = true;
    setPending(true);
    setError("");
    try {
      await action();
    } catch (failure) {
      setError(getErrorMessage(failure));
    } finally {
      lock.current = false;
      setPending(false);
    }
  };

  return { pending, error, setError, run };
}
