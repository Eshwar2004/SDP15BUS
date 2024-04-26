// Faculty.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import BookCard from './BookCard';
import Userheader from './userheader';

const Faculty = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://sdp-15-bus.vercel.app/book') // Assuming your server is running on the same host
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBooks(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div>
      <Userheader></Userheader>
      <h2 style={{ color: '#003366', textAlign: 'center' }}></h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
    {books.map(book => (
      <BookCard key={book._id} book={book} />
    ))}
  </div>
</div>
    </div>
  );
};

export default Faculty;