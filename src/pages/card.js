import './css/managesurvey.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { Dropdown as ReactBootstrapDropdown } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import brain from '../images/survey.png';
import axios from 'axios';
import 'animate.css';


const Card = ({ key, itemId, id, title, date }) => {

  const token = localStorage.getItem('ACCESS_TOKEN');
  const handleDelete = () => {
    console.log(`/api/survey/${encodeURIComponent(id)}`)
    axios.delete(`/api/survey/${encodeURIComponent(id)}`, { //   생성한 설문 가져오는 요청
      headers: {
        Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다.
      }
    }).then(response => {
      // 삭제 성공 후 실행할 코드를 작성합니다.
      console.log('삭제 성공');
      window.location.reload();
    })
      .catch(error => {
        // 삭제 실패 후 실행할 코드를 작성합니다.
        console.error('삭제 실패', error);
      });
  };

  return (
    <div className="col-lg-3A wow slideInUp" data-wow-delay="0.2s" >


      <img className="img-fluid" src={brain} alt="" style={{ width: '100%' }} />
      <div className="p-5" style={{ height: '185px', backgroundColor: '#F8F9FA', boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.2)' }}>

        <h5 className="fw-bold  card-title">{title}</h5>
        <ReactBootstrapDropdown>
          <ReactBootstrapDropdown.Toggle variant="secondary" id="dropdown-basic" className="dropdown-toggle">
            <span className="fas fa-ellipsis-v ellipsis-icon"></span>
          </ReactBootstrapDropdown.Toggle>
          <ReactBootstrapDropdown.Menu  style={{ maxHeight: '300px', overflowY: 'no' }}>
            <ReactBootstrapDropdown.Item className="custom-dropdown-item" as={Link} to={{
              pathname: `/surveyURL/${encodeURIComponent(id)}`,
              state: { surveyId: id }
            }}>
              공유
            </ReactBootstrapDropdown.Item>
            <ReactBootstrapDropdown.Item className="custom-dropdown-item" as={Link} to={`/managesurvey/survey/${encodeURIComponent(id)}/statistic`}>
              통계
            </ReactBootstrapDropdown.Item>
            <ReactBootstrapDropdown.Item className="custom-dropdown-item" as={Link} to={{
              pathname: `/modifysurvey/${encodeURIComponent(id)}`,
              state: { surveyId: id }
            }}>
              수정
            </ReactBootstrapDropdown.Item>
            <ReactBootstrapDropdown.Item className="custom-dropdown-item" onClick={handleDelete}>삭제</ReactBootstrapDropdown.Item>

          </ReactBootstrapDropdown.Menu>
        </ReactBootstrapDropdown>
        <br />
        <div className="card-content mb-5">

          <small className="me-3">

            <i className="far fa-user text-primary me-2" />
            {itemId}
            <br></br>
            <i className=" far fa-calendar-alt text-primary me-2" />
            {date}
          </small>

        </div>

      </div>
    </div>
  );
};

export default Card;
