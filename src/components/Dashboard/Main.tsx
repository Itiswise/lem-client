import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Tab } from "../../actions";
import requireAuth from "../requireAuth";
import "./MainStyle.scss";
import AnalyticsLines from "./AnalyticsLines";
import AnalyticsOrders from "./AnalyticsOrders";
import AnalyticsPartnumbers from "./AnalyticsPartnumbers";
import AnalyticsLiveView from "./AnalyticsLiveView";
import ManagementCustomers from "./ManagementCustomers";
import ManagementLines from "./ManagementLines";
import ManagementOrders from "./ManagementOrders";
import ManagementOperators from "./ManagementOperators";
import ManagementTactTimes from "./ManagementTactTimes";
import ManagementUsers from "./ManagementUsers";
import ManagementProducts from "./ManagementProducts";
import ManagementRedirections from "./ManagementRedirections";
import { StoreState } from "../../reducers";

interface IMainPageProps {
  authenticated: string | null;
  activeSidebarTab: Tab;
  AnalyticsLines: ElementType;
  AnalyticsOrders: ElementType;
  AnalyticsPartnumbers: ElementType;
  AnalyticsLiveView: ElementType;
  ManagementCustomers: ElementType;
  ManagementLines: ElementType;
  ManagementOrders: ElementType;
  ManagementOperators: ElementType;
  ManagementTactTimes: ElementType;
  ManagementUsers: ElementType;
  ManagementProducts: ElementType;
  ManagementRedirections: ElementType;
}

class Main extends Component<IMainPageProps> {
  renderChildComponent(tab: Tab) {
    const {
      AnalyticsLines,
      AnalyticsOrders,
      AnalyticsPartnumbers,
      AnalyticsLiveView,
      ManagementCustomers,
      ManagementLines,
      ManagementOrders,
      ManagementTactTimes,
      ManagementUsers,
      ManagementOperators,
      ManagementProducts,
      ManagementRedirections,
    } = this.props;
    switch (tab) {
      case Tab.AnalyticsLines:
        return <AnalyticsLines />;
      case Tab.AnalyticsOrders:
        return <AnalyticsOrders />;
      case Tab.AnalyticsLiveView:
        return <AnalyticsLiveView />;
      case Tab.AnalyticsPartnumbers:
        return <AnalyticsPartnumbers />;
      case Tab.ManagementCustomers:
        return <ManagementCustomers />;
      case Tab.ManagementLines:
        return <ManagementLines />;
      case Tab.ManagementOrders:
        return <ManagementOrders />;
      case Tab.ManagementTactTimes:
        return <ManagementTactTimes />;
      case Tab.ManagementUsers:
        return <ManagementUsers />;
      case Tab.ManagementOperators:
        return <ManagementOperators />;
      case Tab.ManagementProducts:
        return <ManagementProducts />;
      case Tab.ManagementRedirections:
        return <ManagementRedirections />;
      default:
        return <div>Please pick a tab from the sidebar!</div>;
    }
  }

  render() {
    return <>{this.renderChildComponent(this.props.activeSidebarTab)}</>;
  }
}

function mapStateToProps(state: StoreState) {
  return {
    authenticated: state.auth.authenticated,
    activeSidebarTab: state.dashboard.activeSidebarTab,
    AnalyticsLines,
    AnalyticsOrders,
    AnalyticsLiveView,
    AnalyticsPartnumbers,
    ManagementCustomers,
    ManagementLines,
    ManagementOrders,
    ManagementTactTimes,
    ManagementUsers,
    ManagementOperators,
    ManagementProducts,
    ManagementRedirections,
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Main));
