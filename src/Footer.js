import React from 'react'
import "./Footer.css"
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

function Footer() {
    return (
        <div className="footer">
            <div className="footer__top" onClick={()=>{window.scrollTo(0, 0)}}>
            <ArrowUpwardIcon className="footer__arrow"></ArrowUpwardIcon>
                Back to top</div>
                
            <div className="footer__container">
                <div className="footer__menu">
                    <h3>How can we help?</h3>
                    <li>
                        <a href="#"><ul>Contact Us</ul></a>
                        <a href="#"><ul>Email</ul></a>
                        <a href="#"><ul>Shipping Services</ul></a>
                        <a href="#"><ul>Returns & Exchanges</ul></a>
                        <a href="#"><ul>Product Care</ul></a>
                    </li>
                </div>
                <div className="footer__menu">
                    <h3>The Company</h3>
                    <li>
                        <a href="#"><ul>About Clothes & Clothes</ul></a>
                        <a href="#"><ul>Careers</ul></a>
                        <a href="#"><ul>legal</ul></a>
                        <a href="#"><ul>Corporate Information</ul></a>
                        
                    </li>
                </div>
                <div className="footer__menu">
                    <h3>Find us on</h3>
                    <li>
                        <a href="#"><ul>Facebook</ul></a>
                        <a href="#"><ul>Twitter</ul></a>
                        <a href="#"><ul>Instagram</ul></a>
                        <a href="#"><ul>Youtube</ul></a>
                        <a href="#"><ul>Pinterest</ul></a>
                    </li>
                </div>
            </div>
        </div>
    )
}

export default Footer
