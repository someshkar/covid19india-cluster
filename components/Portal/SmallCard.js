import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SmallCard({ icon, title, content }) {
  return (
    <div className="card">
      <div className="card-body" style={{ padding: '0.8rem' }}>
        <div className="card-title text-uppercase">
          <FontAwesomeIcon icon={icon} className="d-inline-block" />
          <span className="ml-1">{title}</span>
        </div>
        <p className="card-text">
          {content ? content : "--"}
        </p>
      </div>
    </div>
  )
}

export default SmallCard