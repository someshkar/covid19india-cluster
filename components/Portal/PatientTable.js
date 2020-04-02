import React, { useState } from 'react'
import Link from 'next/link'

import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import matchSorter from 'match-sorter'
import {
  faChevronRight,
  faAngleDoubleRight,
  faChevronLeft,
  faAngleDoubleLeft,
  faSort,
  faSortAmountDown,
  faSortAmountDownAlt,
  faSearch,
  faCaretRight,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons'
// import ExtraDetails from './extradetails'

// Define a default UI for filtering
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  search,
}) => {
  const count = preGlobalFilteredRows.length
  console.log('Search:', search)
  React.useEffect(() => {
    setGlobalFilter(search ? search : undefined)
  }, [setGlobalFilter])
  return (
    <span>
      <FontAwesomeIcon
        icon={faSearch}
        className="text-orange"
        style={{ marginRight: '10px' }}
      />
      Search:{' '}
      <input
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

// Define a default UI for filtering
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

const fuzzyTextFilterFn = (rows, id, filterValue) => {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

const Table = ({ columns, data, search }) => {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )
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
    preGlobalFilteredRows,
    setGlobalFilter,
    visibleColumns,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [{ id: 'reportedOn', desc: true }],
        pageSize: 10,
      },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const [openCard, setOpenCard] = useState(null)

  function toggleCard(id) {
    if (openCard === id) {
      setOpenCard(null)
      return
    }
    setOpenCard(id)
  }

  return (
    <div className="table-responsive">
      <table
        {...getTableProps()}
        className="table"
        style={{ fontFamily: 'Lato, sans-serif', color: '#585858' }}
      >
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
                search={search}
              />
            </th>
          </tr>
          <tr>
            <th></th>
            {headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <span className="mr-2">{column.render('Header')}</span>
                <i className="d-inline">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDown}
                        className="text-orange"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSortAmountDownAlt}
                        className="text-orange"
                      />
                    )
                  ) : (
                    <FontAwesomeIcon icon={faSort} className="text-gray" />
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
              <React.Fragment>
                <tr {...row.getRowProps()}>
                  <td
                    className="expand"
                    onClick={() => toggleCard(row.values.patientnumber)}
                  ></td>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                  <td>
                    <Link
                      href={`/patient/[id]`}
                      as={`/patient/${row.original.patientId}`}
                    >
                      <a>Details</a>
                    </Link>
                  </td>
                </tr>
                {openCard === row.values.patientnumber ? (
                  <tr className="detail-row">
                    <td colSpan={9}>
                      {/* <Extra
                        patient={data.find(
                          p => p.patientnumber == row.values.patientnumber
                        )}
                      /> */}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>

      <div className="row align-items-baseline border-top p-2 justify-content-center">
        <div className="col-12 col-md-4 text-center text-md-left">
          Go to page
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '4rem' }}
            className="form-control form-control-sm d-inline ml-2"
            min={1}
            max={pageOptions.length}
          />
          <span className="ml-2">of {pageOptions.length}</span>
        </div>

        <div className="col-12 col-md-4 my-3 my-sm-auto">
          <ul className="pagination justify-content-center mt-0 p-0">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <FontAwesomeIcon icon={faAngleDoubleRight} />
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

function PatientTable({ patients, search }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'patientId',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Age',
        accessor: 'ageEstimate',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Home Address',
        accessor: 'address',
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
      },
      {
        Header: 'Quarantine Status',
        accessor: 'quarantine',
      },

      {
        Header: 'Hospital?',
        accessor: 'hospital',
      },
      {
        Header: 'Facility?',
        accessor: 'facility',
      },
      {
        Header: 'Health Status',
        accessor: 'health',
      },
      {
        Header: 'Reported on',
        accessor: 'reportedOn',
      },
    ],
    []
  )
  const data = React.useMemo(() => patients, [patients])

  return <Table columns={columns} data={data} search={search} />
}

export default PatientTable

// <td
//                     className="expand"
//                     onClick={() => toggleCard(row.values.patientnumber)}
//                   >
//                     {openCard === row.values.patientnumber ? (
//                       <FontAwesomeIcon icon={faCaretDown} />
//                     ) : (
//                       <FontAwesomeIcon icon={faCaretRight} />
//                     )}
//                   </td>
