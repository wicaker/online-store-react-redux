import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { axiosInstance } from "../../config/api";

export default class PaypalPayment extends React.Component {
  render() {
    const onSuccess = payment => {
      const requestBody = {
        query: `
          mutation{
            receivePaypalPayment(dataInput:{email:"${
              payment.email
            }", payerID:"${payment.payerID}", paymentID:"${
          payment.paymentID
        }", paymentToken:"${payment.paymentToken}"}, pendingID:"${
          this.props.dataStatus._id
        }"){
              _id
            }
          }
        `
      };
      axiosInstance
        .post("graphql", requestBody)
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const onCancel = data => {
      console.log("The payment was cancelled!", data);
    };

    const onError = err => {
      console.log("Error!", err);
    };

    let env = "sandbox"; // you can set here to 'production' for production
    let currency = "USD"; // or you can set this value from your props or state
    let total = parseFloat(this.props.dataStatus.total); // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
      sandbox: process.env.REACT_APP_PAYPAL_ACCOUNT_SANDBOX,
      production: process.env.REACT_APP_PAYPAL_ACCOUNT_PRODUCTION
    };
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  }
}
