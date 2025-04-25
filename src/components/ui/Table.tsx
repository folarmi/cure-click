// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// const Table = ({
//   data,
//   columns,
//   isLoading,
//   rowCount,
//   pagination,
//   setPagination,
// }: any) => {
//   // Initialize table instance with useReactTable
//   const table = useReactTable({
//     data: data || [], // Provide empty array if data is not loaded yet
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     onPaginationChange: setPagination,
//     manualPagination: true,
//     rowCount,
//     state: {
//       pagination,
//     },
//   });

//   return (
//     // <section>
//     //   {isLoading ? (
//     //     <div className="text-center py-4">Loading data...</div>
//     //   ) : table ? (
//     //     <>
//     //       <table className="w-full">
//     //         <thead>
//     //           {table.getHeaderGroups().map((headerGroup) => (
//     //             <tr key={headerGroup.id}>
//     //               {headerGroup.headers.map((header) => (
//     //                 <th
//     //                   key={header.id}
//     //                   className="text-left text-neutral_11 font-medium text-sm pr-10 pl-2 whitespace-nowrap bg-neutral_alpha_2 py-3 border border-gray3"
//     //                 >
//     //                   {header.isPlaceholder
//     //                     ? null
//     //                     : flexRender(
//     //                         header.column.columnDef.header,
//     //                         header.getContext()
//     //                       )}
//     //                 </th>
//     //               ))}
//     //             </tr>
//     //           ))}
//     //         </thead>
//     //         <tbody>
//     //           {table.getRowModel().rows.map((row) => (
//     //             <tr key={row.id} className="">
//     //               {row.getVisibleCells().map((cell) => (
//     //                 <td key={cell.id} className="px-2 whitespace-nowrap py-3">
//     //                   {flexRender(
//     //                     cell.column.columnDef.cell,
//     //                     cell.getContext()
//     //                   )}
//     //                 </td>
//     //               ))}
//     //             </tr>
//     //           ))}
//     //         </tbody>
//     //       </table>
//     //       {/* // Pagination */}
//     //       {data && (
//     //         <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-md shadow-sm">
//     //           {/* Pagination Buttons */}

//     //           {/* <button
//     //             className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//     //             onClick={() => table.firstPage()}
//     //             disabled={!table.getCanPreviousPage()}
//     //             aria-label="First Page"
//     //           >
//     //             {"<<"}
//     //           </button>
//     //           <button
//     //             className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//     //             onClick={() => table.previousPage()}
//     //             disabled={!table.getCanPreviousPage()}
//     //             aria-label="Previous Page"
//     //           >
//     //             {"<"}
//     //           </button>
//     //           <button
//     //             className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//     //             onClick={() => table.nextPage()}
//     //             disabled={!table.getCanNextPage()}
//     //             aria-label="Next Page"
//     //           >
//     //             {">"}
//     //           </button>
//     //           <button
//     //             className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//     //             onClick={() => table.lastPage()}
//     //             disabled={!table.getCanNextPage()}
//     //             aria-label="Last Page"
//     //           >
//     //             {">>"}
//     //           </button> */}

//     //           {/* Page Number Display */}
//     //           {/* <span className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
//     //             <div>Page</div>
//     //             <strong className="text-gray-900">
//     //               {table.getState().pagination.pageIndex + 1} of{" "}
//     //               {table.getPageCount().toLocaleString()}
//     //             </strong>
//     //           </span> */}
//     //         </div>
//     //       )}
//     //     </>
//     //   ) : (
//     //     <div className="text-center py-4">No data available</div>
//     //   )}
//     // </section>

//     <section>
//       {isLoading ? (
//         <div className="text-center py-4">Loading data...</div>
//       ) : table ? (
//         <>
//           {/* Add a scrollable wrapper for the table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <tr key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <th
//                         key={header.id}
//                         className="text-left text-neutral_11 font-medium text-sm pr-10 pl-2 whitespace-nowrap bg-neutral_alpha_2 py-3 border border-gray3"
//                       >
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody>
//                 {table.getRowModel().rows.map((row) => (
//                   <tr key={row.id}>
//                     {row.getVisibleCells().map((cell) => (
//                       <td key={cell.id} className="px-2 whitespace-nowrap py-3">
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Section */}
//           {data && (
//             <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-md shadow-sm">
//               {/* Add your pagination buttons and page info here */}
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="text-center py-4">No data available</div>
//       )}
//     </section>
//   );
// };

// export default Table;

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface TableProps {
  data: any[];
  columns: any[];
  isLoading: boolean;
  rowCount?: number;
  pagination?: any;
  setPagination?: (pagination: any) => void;
  emptyState?: React.ReactNode; // Add emptyState prop
}

const Table = ({
  data,
  columns,
  isLoading,
  rowCount,
  pagination,
  setPagination,
  emptyState, // Destructure emptyState prop
}: TableProps) => {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount,
    state: {
      pagination,
    },
  });

  // Default empty state component
  const defaultEmptyState = (
    <div className="text-center py-8 text-neutral_11">No data available</div>
  );

  return (
    <section>
      {isLoading ? (
        <div className="text-center py-4">Loading data...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left text-neutral_11 font-medium text-sm pr-10 pl-2 whitespace-nowrap bg-neutral_alpha_2 py-3 border border-gray3"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
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
                        <td
                          key={cell.id}
                          className="px-2 whitespace-nowrap py-3"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  // Empty state row that spans all columns
                  <tr>
                    <td colSpan={columns.length} className="py-8">
                      {emptyState || defaultEmptyState}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Only show pagination if there's data */}
          {data && data.length > 0 && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-md shadow-sm">
              {/* Pagination controls would go here */}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Table;
