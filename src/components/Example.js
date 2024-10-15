import React from "react";

function Example({ item, index }) {
  return (
    <div key={index} className="example">
      <h2>Example {index + 1}</h2>
      <h3>- Markdown</h3>
      <small>{item.markdown}</small>
      <h3>- html</h3>
      <small>{item.html}</small>
    </div>
  );
}

export default Example;
