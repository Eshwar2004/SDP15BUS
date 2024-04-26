import React from 'react';
import './BookCard.css'; // Import the CSS styles

const BookCard = ({ book }) => {
  return (
    <div className="card">
      <div className="top-section">
        <div className="border"></div>
        <h3>Ticket DETAILS</h3>
        <div className="icons">
          <div className="logo">
            {/* Logo SVG */}
          </div>
          <div className="social-media">
            {/* Social Media Icons SVG */}
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <span className="title">{book.name}</span>
        <div className="row row1">
          <div className="item">
            <span className="big-text">{book.ID}</span>
            <span className="regular-text">ID</span>
          </div>
          <div className="item">
            <span className="big-text">{book.boarding}</span>
            <span className="regular-text">Boarding</span>
          </div>
          <div className="item">
            <span className="big-text">{book.destination}</span>
            <span className="regular-text">Destination</span>
          </div>
        </div>
        <div className="row row2">
          <div className="item">
            <span className="big-text">{book.price}</span>
            <span className="regular-text">Price</span>
          </div>
          <div className="item">
            <span className="big-text">{book.seatsselected}</span>
            <span className="regular-text">Seats Selected</span>
          </div>
          <div className="item">
            <button style={{ backgroundColor: 'orange', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;