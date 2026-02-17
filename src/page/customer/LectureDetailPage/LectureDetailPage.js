import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { currencyFormat } from "../../../utils/number";
import "./style/LectureDetail.style.css";
import { getLectureDetail } from "../../../features/lecture/lectureSlice";
import { addToCart } from "../../../features/cart/cartSlice";
import Loading from "../../../common/component/Loading";

const LectureDetail = () => {
  const dispatch = useDispatch();
  const { selectedLecture, loading } = useSelector((state) => state.lecture);
  const [size, setSize] = useState("");
  const [selectedFileTxtbk, setSelectedFileTxtbk] = useState("");
  const [selectedTxtbk, setSelectedTxtbk] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    // 아직 로그인을 안한유저라면 로그인페이지로
    // 카트에 아이템 추가하기
  };
  const selectSize = (value) => {
    // 사이즈 추가하기
  };

  useEffect(() => {
    dispatch(getLectureDetail(id));
  }, [id, dispatch]);

  if (loading){
    return(
      <Container>
        <Loading message="강의를 불러오는 중이에요"/>
      </Container>
    )
  }

  if (!selectedLecture){
    return(
      <Container>
        <div>강의를 불러오는데 오류가 발생했습니다.</div>
        <div>관리자에게 문의하세요.</div>
      </Container>
    )
  }

  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img src={selectedLecture.img} className="w-100" alt="image" />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-title">{selectedLecture.name}</div>
          <div className="product-price">
            ₩ {currencyFormat(selectedLecture.price)}
          </div>
          <div className="product-desc">{selectedLecture.desc}</div>

          {selectedLecture.fileTxtbk?.length > 0 && (
            <div className="material-section">
              <div className="section-title">📁 파일 교재</div>
              <div className="material-options">
                {selectedLecture.fileTxtbk.map((type) => (
                <div key={type} className="mb-2">
                  <input
                    type="radio"
                    name="fileMaterial"
                    id={`file-${type}`}
                    value={type}
                    checked={selectedFileTxtbk === type}
                    onChange={() => setSelectedFileTxtbk(type)}
                  />
                  <label htmlFor={`file-${type}`} className="ms-2">
                    {type}
                  </label>
                </div>
                ))}
              </div>
            </div>
          )}

          {selectedLecture.txtbkStck && (
            <div className="material-section">
              <div className="section-title">📦 실물 교재</div>
              <select
                className="form-select"
                value={selectedTxtbk}
                onChange={(e) => setSelectedTxtbk(e.target.value)}
              >
                {selectedLecture.txtbkStck?.bind > 0 ? 
                  <option value="bind">
                    제본(스프링) 교재
                  </option> :
                  <option value="bind" disabled>
                    제본(스프링) 교재
                  </option>
                }
                {selectedLecture.txtbkStck?.book > 0 ? 
                  <option value="book">
                    책 교재
                  </option> :
                  <option value="book" disabled>
                    책 교재
                  </option>
                }
              </select>
            </div>
          )}

          <Button
            variant="dark"
            className="add-button"
            onClick={addItemToCart}
          >
            장바구니 담기
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LectureDetail;
