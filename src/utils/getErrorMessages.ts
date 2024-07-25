import { FieldError } from "react-hook-form";

export function getErrorMessage(error: FieldError) {
  if (error.type === "required") {
    return "El campo no puede estar en blanco";
  }
  if (error.type === "minLength") {
    return "El campo debe tener al menos 3 caracteres";
  }
  if (error.type === "maxLength") {
    return `El campo supera el maximo de caracteres permitidos`;
  }
}
