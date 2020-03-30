import React, { useState, useEffect } from 'react';
import axios from "axios";

function SourcesListItem(props) {
  const [data, setData] = useState({sources: []});

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios(
        `/api/patient/${props.id}/sources?format=json`
      );
      if (!ignore) setData({sources: result.data});
    }

    fetchData();
    return () => { ignore = true; }
  }, [props.id]);

  return (
    <li className="list-group-item">
      <h5 className="h5">Sources</h5>
      <ol>
        {
          data.sources.map(source => (
            <li className="my-2">
              <a href={source.url}>
                { source.description ? source.description : source.url }
              </a>
            </li>
          ))
        }
      </ol>
    </li>
  );
}

export default SourcesListItem;