import { useReactTable, flexRender, getCoreRowModel, ColumnDef, getPaginationRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableHeader, TableRow, TableCell } from '../components/ui/table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createStudent, deleteStudent, editStudent, getStudent } from './api';
import { Button } from '../components/ui/button';
import { Students } from './types';
import { useState, useCallback } from 'react';
import FormField from './FormField';
import SearchBox from './SearchBox';
import { useTheme } from './Theme';
import { DeleteDialogBox } from './DeleteDialogBox';

function TableView() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Students | null>(null);
  const [filteredData, setFilteredData] = useState<Students[]>([]);
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const { theme, toggleTheme } = useTheme();

  const { data: studentsData, isLoading } = useQuery({
    queryFn: getStudent,
    queryKey: ['getStudent'],
  });

  const deleteMutation = useMutation({
    mutationFn: (student: Students) => deleteStudent(student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getStudent'] });
    },
  });

  function handleDelete(student:Students) {
    deleteMutation.mutate(student);
  }

  const { mutate:createMutation, isPending:isCreating } = useMutation({
    mutationFn: (student: Students) => createStudent(student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getStudent'] });
      setIsFormVisible(false);
    },
  });

  const {mutate:editMutation, isPending:isEditing } = useMutation({
    mutationFn: (student: Students) => editStudent(student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getStudent'] });
      setIsFormVisible(false);
    },
  });

  function handleSaveStudent(data: Students) {
    if (selectedStudent) {
      editMutation(data);
    } else {
      createMutation(data);
    }
  }

  function handleEdit(student: Students) {
    setSelectedStudent(student);
    setIsFormVisible(true);
  }

  function handleAdd() {
    setSelectedStudent(null);
    setIsFormVisible(true);
  }

  function handleCloseForm() {
    setIsFormVisible(false);
  }

  const handleSearch = useCallback((filteredData: Students[]) => {
    setFilteredData(filteredData);
  }, []);

  const columns: ColumnDef<Students>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'First Name',
      accessorKey: 'firstName',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Mobile Number',
      accessorKey: 'mobileNumber',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Email Id',
      accessorKey: 'emailId',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: (info: any) => {
        const student = info.row.original;
        return (
          <div className="flex space-x-1">
            <Button className='bg-green-600 hover:bg-green-800' onClick={() => handleEdit(student)}>Edit</Button>
            {<DeleteDialogBox deleteStudent={handleDelete} student={student} />}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredData.length > 0 ? filteredData : studentsData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    autoResetPageIndex: false,
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });
  if (isCreating || isEditing) {
    return <div className='text-xl'>Pending...</div>  
  }
 
    if (isLoading) {
      return <div className="text-xl">Loading...</div>;
    }

  
  return (
    <div
      className={`ml-52 mt-32 border-2 w-[150vh] ${
        theme === "dark"
          ? "border-gray-300 bg-gray-800 text-white"
          : "border-gray-400 bg-white text-black"
      }`}
    >
      <div className="flex flex-row items-center w-full p-4">
        <div className="mr-4 pl-16">
          <SearchBox data={studentsData || []} onSearch={handleSearch} />
        </div>
        <div className="flex space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-800" onClick={handleAdd}>
            ADD STUDENT
          </Button>
          <Button onClick={toggleTheme} className="p-2">
            Toggle Theme
          </Button>
        </div>
        {isFormVisible && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white  rounded shadow-lg">
              <FormField
                saveStudent={handleSaveStudent}
                initialData={selectedStudent}
                cancelStudent={handleCloseForm}
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    className="font-bold text-xl pl-20"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="pl-20">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <Button
          className="bg-violet-600 hover:bg-violet-800"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          className="bg-sky-600 hover:bg-sky-800"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          className="bg-sky-600 hover:bg-sky-800"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
        <Button
          className='bg-violet-600 hover:bg-violet-800"'
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </Button>
      </div>
    </div>
  );
}

export default TableView;
