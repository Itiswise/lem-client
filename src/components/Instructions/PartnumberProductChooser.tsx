import React, {Component} from "react";
import {reduxForm, InjectedFormProps} from "redux-form";
import {compose} from "redux";
import {connect} from "react-redux";
import * as actions from "../../actions";
import {ProductType, MenuDataType, SetMessageAction} from "../../actions";
import {StoreState} from "../../reducers";
import requireAuth from "../requireAuth";
import AsyncSelect from "react-select/async";

interface IFormProps extends React.ChangeEvent<HTMLInputElement> {
  _id: string;
}

interface IPartnumberProductChooserProps {
  errorMessage: string;
  products: ProductType[];
  productId: string;
  isLoading: boolean;
  menu: MenuDataType;
  productDetails: ProductType;
  getProduct: (productId?: string) => void;
  setMessage: (message: string) => SetMessageAction;
  getProducts: (page?: number, search?: string) => void;
}

class PartnumberProductChooser extends Component<
  InjectedFormProps<IFormProps> & IPartnumberProductChooserProps
> {
  handleChange = (newValue: any) => {
    const {getProduct, setMessage, reset} = this.props;
    const id = newValue.value;
    if (id) {
      setMessage("");
      getProduct(id);
    }
    reset();
  };

  promiseOptions(inputValue: string, callback: any): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        await this.props.getProducts(1, inputValue);
        resolve(this.props.products.map((product) => {
            const {_id, partNumber} = product;
            return {value: _id, label: partNumber};
        }));
      }, 1000);
    });
  }

  render() {
    return (
      <div className="">
        <form className="">
          <fieldset>
            <label className="product-chooser-form__label" htmlFor="_id">
              part number
            </label>
            <AsyncSelect
              defaultOptions
              className="product-chooser-form__select-async"
              placeholder=""
              loadOptions={this.promiseOptions.bind(this)}
              onChange={this.handleChange.bind(this)}
            />
          </fieldset>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  const {
    errorMessage,
    productId,
    productDetails,
    products,
    isLoading,
  } = state.wids;
  return {
    errorMessage,
    productId,
    products,
    isLoading,
    productDetails,
    enableReinitialize: true,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: "partnumberProductChooser"})
)(requireAuth(PartnumberProductChooser));
