import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import AlertContext from "../../context/alert/alertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <Snackbar key={alert.id} open={true} message={alert.msg} />
      // <div key={alert.id} className={`alert alert-${alert.type}`}>
      //   <i className="fas fa-info-circle" /> {alert.msg}
      // </div>
    ))
  );
};

export default Alerts;
