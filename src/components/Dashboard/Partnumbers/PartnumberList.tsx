import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  PartnumberType,
  PartnumberConfigType,
  ComputationsBase,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import Loader from "../../Loader";
import PartnumberItem from "./PartnumberItem";
import "./PartnumberListStyle.scss";
import ReactPaginate from 'react-paginate';
import { itemsPerPage } from "../../../config";

interface IPartnumbersListProps {
  partnumbers?: PartnumberType[];
  partnumberConfig: PartnumberConfigType;
  filteredPartnumbers?: PartnumberType[];
  getPartnumbers: (page?: number, search?: string) => void;
  getPartnumberConfig: () => void;
  configurePartnumbers: () => void;
  updatePartnumbersList: (filteredPartnumbers: PartnumberType[]) => void;
  errorMessage: string;
  isLoading: boolean;
  allPartnumbersCount?: number;
  startAddingPartnumber: () => void;
}

interface IPartnumbersListState {
  page: number;
  searchText?: string;
}

class PartnumbersList2 extends Component<IPartnumbersListProps, IPartnumbersListState> {
  constructor(props: IPartnumbersListProps) {
    super(props);
    this.state = { page: 1 };
  }

  async componentDidMount() {
    await this.props.getPartnumberConfig();
    await this.props.getPartnumbers(1);
    await this.filterPartnumbers();

    window.addEventListener("partnumberDeleted", () => {
      this.getPartnumbersList();
    });
  }

  filterPartnumbers(e?: React.FormEvent<HTMLInputElement>) {
    const searchText = e ? e.currentTarget.value : "";
    this.setState({page: 1, searchText}, () => {
      this.getPartnumbersList();
    });
  }

  handlePageClick(event: any) {
    this.setState({ page: event.nextSelectedPage + 1 }, () => {
      this.getPartnumbersList();
    });
  }

  getPartnumbersList() {
    this.props.getPartnumbers(this.state.page, this.state.searchText);
  }

  fileName() {
    const d = new Date();
    const timestamp =
      d.toISOString().substring(0, 10).split("-").join("") +
      d.toLocaleTimeString().split(":").join("");
    return `tactTimes_${timestamp}.csv`;
  }

  csvMaker(data: any[] | undefined, columns?: string[]) {
    if (!data) return "";

    let csvRows = [];
    const headers = columns || Object.keys(data[0]);
    csvRows.push(headers.join(","));

    const values = data.map((row) => headers.map((col) => row[col]));
    csvRows.push(values.join("\n"));

    return csvRows.join("\n");
  }

  downloadCsv(csvData: string) {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", this.fileName());
    a.click();
  }

  getCsv(data: any[] | undefined, columns?: string[]) {
    this.downloadCsv(this.csvMaker(data, columns));
  }

  renderConditionalHeaders() {
    const { partnumberConfig } = this.props;
    const { computationsBase } = partnumberConfig;
    if (computationsBase === ComputationsBase.tactTime) {
      return (
        <>
          <span className="partnumber-list__header__item">given tt</span>
          <span className="partnumber-list__header__item">suggested tt</span>
          <span className="partnumber-list__header__item">computed pace</span>
        </>
      );
    }

    if (computationsBase === ComputationsBase.hourlyRate) {
      return (
        <>
          <span className="partnumber-list__header__item">given pace</span>
          <span className="partnumber-list__header__item">suggested pace</span>
          <span className="partnumber-list__header__item">computed tt</span>
        </>
      );
    }
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const pageCount = this.props.allPartnumbersCount ? Math.ceil(this.props.allPartnumbersCount / itemsPerPage) : 0;
    const { isLoading, errorMessage, startAddingPartnumber } = this.props;
    if (errorMessage) {
      return <div className="alert">{this.renderAlert()}</div>;
    }
    if (isLoading && !this.props.partnumbers) {
      return <Loader />;
    }
    return (
      <div className="partnumber-page">
        <div className="partnumber-page__header">
          <div className="partnumber-list__filter">
            <label className="partnumber-list__filter__label">filter</label>
            <input
              className="partnumber-list__filter__input"
              placeholder="search..."
              value={this.state.searchText}
              onChange={(e) => {
                this.filterPartnumbers(e);
              }}
            />
          </div>
          <div>
            <span>Count:</span>
            <span className="partnumber-page__header__info">
              {this.props.allPartnumbersCount}
            </span>
          </div>
          <button
            className="btn btn--accent "
            onClick={() => {
              this.getCsv(this.props.partnumbers, [
                "partNumber",
                "givenTactTime",
                "cleanRoomTime",
              ]);
            }}
          >
            to CSV
          </button>
          <button
            className="btn btn--accent "
            onClick={() => {
              startAddingPartnumber();
            }}
          >
            Add new
          </button>
        </div>
        <div className="partnumber-list__header">
          <span className="partnumber-list__header__item--first">product</span>
          {this.renderConditionalHeaders()}
          <span className="partnumber-list__header__item">clean room tt</span>
        </div>
        <div className="partnumber-list">
          { this.props.partnumbers && this.props.partnumbers.map((product) => <PartnumberItem
              key={product._id}
              _id={product._id}
              partNumber={product.partNumber}
              givenTactTime={product.givenTactTime}
              suggestedTactTime={product.suggestedTactTime}
              cleanRoomTime={product.cleanRoomTime}
              givenHourlyRate={product.givenHourlyRate}
              suggestedHourlyRate={product.suggestedHourlyRate}
              xlsxTactTime={product.xlsxTactTime}
              automatic={product.automatic}
          /> )}
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
  const {
    filteredPartnumbers,
    partnumbers,
    isLoading,
    errorMessage,
    partnumberConfig,
    allPartnumbersCount,
  } = state.dashboard;
  return {
    filteredPartnumbers,
    partnumbers,
    isLoading,
    errorMessage,
    partnumberConfig,
    allPartnumbersCount,
  };
}

export default connect(mapStateToProps, actions)(PartnumbersList2);
