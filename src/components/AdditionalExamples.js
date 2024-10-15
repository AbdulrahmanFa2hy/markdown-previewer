import React from "react";

function AdditionalExamples({ item }) {
  return (
    <div className="example">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <h3>- Markdown</h3>
      <small>{item.markdown}</small>
      <h3>- html</h3>
      <small>{item.html}</small>
    </div>
  );
}

export default AdditionalExamples;
