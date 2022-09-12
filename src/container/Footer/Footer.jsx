import React, { useState } from 'react';
import './Footer.scss';

import { images } from '../../constants';
import { MotionWrap, AppWrap } from '../../wrapper/';
import { client } from '../../client';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { name, email, message } = formData;

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [loading, setIsLoading] = useState(false);

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setIsLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    };
    client.create(contact).then((data) => {
      setIsLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <>
      <h2 className="head-text">Contactame</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:hello@pblgllgs.com" className="p-text">
            pbl.gllgs@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="email" />
          <a href="tel: +(56) 9 57592973" className="p-text">
            +(56) 9 57592973
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Tu email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Tu mensaje"
              value={message}
              name="message"
              onChange={handleChangeInput}
            ></textarea>
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>
            {loading ? 'Enviando' : 'Enviar mensaje'}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Gracias por contactarme!</h3>
        </div>
      )}
    </>
  );
};
export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
);
