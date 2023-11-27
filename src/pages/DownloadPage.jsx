import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function DownloadPage() {
 

  return (
    <div className="">
     <Link to="download">
                <span className="px-3 cursor-pointer">App Download </span>
            </Link>
    </div>
  );
}

export default DownloadPage;
