import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import { Table, Pagination, TextInput, Container, Button } from "@mantine/core";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import { TableSortProps, RowData } from '../types';
import { RootState } from '../../app/store';
import TableHeader from './TableHeader';

const PAGE_SIZE = 10;

const AccountsTable = ({ accounts, loading }) => {
    const accountsData = useSelector((state: RootState) => state.bankAccountsList.accounts)
    const [search, setSearch] = useState("");
    const [sortedData, setSortedData] = useState<RowData[]>(accountsData);
    const [sortBy, setSortBy] = useState<keyof RowData>("id");
    const [page, setPage] = useState(1);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [dateRange, setDateRange] = useState<DateRangePickerValue>([
        null, null // if not null, it will be used as initial value 
        // new Date(2016, 11, 1), 
        // new Date(2016, 1, 1),
    ]);
    const sortData = (title: keyof RowData) => {
        const reversed = sortBy === title ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(title);

        setSortedData(
            sortDataByTitle(accounts, {
                sortBy: title,
                reversed,
                search,
                dateRange: dateRange,
            })
        );
    };
    // date range picker function
    const filterDate = (dateRange: DateRangePickerValue, date: string) => {
        const dateObj = new Date(date); // convert string to date object
        dateObj.setHours(0, 0, 0, 0); // set time to 00:00:00:00

        // if filter date range has value, return true
        if (dateRange[0] === null || dateRange[1] === null) return true;
        if (dateObj >= dateRange[0] && dateObj <= dateRange[1]) return true;

        return false;
    };
    // filter data based on search input payload from mantine table head column
    const sortDataByTitle = (
        data: RowData[],
        payload: {
            sortBy: keyof RowData; reversed: boolean; search: string; dateRange: DateRangePickerValue;
        }
    ): RowData[] => {
        const { sortBy, reversed, dateRange } = payload; // destructuring payload object 
        const query = payload.search.toString().toLowerCase(); // search query input

        if (!sortBy) {
            const filterData = data.filter((row) => {
                if (row.description.toLowerCase().includes(query)) {//search by description
                    return row;
                }
            });

            return filterData;
        } else {
            let sortedRows: RowData[] = [];
            if (reversed) {
                sortedRows = [...data].sort((a, b) =>
                    a[sortBy]! < b[sortBy]! ? 1 : -1
                );
            } else {
                sortedRows = [...data].sort((a, b) =>
                    a[sortBy]! > b[sortBy]! ? 1 : -1
                );
            }

            const filterData = sortedRows.filter((row) => {
                if (
                    row.description.toLowerCase().includes(query) &&
                    filterDate(dateRange, row.transactionDate)
                ) {
                    return row;
                }
            });
            return filterData;
        }
    };
    // pagination mantine props pass to table component
    const displayRows = (page: number, data: RowData[]) => {
        const dataRow = data.slice(
            (page - 1) * PAGE_SIZE,
            page * PAGE_SIZE
        );
        // table rows per row data iterated from slicedData array 
        const rows = dataRow.map((row) => (
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.description}</td>
                <td>{row.category}</td>
                <td>{row.debit}</td>
                <td>{row.credit}</td>
                <td>{row.transactionDate}</td>
                <td>
                    {/* <Link href={`/accountDetails/${row.id}`}>
                        <Button id="more-details">
                            more
                        </Button>
                    </Link> */}
                </td>
            </tr>
        ));
        return rows;
    };
    // search input function with slice 
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setTimeout(() => {
            setSortedData(
                sortDataByTitle(accounts, {
                    sortBy,
                    reversed: reverseSortDirection,
                    search: value,
                    dateRange: dateRange,
                })
            );
        }, 400)
        setPage(1)
    }

    // handle date range picker change
    const handleDateChange = (e: DateRangePickerValue) => {
        const value = e;
        setDateRange(value);
        setSortedData(
            sortDataByTitle(accounts, {
                sortBy,
                reversed: reverseSortDirection,
                search: search,
                dateRange: value,
            })
        );
    };

    return (
        <>
            <h3>Search by Accounts Description</h3>
            <TextInput
                placeholder="Search by description"
                mb="md"
                value={search}
                onChange={handleSearchChange}
            />

            <div className="date-search-container">
                <h2 className="">Filter by Date Range</h2>

                <DateRangePicker
                    placeholder="Select date range"
                    value={dateRange}
                    onChange={handleDateChange}
                    icon={
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    }
                />
            </div>
            <Table
                horizontalSpacing="sm" verticalSpacing="xs" striped highlightOnHover withBorder withColumnBorders>
                <thead>
                    <tr>
                        <TableHeader
                            reversed={reverseSortDirection}
                            sorted={sortBy === "id"}
                            onSort={() => sortData("id")}
                        >
                            Id
                        </TableHeader>
                        <TableHeader
                            reversed={reverseSortDirection}
                            sorted={sortBy === "description"}
                            onSort={() => sortData("description")}
                        >
                            Description
                        </TableHeader>
                        <TableHeader
                            reversed={reverseSortDirection}
                            sorted={sortBy === "category"}
                            onSort={() => sortData("category")}
                        >Category
                        </TableHeader>
                        <TableHeader
                            reversed={reverseSortDirection}
                            sorted={sortBy === "debit"}
                            onSort={() => sortData("debit")}
                        >Debit
                        </TableHeader>
                        <TableHeader
                            reversed={reverseSortDirection}
                            sorted={sortBy === "credit"}
                            onSort={() => sortData("credit")}
                        >Credit
                        </TableHeader>
                        <TableHeader
                            reversed={reverseSortDirection}
                            sorted={sortBy === "transactionDate"}
                            onSort={() => sortData("transactionDate")}
                        >Transaction Date
                        </TableHeader>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {displayRows(page, sortedData)}
                </tbody>
            </Table>
            <Container fluid mt="xs">
                <Pagination
                    grow
                    total={Math.ceil(sortedData.length / PAGE_SIZE)}
                    //std pagination math method
                    onChange={setPage}
                    color="indigo"
                    withEdges
                />
            </Container>
        </>
    );
}

export default AccountsTable;