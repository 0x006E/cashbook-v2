const Table = ({ dataSource, columns, value, onChange, loadingState }) => {
  if (!loadingState) {
    return (
      <div className="overflow-wrap p-4 rounded-md">
        <table className="transition duration-100 shadow-md mx-auto max-w-4xl w-full rounded-md bg-white divide-y divide-gray-300 border-b-2 border-blue-700 text  text-xs sm:text-sm">
          <thead className="bg-blue-50">
            <tr className="text-blue-600 text-left">
              <th className="font-semibold text-xs sm:text-sm uppercase px-2 py-2 sm:px-6 sm:py-4"></th>
              {columns.map((item) => (
                <th
                  key={item}
                  className="font-semibold text-xs sm:text-sm uppercase px-2 py-2 sm:px-6 sm:py-4"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dataSource.map((item) => (
              <tr key={item.id}>
                <td className="px-2 py-2 sm:px-6 sm:py-4 w-5">
                  <input
                    type="radio"
                    value={item.id}
                    onChange={() => onChange(item.id)}
                    name="id"
                    className="h-3 w-3 sm:w-6 sm:h-6"
                  />
                </td>
                {columns.map((column) => {
                  return (
                    <td key={column} className="px-2 py-2 sm:px-6 sm:py-4">
                      {
                        item[
                          Object.keys(item).find((item) => {
                            return item.includes(column);
                          })
                        ]
                      }
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="flex flex-auto h-2/5 justify-center items-center">
      <div className="border border-blue-300 shadow rounded-md p-4">
        <div className="animate-pulse flex space-x-4 justify-center">
          <div className="rounded-full bg-blue-400 h-12 w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default Table;
