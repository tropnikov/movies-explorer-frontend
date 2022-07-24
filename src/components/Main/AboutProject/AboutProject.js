import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section id="about-project" className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__description">
        <div className="about-project__stage">
          <p className="about-project__stage-title">
            Дипломный проект включал 5 этапов
          </p>
          <p className="about-project__stage-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="about-project__stage">
          <p className="about-project__stage-title">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about-project__stage-text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__duration">
        <div className="about-project__backend">
          <div className="about-project__duration-backend">1 неделя</div>
          <p className="about-project__duration-text">Back-end</p>
        </div>
        <div className="about-project__frontend">
          <div className="about-project__duration-frontend">4 недели</div>
          <p className="about-project__duration-text">Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
