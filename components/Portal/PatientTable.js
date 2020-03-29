import React from 'react'
import { Link } from 'next/link'

import { useTable, useFilters, useSortBy, usePagination } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headers,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [{ id: 'diagnosed_date', desc: true }],
        pageSize: 20,
      },
    },
    useSortBy,
    usePagination
  )

  return (
    <div className="table-responsive">
      <table {...getTableProps()} className="table">
        <thead>
          <tr>
            {headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <span className="mr-2">{column.render('Header')}</span>
                <i className="d-inline">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FontAwesomeIcon
                        icon="sort-amount-down"
                        className="text-orange"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon="sort-amount-up"
                        className="text-orange"
                      />
                    )
                  ) : (
                    <FontAwesomeIcon icon="sort" className="text-light" />
                  )}
                </i>
              </th>
            ))}
            <th>Details</th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                <td>
                  <Link to={`/patient/${row.values.id}`}>
                    Details
                    <FontAwesomeIcon
                      icon="arrow-alt-circle-right"
                      className="d-inline-block ml-2"
                    />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="row align-items-baseline border-top p-2 justify-content-center">
        <div className="col-12 col-md-4 text-center text-md-left">
          Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '5rem' }}
            className="form-control form-control-sm d-inline"
            min={1}
            max={pageOptions.length}
          />
          <span className="ml-2">of {pageOptions.length}</span>
        </div>

        <div className="col-12 col-md-4 my-3 my-sm-auto">
          <ul className="pagination justify-content-center mt-1">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <FontAwesomeIcon icon="angle-double-left" />
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <FontAwesomeIcon icon="chevron-left" />
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <FontAwesomeIcon icon="chevron-right" />
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <FontAwesomeIcon icon="angle-double-right" />
              </button>
            </li>
          </ul>
        </div>

        <div className="col-12 col-md-4 text-center text-md-right">
          <span className="mr-2">Show</span>
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
            className="form-control form-control-sm d-inline"
            style={{ width: '5rem' }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span className="mx-2">per page</span>
        </div>
      </div>
    </div>
  )
}

function PatientTable({ patients }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        sortType: 'basic',
      },
      {
        Header: 'Diagnosed Date',
        accessor: 'diagnosed_date',
        sortType: 'basic',
      },
      {
        Header: 'Age',
        accessor: 'age',
        sortType: 'basic',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'City',
        accessor: 'detected_city',
      },
      {
        Header: 'State',
        accessor: 'detected_state',
      },
      {
        Header: 'Status',
        accessor: 'current_status',
      },
    ],
    []
  )
  const data = React.useMemo(() => patients, [patients])

  return <Table columns={columns} data={data} />
}

export default PatientTable
