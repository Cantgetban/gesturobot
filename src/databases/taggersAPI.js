function addTaggerJson(newTagger) {
  // get the current maximum ID
  fetch("http://localhost:3000/taggers")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const maxId = data ? Math.max(...data.map((gesture) => gesture.id)) : 0;
      // add 1 to the maximum ID to get the next ID for the new gesture
      const nextId = maxId + 1;

      // add the new gesture with the next ID
      fetch("http://localhost:3000/taggers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: nextId, ...newTagger }),
      }).then((response) => console.log(response.json()));
    })
    .catch((error) => console.log("Error fetching gestures:", error));
}
export default addTaggerJson;
