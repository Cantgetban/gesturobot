import LoopOfMovements from "../loopOfMovements/loopOfMovements";
import { emotionsList } from "../../databases/emotions";
import "./gestureLable.css";
import { useContext } from "react";
import { LanguageContext } from "../../language-management/LanguageContext";

function GestureLable(props) {
  const { language } = useContext(LanguageContext);
  const gestureEmotionsList = [props.gesture.realLabel];

  while (gestureEmotionsList.length < 5) {
    const randomIndex = Math.floor(Math.random() * emotionsList.length);
    const randomElement = emotionsList[randomIndex];
    if (gestureEmotionsList.includes(randomElement)) {
      continue;
    } else {
      gestureEmotionsList.push([randomElement.en, randomElement.he]);
    }
  }
  //shuffle the array
  for (let i = gestureEmotionsList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gestureEmotionsList[i], gestureEmotionsList[j]] = [
      gestureEmotionsList[i],
      gestureEmotionsList[j],
    ];
  }
  return (
    <div className="p-1" key={props.gesture.id}>
      <span className="example">
        <LoopOfMovements ids={props.gesture.movements} />
        <div class="button-line">
          <button onClick={props.clickFunction}>
            {language == "en"
              ? gestureEmotionsList[0][0]
              : gestureEmotionsList[0][1]}
          </button>
          <button onClick={props.clickFunction}>
            {language == "en"
              ? gestureEmotionsList[1][0]
              : gestureEmotionsList[1][1]}
          </button>
          <button onClick={props.clickFunction}>
            {language == "en"
              ? gestureEmotionsList[2][0]
              : gestureEmotionsList[2][1]}
          </button>
          <button onClick={props.clickFunction}>
            {language == "en"
              ? gestureEmotionsList[3][0]
              : gestureEmotionsList[3][1]}
          </button>
          <button onClick={props.clickFunction}>
            {language == "en"
              ? gestureEmotionsList[4][0]
              : gestureEmotionsList[4][1]}
          </button>
        </div>
      </span>
      <div className="card-body"></div>
    </div>
  );
}

export default GestureLable;
