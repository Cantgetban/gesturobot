import LoopOfMovements from "../loopOfMovements/loopOfMovements";
import { emotionsList } from "../../databases/emotions";
import "./gestureLable.css";

function GestureLable(props) {
  const gestureEmotionsList = [props.gesture.realLabel];

  while (gestureEmotionsList.length < 5) {
    const randomIndex = Math.floor(Math.random() * gestureEmotionsList.length);
    const randomElement = emotionsList[randomIndex];
    if (gestureEmotionsList.includes(randomElement)) {
      continue;
    } else {
      gestureEmotionsList.push(randomElement);
    }
  }

  //shuffle the array
  for (let i = gestureEmotionsList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gestureEmotionsList[i], gestureEmotionsList[j]] = [
      gestureEmotionsList[j],
      gestureEmotionsList[i],
    ];
  }

  return (
    <div className="p-1" key={props.gesture.id}>
      <span className="example">
        <LoopOfMovements ids={props.gesture.movements} />
        <div class="button-line">
          <button onClick={props.clickFunction}>
            {gestureEmotionsList[0]}
          </button>
          <button onClick={props.clickFunction}>
            {gestureEmotionsList[1]}
          </button>
          <button onClick={props.clickFunction}>
            {gestureEmotionsList[2]}
          </button>
          <button onClick={props.clickFunction}>
            {gestureEmotionsList[3]}
          </button>
          <button onClick={props.clickFunction}>
            {gestureEmotionsList[4]}
          </button>
        </div>
      </span>
      <div className="card-body"></div>
    </div>
  );
}

export default GestureLable;
