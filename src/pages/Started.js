import React, { useState } from "react";
import { useEffect } from "react";
import MainPageLayout from "../components/mainpagelayout";
import { useShows } from "../misc/custom-hooks";
import { apiGet } from "../misc/config";
import ShowGrid from "../components/show/ShowGrid";

const Starred = () => {
  const [starred] = useShows();

  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((showId) => apiGet(`/shows/${showId}`));

      Promise.all(promises)
        .then((apiData) => apiData.map((show) => ({ show })))
        .then((result) => {
          setShow(result);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>shows are still loading </div>}{" "}
      {error && <div>Error occure : {error}</div>}
      {!isLoading && !show && <div>No shows were added</div>}
      {!isLoading && !error && show && <ShowGrid data={show} />}
    </MainPageLayout>
  );
};
export default Starred;
