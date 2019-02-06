import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';

// pages
import DashboardPage from 'pages/DashboardPage';
import PlaystationPage from 'pages/PlaystationPage';
import TabletPage from 'pages/TabletPage';
import NintendoPage from 'pages/NintendoPage';
import HandphonePage from 'pages/HandphonePage';
import AuthPage from 'pages/AuthPage';
import MacBookPage from 'pages/MacBookPage';
import LaptopConsumerPage from 'pages/LaptopConsumerPage';
import LaptopGamingPage from 'pages/LaptopGamingPage';
import UltraBookPage from 'pages/UltraBookPage';
import DetailProductPage from './pages/DetailsProductPage';
import ListBookingsPage from './pages/customer/ListBookingsPage';
import PurchaseStatusPage from './pages/customer/PurchaseStatusPage';
import PurchasePage from './pages/customer/PurchasePage';

import AddProductPage from './pages/administrator/AddProductPage';
import SummaryPage from './pages/administrator/SummaryPage';
import AdminProductsPage from './pages/administrator/AdminProductsPage';



import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.css';

//auth
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";
import store from "./store/store";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // // Redirect to login
    // this.props.router.push('/login');
  }
  // console.log(decoded.exp, currentTime);
}

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component { 
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <LayoutRoute
              exact
              path="/"
              layout={MainLayout}
              component={DashboardPage}
            />
            <LayoutRoute
              exact
              path="/playstation"
              layout={MainLayout}
              component={PlaystationPage}
            />
            <LayoutRoute
              exact
              path="/nintendo"
              layout={MainLayout}
              component={NintendoPage}
            />
            <LayoutRoute
              exact
              path="/handphone"
              layout={MainLayout}
              component={HandphonePage}
            />
            <LayoutRoute
              exact
              path="/tablet"
              layout={MainLayout}
              component={TabletPage}
            />
            <LayoutRoute
              exact
              path="/laptopconsumer"
              layout={MainLayout}
              component={LaptopConsumerPage}
            />
            <LayoutRoute
              exact
              path="/laptopgaming"
              layout={MainLayout}
              component={LaptopGamingPage}
            />
            <LayoutRoute
              exact
              path="/macbook"
              layout={MainLayout}
              component={MacBookPage}
            />
            <LayoutRoute
              exact
              path="/ultrabook"
              layout={MainLayout}
              component={UltraBookPage}
            />
            <LayoutRoute
              exact
              path="/detail/:id"
              layout={MainLayout}
              component={DetailProductPage}
            />
            <LayoutRoute
              exact
              path="/listbookings"
              layout={MainLayout}
              component={ListBookingsPage}
            />
            <LayoutRoute
              exact
              path="/purchase/:id"
              layout={MainLayout}
              component={PurchasePage}
            />
            <LayoutRoute
              exact
              path="/purchasestatus"
              layout={MainLayout}
              component={PurchaseStatusPage}
            />SummaryPage

            <LayoutRoute
              exact
              path="/summary"
              layout={MainLayout}
              component={SummaryPage}
            />
            <LayoutRoute
              exact
              path="/addproduct"
              layout={MainLayout}
              component={AddProductPage}
            />
            <LayoutRoute
              exact
              path="/adminproducts"
              layout={MainLayout}
              component={AdminProductsPage}
            />
            
            {/* <LayoutRoute
              exact
              path="/register"
              layout={MainLayout}
              component={AuthPage}
            /> */}
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
