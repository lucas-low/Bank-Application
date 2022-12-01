//constant types across components and pages

// filter, sort, and search types
export interface RowData { 
    transactionDate: string;
    description: string;
    category: string;
    debit: number | null;
    credit: number | null;
    id: number;
  }
  
// data types for the table
export interface TableSortProps {
    accounts : RowData[];
    loading : boolean;
  }
//table head props
export interface ThProps { 
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
  }