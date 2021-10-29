import React from "react";
import './Footer.css';
import { DiCode } from "react-icons/di";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  return (
    <div>
        <footer className="footer">
            <p className="copyright">Made with by <DiCode color="#f8f8f8"/> SystemFood Tech</p>
        </footer>
    </div>
  )
}