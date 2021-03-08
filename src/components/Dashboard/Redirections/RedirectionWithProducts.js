import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { by } from "../../../utils/by";
import requireAuth from "../../requireAuth";
import "./RedirectionWithProductsStyle.scss";

class RedirectionWithProducts extends Component {
  async componentDidMount() {
    const { startAddingProductsToRedirection, redirectionId } = this.props;
    await startAddingProductsToRedirection(redirectionId);
    await this.filterProducts();
  }

  filterProducts(e) {
    const text = e ? e.currentTarget.value : "";
    const filteredProducts = this.getFilteredProductsForText(text);
    this.props.updateProductsList(filteredProducts);
  }

  getFilteredProductsForText(text) {
    return this.props.products.filter((product) =>
      product.partNumber.toLowerCase().includes(text.toLowerCase())
    );
  }

  renderProductsList() {
    const { filteredProducts } = this.props;
    if (filteredProducts) {
      return filteredProducts.sort(by("partNumber")).map((product) => (
        <div className="checkbox" key={product.partNumber}>
          <label className="switch  switch__flex">
            <Field
              type="checkbox"
              name={product.partNumber}
              id={product.partNumber}
              component="input"
              value={product.partNumber}
            />
            <span></span>
            {product.partNumber}
          </label>
        </div>
      ));
    }
  }

  onSubmit = (formProps) => {
    const { redirectionId, updateManyProdsWithOneRedir } = this.props;
    const productList = this.keysIntoArray(formProps);
    updateManyProdsWithOneRedir(redirectionId, productList);
  };

  handleToggleVisible = (e) => {
    const { sendProducts, filteredProducts } = this.props;
    if (e.target.checked) {
      sendProducts(filteredProducts);
    } else {
      sendProducts([]);
    }
  };

  keysIntoArray(obj) {
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
    return (
      <div className="redir-with-prods-page">
        <h1 className="redir-with-prods-page__title">
          {initRedirection.description}
        </h1>
        <div className="redir-with-prods-page__subheader">
          <label className="switch  switch__flex switch__flex__label">
            <input type="checkbox" onClick={this.handleToggleVisible} />
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
          <div className="order-buttons">
            <div className="order-buttons__row order-buttons__row--wide">
              <button
                className="btn btn--finish btn--accent "
                onClick={() => {
                  this.props.backToRedirectionsList();
                }}
              >
                {"<< back"}
              </button>
              <button className="btn btn--accent " disabled={submitting}>
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  return errors;
};

const keyValuesIntoKeys = ({ arr, keyToFind, valueToSet }) => {
  let newObj = {};
  arr
    .map((element) => element[keyToFind])
    .forEach((element) => {
      newObj[element] = valueToSet;
    });
  return newObj;
};

function mapStateToProps(state) {
  const {
    errorMessage,
    redirectionId,
    initRedirection,
    prodsWithThisRedir,
    filteredProducts,
    products,
  } = state.wids;
  return {
    errorMessage,
    redirectionId,
    products,
    filteredProducts,
    initRedirection,
    prodsWithThisRedir,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: keyValuesIntoKeys({
      arr: prodsWithThisRedir,
      keyToFind: "partNumber",
      valueToSet: true,
    }),
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "redirectionWithProducts", validate: validate })
)(requireAuth(RedirectionWithProducts));
