import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  ProductType,
  RedirectionType,
  UpdateProductsListAction,
  IUpdateManyProdsWithOneRedir,
  SendProductsAction,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import { by } from "../../../utils/by";
import requireAuth from "../../requireAuth";
import "./RedirectionWithProductsStyle.scss";
import ReactPaginate from "react-paginate";
import {itemsPerPage} from "../../../config";

interface IFormProps {
  [key: string]: boolean;
}

interface IRedirectionWithProductsProps {
  errorMessage: string;
  redirectionId: string;
  initialValues: RedirectionType;
  products: ProductType[];
  filteredProducts: ProductType[];
  initRedirection: IFormProps;
  prodsWithThisRedir: ProductType[];
  backToRedirectionsList: () => void;
  startAddingProductsToRedirection: (_id: string) => void;
  updateProductsList: (products: ProductType[]) => UpdateProductsListAction;
  updateManyProdsWithOneRedir: ({
    redirectionId,
    productListWithDots,
  }: IUpdateManyProdsWithOneRedir) => void;
  sendProducts: (productList: ProductType[]) => SendProductsAction;
  getProducts: (page?: number, search?: string) => void;
  allProductsCount?: number;
}

interface IProductsListState {
  page: number;
  searchText?: string;
}

class RedirectionWithProducts extends Component<
  InjectedFormProps<IFormProps> & IRedirectionWithProductsProps, IProductsListState
> {
  constructor(props: InjectedFormProps<IFormProps> & IRedirectionWithProductsProps) {
    super(props);
    this.state = { page: 1 };
  }
  async componentDidMount() {
    const { startAddingProductsToRedirection, redirectionId } = this.props;
    await startAddingProductsToRedirection(redirectionId);
    this.getProductsList();
  }

  handlePageClick(event: any) {
    this.setState({ page: event.nextSelectedPage + 1 }, () => {
      this.getProductsList();
    });
  }

  async getProductsList() {
    await this.props.getProducts(this.state.page, this.state.searchText);
    await this.props.updateProductsList(this.props.products);
  }

  filterProducts(e?: React.FormEvent<HTMLInputElement>) {
    const searchText = e ? e.currentTarget.value : "";
    this.setState({page: 1, searchText}, () => {
      this.getProductsList();
    });
  }

  getFilteredProductsForText(text: string) {
    if (this.props.products) {
      return this.props.products.filter((product) => {
        if (product && product.partNumber) {
          return product.partNumber.toLowerCase().includes(text.toLowerCase());
        } else {
          return false;
        }
      });
    } else {
      return [];
    }
  }

  renderProductsList() {
    const { filteredProducts } = this.props;
    if (filteredProducts) {
      return filteredProducts.sort(by("partNumber")).map((product) => {
        const { partNumber } = product;
        const partNumberWithCommas = partNumber.replace(".", ",");
        return (
          <div className="checkbox" key={partNumberWithCommas}>
            <label className="switch  switch__flex">
              <Field
                type="checkbox"
                name={partNumberWithCommas}
                id={partNumberWithCommas}
                component="input"
                value={partNumberWithCommas}
              />
              <span></span>
              {partNumber}
            </label>
          </div>
        );
      });
    }
  }

  onSubmit = (formProps: IFormProps) => {
    const { redirectionId, updateManyProdsWithOneRedir } = this.props;
    const productListWithCommas = this.keysIntoArray(formProps);

    const productListWithDots = productListWithCommas.map((x) =>
      x.replace(",", ".")
    );
    updateManyProdsWithOneRedir({ redirectionId, productListWithDots });
  };

  handleToggleVisible = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { sendProducts, filteredProducts } = this.props;
    if (e.target.checked) {
      sendProducts(filteredProducts);
    } else {
      sendProducts([]);
    }
  };

  keysIntoArray<T extends object>(obj: T) {
    let arr = [];
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if (obj[key]) {
          arr.push(key);
        }
      }
    }
    return arr;
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { handleSubmit, submitting, initRedirection } = this.props;
    const pageCount = this.props.allProductsCount ? Math.ceil(this.props.allProductsCount / itemsPerPage) : 0;
    return (
      <div className="redir-with-prods-page">
        <h1 className="redir-with-prods-page__title">
          {initRedirection.description}
        </h1>
        <div className="redir-with-prods-page__subheader">
          <label className="switch  switch__flex switch__flex__label">
            <input type="checkbox" onChange={this.handleToggleVisible} />
            <span></span>select all visible
          </label>
          <div className="selectable-products-list__filter">
            <label className="selectable-products-list__filter__label">
              filter
            </label>
            <input
              className="selectable-products-list__filter__input"
              placeholder="search..."
              onChange={(e) => {
                this.filterProducts(e);
              }}
            />
          </div>
        </div>
        <form
          className="selectable-products-form "
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <div className="selectable-products-list">
            {this.renderProductsList()}
          </div>
          <div className="alert">{this.renderAlert()}</div>
          { pageCount > 1 && <ReactPaginate
              className="pagination"
              pageCount={pageCount}
              forcePage={this.state.page - 1}
              onClick={(e) => {
                this.handlePageClick(e);
              }}
          />}
          <div className="order-buttons">
            <div className="order-buttons__row order-buttons__row--wide">
              <button
                className="btn btn--finish btn--accent "
                type="button"
                onClick={() => {
                  this.props.backToRedirectionsList();
                }}
              >
                {"<< back"}
              </button>
              <button
                className="btn btn--accent "
                type="submit"
                disabled={submitting}
              >
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// changes shape of the data to fit nicely into form with multi selects
// changes dots in key names into commas because redux form does not support dots in keys
// (commas will be reverted back into dots later in the logic flow)
const keyValuesIntoKeysWithCommas = <T extends object, U extends keyof T>({
  arr,
  keyToFind,
  valueToSet,
}: {
  arr?: T[];
  keyToFind: U;
  valueToSet: boolean;
}) => {
  let newObj: IFormProps = {};
  if (arr) {
    arr
      .map((element) => element[keyToFind])
      .forEach((keyWithDots) => {
        if (keyWithDots) {
          // @ts-ignore
          const keyWithCommas = keyWithDots.replace(".", ",");

          return (newObj[keyWithCommas] = valueToSet);
        }
      });
  }
  return newObj;
};

function mapStateToProps(state: StoreState) {
  const {
    errorMessage,
    redirectionId,
    initRedirection,
    prodsWithThisRedir,
    filteredProducts,
    products,
    allProductsCount,
  } = state.wids;
  return {
    errorMessage,
    redirectionId,
    products,
    allProductsCount,
    filteredProducts,
    initRedirection,
    prodsWithThisRedir,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: keyValuesIntoKeysWithCommas({
      arr: prodsWithThisRedir,
      keyToFind: "partNumber",
      valueToSet: true,
    }),
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "redirectionWithProducts" })
)(requireAuth(RedirectionWithProducts)) as ElementType;
