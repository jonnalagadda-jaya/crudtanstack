import { Button } from "../components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader,AlertDialogTitle, AlertDialogFooter, AlertDialogTrigger } from "../components/ui/alert-dialog";
import { Students } from "./types";

interface DeleteDialogProps {
  deleteStudent: (student: Students) => void;
  student: Students;
}
export function DeleteDialogBox({deleteStudent,student}:DeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-800">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to Delete?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-blue-600 hover:bg-blue-800">No</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-800" onClick={() => {
            deleteStudent(student)
          }}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
