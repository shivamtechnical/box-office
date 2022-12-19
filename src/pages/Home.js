import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";

import MainPageLayout from "../components/mainpagelayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";

const Home = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowsSearch = searchOption === "shows";

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then((result) => {
      setResult(result);
    });
  };

  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = (ev) => {
    setSearchOption(ev.target.value);
  };

  const renderResults = () => {
    if (result && result.length === 0) {
      return <div>NO RESULT</div>;
    }
    if (result && result.length > 0) {
      return result[0].show ? (
        <ShowGrid data={result} />
      ) : (
        <ActorGrid data={result} />
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <div>
        <label htmlFor="show-search">
          Shows
          <input
            id="show-search"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>

        <label htmlFor="actor-search">
          Actor
          <input
            id="actor-search"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        {" "}
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};
export default Home;
