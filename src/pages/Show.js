import React from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ShowMainData from "../components/show/ShowMainData";
import { apiGet } from "../misc/config";
import Details from "../components/show/Details";
import Seasons from "../components/show/Seasons";

import Cast from "../components/show/Cast";
import { InfoBlock, ShowPageWrapper } from "./Show.styled";

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { isLoading: false, error: null, show: action.show };
    }

    case "FETCH FAILED": {
      return {
        ...prevState,
        isLoading: false,
        error: null,
        show: action.error,
      };
    }

    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};
const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // console.log("state", state);
  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((result) => {
        setTimeout(() => {
          if (isMounted) {
            dispatch({ type: "FETCH_SUCCESS", show: result });
          }
        }, 2000);
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({ type: "FETCH FAILED", error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log("Show", show);
  if (isLoading) {
    return <div>Data is being loading</div>;
  }
  if (error) {
    return <div>error occured : {error}</div>;
  }

  if (show) {
    return (
      <ShowPageWrapper>
        <ShowMainData
          image={show.image}
          name={show.name}
          rating={show.rating}
          summary={show.summary}
          tags={show.genres}
        />
        <InfoBlock>
          <h2>Details</h2>
          <Details
            status={show.status}
            network={show.network}
            premiered={show.premired}
          />
        </InfoBlock>

        <InfoBlock>
          <h2>Seasons</h2>
          <Seasons seasons={show._embedded.seasons} />
        </InfoBlock>

        <InfoBlock>
          <h2>Cast</h2>
          <Cast cast={show._embedded.cast} />
        </InfoBlock>
      </ShowPageWrapper>
    );
  }
};

export default Show;
