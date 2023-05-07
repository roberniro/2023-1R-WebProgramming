import { useState } from "react";
import "./App.css";

function App() {
  const [row, setRow] = useState([]);

  const handleClick = () => {
    fetch(
      "http://openapi.seoul.go.kr:8088/54416e584164656e39387a5550424c/json/RealtimeCityAir/1/25"
    )
      .then((res2) => res2.json())
      .then((res3) => {
        setRow(res3.RealtimeCityAir.row);
      });
  };

  console.log(row);

  return (
    <>
      <h1>서울시 실시간 대기오염 정보</h1>
      <button className="fetch-button" onClick={handleClick}>
        데이터 가져오기
      </button>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>PM10</th>
            <th>O3</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {row.map(function (obj) {
            return (
              <tr key={obj.MSRSTE_NM}>
                <td>{obj.MSRSTE_NM}</td>
                <td>{obj.PM10}</td>
                <td>{obj.O3}</td>
                <td>{obj.IDEX_NM}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
