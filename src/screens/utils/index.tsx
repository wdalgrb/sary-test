import React from "react";
import { createBrowserHistory } from "history";
interface LoadingProps {
  status: boolean;
  children: any;
}
export const Loading = (props: LoadingProps) => {
  if (props.status) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <img src={require("../../images/loading.gif")} />
        </div>
      </div>
    );
  } else {
    return props.children;
  }
};

interface IsEmptyProps {
  empty: boolean;
  message: string;
  children: any;
}
export const IsEmpty = ({ empty, children, message }: IsEmptyProps) => {
  if (empty) {
    return (
      <div
        style={{
          flex: 1,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          fontWeight: "bold",
          color: "#707070",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {message || "No Data To Display"}
        </div>
      </div>
    );
  } else {
    return children;
  }
};

export const history = createBrowserHistory();
