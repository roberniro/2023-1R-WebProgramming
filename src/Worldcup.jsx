import p01 from "./assets/박수진.jpg";
import p02 from "./assets/신민아.jpg";
import p03 from "./assets/신세경.jpg";
import p04 from "./assets/신소율.jpg";
import p05 from "./assets/연우.jpg";
import p06 from "./assets/유인나.jpg";
import p07 from "./assets/이주빈.jpg";
import p08 from "./assets/이지은.jpg";
import p09 from "./assets/이혜리.jpg";
import p10 from "./assets/정은지.jpg";
import p11 from "./assets/한예슬.jpg";
import p12 from "./assets/한효주.jpg";
import p13 from "./assets/권나라.jpg";
import p14 from "./assets/김희선.jpg";
import p15 from "./assets/문채원.jpg";
import p16 from "./assets/배수지.jpg";
import { useEffect, useState } from "react";

function Worldcup() {
  const candidate = [
    { name: "박수진", src: p01 },
    { name: "신민아", src: p02 },
    { name: "신세경", src: p03 },
    { name: "신소율", src: p04 },
    { name: "연우", src: p05 },
    { name: "유인나", src: p06 },
    { name: "이주빈", src: p07 },
    { name: "이지은", src: p08 },
    { name: "이혜리", src: p09 },
    { name: "정은지", src: p10 },
    { name: "한예슬", src: p11 },
    { name: "한효주", src: p12 },
    { name: "권나라", src: p13 },
    { name: "김희선", src: p14 },
    { name: "문채원", src: p15 },
    { name: "배수지", src: p16 }
  ];

  const [game, setGame] = useState([]);
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 항목 상태 추가

  useEffect(() => {
    setGame(
      candidate
        .map((c) => {
          return { name: c.name, src: c.src, order: Math.random() };
        })
        .sort((l, r) => {
          return l.order - r.order;
        })
    );
  }, []);

  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);

  useEffect(() => {
    // 3초 후에 선택된 항목 초기화
    const timeout = setTimeout(() => {
      setSelectedItem(null);
    }, 3000);

    return () => clearTimeout(timeout); // cleanup 함수를 사용하여 타임아웃 클리어
  }, [selectedItem]);

  const handleItemClick = (index) => {
    // 항목을 클릭하면 선택된 항목 설정
    const selectedItem = game[round * 2 + index];
    setSelectedItem(selectedItem);
    setNextGame((prev) => prev.concat(selectedItem));
    setRound((round) => round + 1);
  };

  if (game.length === 1) {
    return (
      <div>
        <p>이상형 월드컵 우승</p>
        <div
          style={{
            position: "relative",
            display: "inline-block"
          }}
        >
          <img
            src={game[0].src}
            alt={game[0].name}
            style={{ width: "300px", height: "300px" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              padding: "10px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)"
            }}
          >
            {game[0].name}
          </div>
        </div>
      </div>
    );
  }

  if (game.length === 0 || round + 1 > game.length / 2)
    return <p>로딩중입니다</p>;

  return (
    <div>
      <p>
        이상형 월드컵 {round + 1} / {game.length / 2}{" "}
        <b>{game.length === 2 ? "결승" : `${game.length}강`}</b>
      </p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginRight: "10px"
          }}
        >
          <img
            src={game[round * 2].src}
            alt={game[round * 2].name}
            onClick={() => handleItemClick(0)}
            style={{
              cursor: "pointer",
              width: "300px",
              height: "300px"
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              padding: "10px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)"
            }}
          >
            {game[round * 2].name}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            display: "inline-block"
          }}
        >
          <img
            src={game[round * 2 + 1].src}
            alt={game[round * 2 + 1].name}
            onClick={() => handleItemClick(1)}
            style={{
              cursor: "pointer",
              width: "300px",
              height: "300px"
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              padding: "10px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)"
            }}
          >
            {game[round * 2 + 1].name}
          </div>
        </div>
      </div>
      {selectedItem && (
        <div>
          <p>선택한 항목: {selectedItem.name}</p>
          <img
            src={selectedItem.src}
            alt={selectedItem.name}
            style={{
              width: "200px",
              height: "200px"
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Worldcup;
