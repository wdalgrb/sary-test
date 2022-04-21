import React from "react";

import { Tune, Search } from "@mui/icons-material";
interface Props {
  onSearchClicked: () => void;
}
function Header(props: Props) {
  return (
    <div className="header-container">
      <div className="header-title">Heroes</div>
      <div className="header-icons">
        <div className="header-item" onClick={props.onSearchClicked}>
          <Search />
        </div>
        <div className="header-item">
          <Tune />
        </div>
      </div>
    </div>
  );
}

export default Header;
