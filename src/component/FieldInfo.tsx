import { FieldApi } from "@tanstack/react-form";
import { useTheme } from "./Theme";

export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  const { theme } = useTheme();
  return (
    <div className={`pl-48 ${theme === "dark"
        ? "border-gray-300 bg-gray-800 text-white"
        : "border-gray-600 bg-white text-red-600"
      }`}>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </div>
  );
}
