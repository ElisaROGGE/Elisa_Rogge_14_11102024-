import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./table.css";

interface EmployeeProps {}

const EmployeeList: React.FC<EmployeeProps> = () => {
  const data = useSelector((state) => state?.employees);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredData, setFilteredData] = React.useState(data);
  const [errorMessage, setErrorMessage] = React.useState("No data available")

  useEffect(() => {
    setFilteredData(
      data.filter((employee) =>
        Object.values(employee).some((value) =>
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    );
    if(searchQuery !== "" && filteredData.length === 0){
      setErrorMessage("No matching records found")
    }
    else{
      setErrorMessage("No data available")
    }
  }, [data, searchQuery]);

  const columns = [
    { header: "First Name", accessorKey: "firstName" },
    { header: "Last Name", accessorKey: "lastName" },
    { header: "Date of Birth", accessorKey: "dateOfBirth" },
    { header: "Start Date", accessorKey: "startDate" },
    { header: "Department", accessorKey: "department" },
    { header: "Street", accessorKey: "street" },
    { header: "City", accessorKey: "city" },
    { header: "State", accessorKey: "state" },
    { header: "Zip Code", accessorKey: "zipCode" },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <div className="page-filter">
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <table key={data.length} id="employee-table" className="display">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{cell.getValue()}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="100%">{errorMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="filter-bottom">
        <span className="">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <div>
          <button
            className="filter-bottom-prev-btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"Previous"}
          </button>
          <button
            className="filter-bottom-next-btn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {"Next"}
          </button>
        </div>
      </div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default EmployeeList;
