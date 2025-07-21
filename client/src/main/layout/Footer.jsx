import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
  faXTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-teal-600 text-white mt-8">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">About Us</h2>
          <p className="text-sm leading-6">
            We are a leading social app that connects people globally. Share
            your moments, chat with friends, and explore new connections.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <ul>
            <li className="hover:text-blue-800  hover:bg-white hover:font-extrabold py-1 px-2 rounded w-44">
              <a href="#">Home</a>
            </li>
            <li className="hover:text-blue-800   hover:bg-white py-1 px-2 rounded w-44">
              <a href="#">About</a>
            </li>
            <li className="hover:text-blue-800  hover:bg-white py-1 px-2 rounded w-44">
              <a href="#">Features</a>
            </li>
            <li className="hover:text-blue-800   hover:bg-white py-1 px-2 rounded w-44">
              <a href="#">Contact</a>
            </li>
            <li className="hover:text-blue-800   hover:bg-white py-1 px-2 rounded w-44">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex flex-wrap gap-2 space-x-4">
            <a
              href="#"
              className="text-white hover:text-blue-500 transition duration-300"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a
              href="#"
              className="text-white hover:text-pink-500 transition duration-300"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-800 transition duration-300"
            >
              <FontAwesomeIcon icon={faXTwitter} size="2x" />
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-600 transition duration-300"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a
              href="#"
              className="text-white hover:text-red-500 transition duration-300"
            >
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-800 transition duration-300"
            >
              <FontAwesomeIcon icon={faTiktok} size="2x" />
            </a>
          </div>
        </div>
        {/* Contact Us */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="flex items-center space-x-2 mb-2">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>support@socialapp.com</span>
          </p>
          <p className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faPhone} />
            <span>+1 234 567 890</span>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white py-6 text-center">
        <p className="text-sm">&copy; 2024 SocialApp. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
