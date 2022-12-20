import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";

const Show = () => {
  const { id } = useParams();

  const [Show, setShow] = useState(null);
  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then((result) => {
      setShow(result);
    });
  }, [id]);

  console.log("Show", Show);

  return <div>this is show</div>;
};

export default Show;
