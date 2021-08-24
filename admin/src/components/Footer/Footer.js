import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import './Footer.css'

export default class Footer extends Component {
    render() {
        return (

            <footer class="footer-distributed">

                <div class="footer-left">

                    <h3><span>Vani Stores</span></h3>

                    <p class="footer-links">
                        <a href="/home" class="link-1">Home</a>

                        <a href="#">Blog</a>

                        <a href="#">About</a>

                    </p>

                    <p class="footer-company-name">Vani Stores © 2021</p>
                </div>

                <div class="footer-center">

                    <div>
                        <i class="fa fa-map-marker"></i>
                        <p><span>Venkatesh nagar</span>3rd cross, Shimoga</p>
                    </div>

                    <div>
                        <i class="fa fa-phone"></i>
                        <p>9986990588</p>
                    </div>

                    <div>
                        <i class="fa fa-envelope"></i>
                        <p><a href="mailto:vigneshmsmg2000@gmail.com">vigneshmsmg2000@gmail.com</a></p>
                    </div>

                </div>

                <div class="footer-right">

                    <p class="footer-company-about">
                        <span>About the company</span>
                        Biggest Online Bookstore in Karnataka,our biggest pleasure is to give people their wishfull and classical books at their doorsteps

                    </p>

                    <div class="footer-icons">

                        <a href="https://www.facebook.com/groups/291449779440492" target="_blank"><FontAwesomeIcon icon={faFacebook} /></a>

                        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>

                        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>

                        <a href="https://github.com/123vignesh" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>

                    </div>

                </div>

            </footer>
        )
    }
}
