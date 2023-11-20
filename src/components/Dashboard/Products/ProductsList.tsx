import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { ProductType } from "../../../actions";
import { StoreState } from "../../../reducers";
import { by } from "../../../utils/by";
import ProductItem from "./ProductItem";
import "./ProductsListStyle.scss";
import ReactPaginate from 'react-paginate';
import { itemsPerPage } from "../../../config";

interface IProductsListProps {
  products?: ProductType[];
  filteredProducts?: ProductType[];
  getProducts: (page?: number, search?: string) => void;
  updateProductsList: (filteredProducts: ProductType[]) => void;
  startAddingProduct: () => void;
  allProductsCount?: number;
}
interface IProductsListState {
  page: number;
  searchText?: string;
}

class ProductsList extends Component<IProductsListProps, IProductsListState> {
  constructor(props: IProductsListProps) {
    super(props);
    this.state = { page: 1 };
  }
  componentDidMount() {
    this.getProductsList();
  }

  filterProducts(e?: React.FormEvent<HTMLInputElement>) {
    const searchText = e ? e.currentTarget.value : "";
    this.setState({page: 1, searchText}, () => {
      this.getProductsList();
    });
  }

  handlePageClick(event: any) {
    this.setState({ page: event.nextSelectedPage + 1 }, () => {
      this.getProductsList();
    });
  }

  getProductsList(search?: string) {
    this.props.getProducts(this.state.page, this.state.searchText);
  }

  render() {
    const pageCount = this.props.allProductsCount ? Math.ceil(this.props.allProductsCount / itemsPerPage) : 0;

    return (
      <div className="product-page">
        <div className="product-page__header">
          <div className="products-list__filter">
            <label className="products-list__filter__label">filter</label>
            <input
              className="products-list__filter__input"
              placeholder="search..."
              onChange={(e) => {
                this.filterProducts(e);
              }}
            />
          </div>

          <button
            className="btn btn--accent "
            onClick={this.props.startAddingProduct}
          >
            NEW PRODUCT
          </button>
        </div>
        <div className="products-list__header">
          <span className="products-list__header__item--first">product</span>
        </div>
        <div className="products-list">
          { this.props.products && this.props.products.map((product) => <ProductItem
              key={product._id}
              _id={product._id}
              partNumber={product.partNumber}
          />)}
        </div>
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
  const { products, filteredProducts, allProductsCount} = state.wids;
  return {
    products,
    filteredProducts,
    allProductsCount,
  };
}

export default connect(mapStateToProps, actions)(ProductsList);
