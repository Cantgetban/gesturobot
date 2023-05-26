import LoopOfMovements from "../loopOfMovements/loopOfMovements";
import { emotionsList } from "../../databases/emotions";
import "./gestureLable.css";
import { useContext } from "react";
import { LanguageContext } from "../../language-management/LanguageContext";

function GestureLable(props) {
  const { language } = useContext(LanguageContext)
  const gestureEmotionsList = [props.gesture.realLabel];

  while (gestureEmotionsList.length < 5) {
    const randomIndex = Math.floor(Math.random() * emotionsList.length);
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
    [gestureEmotionsList[i] , gestureEmotionsList[j]] = [
      gestureEmotionsList[i] ,
      gestureEmotionsList[j] ,
    ];
  }
  return (
    <div className="p-1" key={props.gesture.id}>
      <span className="example">
        <LoopOfMovements ids={props.gesture.movements} />
        <div class="button-line">
          <button onClick={props.clickFunction}>
            {language == "en" ? gestureEmotionsList[0].en : gestureEmotionsList[0].he}
          </button>
          <button onClick={props.clickFunction}>
            {language == "en" ? gestureEmotionsList[1].en : gestureEmotionsList[1].he}
          </button>
          <button onClick={props.clickFunction}>
            {language == "en" ? gestureEmotionsList[2].en : gestureEmotionsList[2].he}
          </button>
          <button onClick={props.clickFunction}>
            {language == "en" ? gestureEmotionsList[3].en : gestureEmotionsList[3].he}
          </button>
          <button onClick={props.clickFunction}>
            {language == "en" ? gestureEmotionsList[4].en : gestureEmotionsList[4].he}
          </button>
        </div>
      </span>
      <div className="card-body"></div>
    </div>
  );
}

export default GestureLable;
