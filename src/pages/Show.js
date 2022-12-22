import React from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";

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

  const [{ Show, isLoading, error }, dispatch] = useReducer(
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

  console.log("Show", Show);
  if (isLoading) {
    return <div>Data is being loading</div>;
  }
  if (error) {
    return <div>error occured : {error}</div>;
  }

  return <div>this is show</div>;
};

export default Show;
