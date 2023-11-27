import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate;
    const goToPage = (path) => {
        navigate('/' + path);
    };

    return (
        <div className="pt-20 text-center text-xs p-2 pb-5">
            <Link to="/">
                <span className="px-3 cursor-pointer">ARTX Studio®</span>
            </Link>
            <Link to="download">
                <span className="px-3 cursor-pointer">App Download</span>
            </Link>
        </div>
    );
}

export default Footer;
