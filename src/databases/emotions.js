export const emotionsList = [
  { en: "Joy", he: "שמחה" },
  { en: "Sadness", he: "עצב" },
  { en: "Anger", he: "כעס" },
  { en: "Fear", he: "פחד" },
  { en: "Love", he: "אהבה" },
  { en: "Hate", he: "שנאה" },
  { en: "Guilt", he: "אשמה" },
  { en: "Shame", he: "חרפה" },
  { en: "Envy", he: "קנאה" },
  { en: "Jealousy", he: "קנאה" },
  { en: "Pride", he: "גאווה" },
  { en: "Gratitude", he: "תודה" },
  { en: "Hope", he: "תקווה" },
  { en: "Despair", he: "יאוש" },
  { en: "Confusion", he: "בלבול" },
  { en: "Curiosity", he: "סקרנות" },
  { en: "Surprise", he: "הפתעה" },
  { en: "Excitement", he: "ערבוב" },
  { en: "Disappointment", he: "אכזבה" },
  { en: "Contentment", he: "שבענות" },
  { en: "Loneliness", he: "בדידות" },
  { en: "Nostalgia", he: "נוסטלגיה" },
  { en: "Relief", he: "רווחה" },
  { en: "Pity", he: "חמלה" },
  { en: "Boredom", he: "משעממת" },
  { en: "Empathy", he: "תחושת הדדיות" },
  { en: "Compassion", he: "רחמים" },
  { en: "Apathy", he: "אפתיעה" },
  { en: "Satisfaction", he: "שביעות רצון" },
  { en: "Disgust", he: "נפגעות מתמונה מסוימת" }
];

// Function to map from Hebrew emotion to English
function mapHebrewToEnglish(hebrewEmotion) {
  let Ob = (emotionsList.find((emotion) => emotion.he === hebrewEmotion));
  return Ob.en
}
// Function to map from English emotion to Hebrew
function mapEnglishToHebrew(englishEmotion) {
  console.log(englishEmotion)
  let Ob =  (emotionsList.find((emotion) => emotion.en === englishEmotion));
  console.log(Ob)
  return Ob.he;
}

export {mapHebrewToEnglish, mapEnglishToHebrew};