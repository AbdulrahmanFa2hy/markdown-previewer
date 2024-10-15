import React from "react";
import Example from "./Example";
import AdditionalExamples from "./AdditionalExamples";

function DocsItem({ item }) {
  return (
    <>
      <div className="header">
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </div>
      {item.examples.map((item, index) => {
        return <Example key={index} item={item} index={index} />;
      })}
      {item.additional_examples.map((item, index) => {
        return <AdditionalExamples key={index} index={index} item={item} />;
      })}
    </>
  );
}

export default DocsItem;
