import { useForm } from "@tanstack/react-form";
import { Button } from "../components/ui/button";
import { Students } from "./types";
import { useTheme } from "./Theme";
import { FieldInfo } from "./FieldInfo";
import { Input } from "../components/ui/input";

interface FormProps {
  saveStudent: (student: Students) => void;
  initialData?: Students | null;
  cancelStudent: ()=>void
}

const FormField = ({ saveStudent, initialData, cancelStudent }: FormProps) => {
  console.log("Initial Data in FormField:", initialData); 
  const { theme } = useTheme();
  const form = useForm({
    defaultValues: initialData || {
      id: '',
      firstName: '',
      mobileNumber: '',
      emailId: '',
    },
    onSubmit: async ({ value }) => {
      console.log("Form Submitted:", value); 
      saveStudent(value);
    },
  });

  return (
    <div
      className={`grid justify-items-center rounded-lg h-[55vh] w-[35vw] p-6 ${
        theme === "dark"
          ? "border-gray-300 bg-gray-800 text-white"
          : "border-gray-600 bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold">
        {initialData ? "Edit Student Data" : "Create Student Data"}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 grid-rows-4 text-xl">
          <div className="w-[30vw] h-[8vh]">
            <form.Field
              name="id"
              children={(field) => (
                <div className="flex flex-col">
                  <div className="flex">
                    <label htmlFor={field.name} className="w-[15vw]">
                      ID:
                    </label>
                    <Input
                      className="text-black text-xl"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  
                </div>
              )}
            />
          </div>
          <div className="w-[30vw] h-[8vh]">
            <form.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "First Name is Required"
                    : value.length < 3
                    ? "First Name must be at least 3 characters"
                    : undefined,
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <div className="flex ">
                    <label htmlFor={field.name} className="w-[15vw]">
                      First Name:
                    </label>
                    <Input
                      className="text-black text-xl"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>
          <div className="w-[30vw] h-[8vh]">
            <form.Field
              name="mobileNumber"
              validators={{
                onChange: ({ value }) => {
                  const stringValue = String(value || "");
                  if (stringValue.length === 0) {
                    return "Number is required";
                  } else if (stringValue.length !== 10) {
                    return "Number should be 10 digits";
                  } else {
                    return undefined;
                  }
                },
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <div className="flex">
                    <label htmlFor={field.name} className="w-[15vw]">
                      Mobile Number:
                    </label>
                    <Input
                      className="text-black text-xl"
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>
          <div className="w-[30vw] h-[8vh]">
            <form.Field
              name="emailId"
              children={(field) => (
                <div className="flex flex-col">
                  <div className="flex">
                    <label htmlFor={field.name} className="w-[15vw]">
                      Email ID:
                    </label>
                    <Input
                      className="text-black text-xl"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={!!initialData}
                    />
                  </div>
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex justify-evenly">
          <Button className="bg-blue-600 hover:bg-blue-800" type="submit">
            Submit
          </Button>
          <Button className="bg-red-600 hover:bg-red-800" type="button" onClick={cancelStudent}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormField;
