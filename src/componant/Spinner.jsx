import React from "react";
import ClipLoader  from "react-spinners/ClipLoader";
const override = {
    margin: "100px auto",
    display :"block"
}

const Spinner = ({ loading }) => {
    return (
      <ClipLoader
        color="#4338ca"
        size={150}
        loading={loading}
        cssOverride={override}
      />
    );
};

export default Spinner;
