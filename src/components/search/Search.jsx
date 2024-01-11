import React from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import WidgetContext from "../../context/WidgetContext";
import "./search.css";
import { ReactComponent as SearchIcon } from "../../assets/Search.svg";
import { ReactComponent as ClearIcon } from "../../assets/close-Circle.svg";
import { ReactComponent as FilterIcon } from "../../assets/Custom.svg";

const Search = () => {
  const { t } = useTranslation();
  const { setSearchKeyWord, searchKeyWord } = useContext(WidgetContext);

  const clearSearch = () => {
    setSearchKeyWord("");
  };

  return (
    <div className="search-container">
      <div className="search-icon-container">
        <SearchIcon className="search-icon" />
      </div>
      <input
        type="text"
        name="search"
        placeholder={t("search.placeholder")}
        className="widget-search-bar"
        value={searchKeyWord}
        onChange={(e) => setSearchKeyWord(e.target.value)}
      />
      <div
        className="filter-icon-container"
        style={searchKeyWord ? { right: "40px" } : { right: "10px" }}
      >
        <FilterIcon className="filter-icon" />
      </div>
      {searchKeyWord && (
        <div className="clear-icon-container" onClick={clearSearch}>
          <ClearIcon className="clear-icon" />
        </div>
      )}
    </div>
  );
};

export default Search;
