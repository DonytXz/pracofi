export function getErrorMessage(error) {
  if (error?.userMessage) return error.userMessage;
  const status = error?.response?.status;
  if (status === 401) return "Tu sesión ha vencido. Inicia sesión de nuevo.";
  if (status === 403) return "No tienes permiso para realizar esta acción.";
  if (status === 404) return "No encontramos el registro solicitado.";
  if (status === 409) return "No se pudo guardar porque los datos cambiaron o ya existen. Revisa la información e inténtalo de nuevo.";
  if (status === 400 || status === 422) return "Revisa los datos del formulario. El servicio no pudo aceptar la solicitud.";
  if (error?.code === "ECONNABORTED" || error?.code === "ETIMEDOUT") return "El servicio tardó demasiado en responder. Antes de repetir un envío, comprueba si se guardó.";
  if (error?.isAxiosError && !error.response) return "No pudimos conectar con el servicio. Revisa tu conexión e inténtalo de nuevo.";
  return "No pudimos completar la acción. Inténtalo de nuevo.";
}
