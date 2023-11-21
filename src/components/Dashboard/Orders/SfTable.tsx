import React, {useState, useEffect, useRef} from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { StoreState } from "../../../reducers";
import { by } from "../../../utils/by";

export interface IColumn<T> {
  name: keyof T;
  label: string;
}

export type RowType<T> = T[];

type OrderType = "asc" | "desc";

export interface SfTableProps<T> {
  columns: IColumn<T>[];
  rows: RowType<T>;
  viewOrderDetails: (_id: string) => void;
  setFilters: (filterObject: Object) => void;
  setOrder: (order: OrderType, column: string | number | symbol) => void;
  allCount: number;
}

interface ITarget {
  target: {
    name: string;
    value: string;
  };
}

const SfTable = <T extends { _id: string }>(props: SfTableProps<T>) => {
  const { columns, rows, viewOrderDetails } = props;

  const columnNames = columns.map((column) => column.name);

  const [dataTable, setDataTable] = useState<RowType<T>>(rows);
  const [sortingOrder, setSortingOrder] = useState<OrderType>("asc");
  const [sortingColumn, setSortingColumn] = useState<keyof T | "">("");
  const [inputValues, setInputValues] = useState({});
  const isMountingRef = useRef(true);

  const handleChange = ({ target: { name, value } }: ITarget) => {
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const sortTableBy = (name: keyof T) => {
    let order = sortingOrder;

    if (name === sortingColumn) {
      if (order === "asc") {
        order = "desc";
        setSortingOrder("desc");
      } else {
        order = "asc";
        setSortingOrder("asc");
      }
    } else {
      setSortingOrder("asc");
      order = "asc";
      setSortingColumn(name);
    }

    setDataTable(dataTable.sort(by(name, order)));
  };

  const renderArrows = (name: keyof T) => {
    if (sortingColumn === name) {
      if (sortingOrder === "asc") {
        return " ↑";
      } else return " ↓";
    }
    return "";
  };

  const renderInputs = () => {
    return columns.map((column, idx) => {
      const { name } = column;
      return (
        <td key={idx} className="orders-list__filter__wrapper">
          <input
            className="orders-list__filter"
            placeholder="search..."
            name={name.toString()}
            defaultValue=""
            onChange={handleChange}
          />
        </td>
      );
    });
  };

  const renderTableHeader = () => {
    return columns.map((column, idx) => {
      const { name, label } = column;
      return (
        <th
          className="orders-list__label"
          key={idx}
          onClick={() => sortTableBy(name)}
        >
          {label + renderArrows(name)}
        </th>
      );
    });
  };

  const renderTableBody = () => {
    if (props.rows.length > 0) {
      return props.rows.map((row) => {
        const { _id } = row;
        return (
          <tr
            key={_id}
            onClick={() => viewOrderDetails(_id)}
            className="orders-list__row"
          >
            {columnNames.map((columnName, idx) => (
              <td className="orders-list__row__item" key={idx}>
                {row[columnName]}
              </td>
            ))}
          </tr>
        );
      });
    }
  };

  useEffect(() => {
    isMountingRef.current = true;
  }, []);

  useEffect(() => {
    if (Object.keys(inputValues).length) {
      props.setFilters(inputValues);
    }
  }, [inputValues]);

  useEffect(() => {
    if (!isMountingRef.current) {
      props.setOrder(sortingOrder, sortingColumn);
    }

    isMountingRef.current = false;
  }, [sortingOrder, sortingColumn]);

  return (
    <div className="orders-list__page">
      <div className="orders-list__page__header">
        <h1 className="main-page__title">Orders List</h1>
        <h1 className="main-page__title">
          <span className="weight500">count: </span>
          <span className="weight800"> {props.allCount}</span>
        </h1>
      </div>

      <div className="orders-list">
        <table>
          <thead className="orders-list__header">
            <tr>{renderInputs()}</tr>
            <tr>{renderTableHeader()}</tr>
          </thead>
          <tbody className="fixed200 ">{renderTableBody()}</tbody>
        </table>
      </div>
    </div>
  );
};

function mapStateToProps(state: StoreState) {
  const { orders, isLoading, errorMessage } = state.dashboard;
  return {
    orders,
    isLoading,
    errorMessage,
  };
}

export default connect(mapStateToProps, actions)(SfTable);
