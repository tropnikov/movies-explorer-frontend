import React from 'react';
import './AboutMe.css';
import photo from '../../../images/Photo_cropped.JPG';

const AboutMe = () => {
  return (
    <section id="about-me" className="about">
      <h2 className="about__title">Студент</h2>
      <div className="about__info">
        <div className="about__bio">
          <div>
            <h3 className="about__name">Максим</h3>
            <p className="about__job">Фронтенд-разработчик, 30&nbsp;лет</p>
            <p className="about__description">
              Я&nbsp;родился и&nbsp;(пока) живу в&nbsp;Новосибирске, закончил
              физический факультет НГУ и&nbsp;даже аспирантуру. Я&nbsp;люблю
              слушать музыку, а&nbsp;ещё увлекаюсь плаванием, велосипедом
              и&nbsp;бегом. С&nbsp;2020 года работал в&nbsp;компании
              &laquo;R-Style Softlab&raquo;. Еще на&nbsp;закончив курс
              по&nbsp;веб-разработке, устроился в&nbsp;компанию БКС, где мне всё
              нравится.
            </p>
          </div>
          <div>
            <a
              className="about__link link"
              href="https://www.linkedin.com/in/maksim-tropnikov/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="about__link link"
              href="https://github.com/tropnikov/"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <div className="about__photo-container">
          <img src={photo} alt="Моя фотография" className="about__photo" />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
