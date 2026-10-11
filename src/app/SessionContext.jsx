import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { clearSession, readSession, SESSION_EVENT, SESSION_KEYS } from "../shared/session";
const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [user, setUser] = useState(readSession);
  const [sessionNotice, setSessionNotice] = useState(null);
  const refreshSession = useCallback(() => {
    const next = readSession();
    setUser(next);
    if (next) setSessionNotice(null);
    return next;
  }, []);
  const signOut = useCallback(() => { clearSession(); setUser(null); setSessionNotice(null); }, []);
  useEffect(() => {
    const onStorage = (event) => { if (!event.key || SESSION_KEYS.includes(event.key)) refreshSession(); };
    const onSession = (event) => { setSessionNotice(event.detail?.reason ?? null); refreshSession(); };
    window.addEventListener(SESSION_EVENT, onSession);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(SESSION_EVENT, onSession);
      window.removeEventListener("storage", onStorage);
    };
  }, [refreshSession]);
  const value = useMemo(() => ({ user, refreshSession, signOut, sessionNotice }), [user, refreshSession, signOut, sessionNotice]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession requires SessionProvider");
  return context;
}
