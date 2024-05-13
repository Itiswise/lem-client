import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {OrderListType} from "../../../actions";
import { StoreState } from "../../../reducers";
import Loader from "../../Loader";
import SfTable, { IColumn } from "./SfTable";
import "./OrdersListStyle.scss";
import {itemsPerPage} from "../../../config";
import ReactPaginate from "react-paginate";

interface IOrdersListProps {
  orders?: OrderListType[];
  viewOrderDetails: (_id: string) => void;
  getOrders: (page?: number, filtersObject?: Object, orderObject?: Object) => void;
  errorMessage: string;
  isLoading: boolean;
  allOrdersCount: number;
}

interface IOrdersListState {
  page: number;
  filtersObject?: Object;
  orderObject?: Object;
}

const columns: IColumn<any>[] = [
  { name: "orderNumber", label: "order" },
  { name: "partNumber", label: "partnumber" },
  { name: "orderStatus", label: "status" },
  { name: "quantity", label: "quantity" },
  { name: "orderAddedAt", label: "start" },
];

class OrdersList extends Component<IOrdersListProps, IOrdersListState> {
  constructor(props: IOrdersListProps) {
    super(props);
    this.state = { page: 1, filtersObject: {}, orderObject: {} };
  }

  componentDidMount() {
    this.getOrdersList();
  }

  setFilters(filterObject: Object) {
    this.setState({page: 1, filtersObject: filterObject}, () => {
      this.getOrdersList();
    });
  }

  setOrder(order: "asc" | "desc", column: string|number|symbol) {
    console.log(order, column);
    this.setState({page: 1, orderObject: { order, column }}, () => {
      this.getOrdersList();
    });
  }

  handlePageClick(event: any) {
    this.setState({ page: event.nextSelectedPage + 1, ...this.state.filtersObject }, () => {
      this.getOrdersList();
    });
  }

  getOrdersList() {
    this.props.getOrders(this.state.page, this.state.filtersObject, this.state.orderObject);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { isLoading, errorMessage, orders } = this.props;

    if (errorMessage) {
      return <div className="alert">{this.renderAlert()}</div>;
    }

    if (isLoading && !orders) {
      return <Loader />;
    }

    if (!orders) {
        return null;
    }

    const pageCount = this.props.allOrdersCount ? Math.ceil(this.props.allOrdersCount / itemsPerPage) : 0;

    return (
      <div className="orders-list__container">
        <SfTable
          columns={columns}
          rows={orders}
          allCount={this.props.allOrdersCount}
          setFilters={this.setFilters.bind(this)}
          setOrder={this.setOrder.bind(this)}
        />
        { pageCount > 1 && <ReactPaginate
            className="pagination"
            pageCount={pageCount}
            forcePage={this.state.page - 1}
            onClick={(e) => {
              this.handlePageClick(e);
            }}
        />}
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  const { orders, isLoading, errorMessage, allOrdersCount } = state.dashboard;
  return {
    orders,
    isLoading,
    errorMessage,
    allOrdersCount,
  };
}

export default connect(mapStateToProps, actions)(OrdersList);
