import React from "react";
import "./DescriptionEditor.css";

const DescriptionEditor = () => {
  return (
    <div className="desc-container">
      <h3>Description</h3>
      <hr />
      <label htmlFor="gig-desc" className="desc-label">
        Briefly Describe Your Gig
      </label>

      <div className="editor-toolbar">
        <button type="button" title="Bold"><b>B</b></button>
        <button type="button" title="Italic"><i>I</i></button>
        <button type="button" title="Underline"><u>U</u></button>
        <button type="button" title="Bullet List">•</button>
        <button type="button" title="Number List">1.</button>
      </div>

      <div
        className="editor-box"
        contentEditable
        id="gig-desc"
        placeholder="Type your gig description here..."
      >
        A
      </div>

      <div className="char-count">1/1200 Characters</div>
      <button className="submit-btn">Save & Continue</button>
    </div>
    
  );
};

export default DescriptionEditor;
