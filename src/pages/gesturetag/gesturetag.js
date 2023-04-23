import "./gesturetag.css";
function GestureTag() {
  return (
    <div>
      <img src="/logo3.png" class="logo-image" alt="GestuRobot logo"></img>
      <div class="container">
        <h1>Participation Confirmation</h1>
        <p>
          Please confirm your participation by checking the box below and
          agreeing to the terms and conditions:
        </p>
        <label for="agree">
          I agree to the terms and conditions.
          <input type="checkbox" id="agree" name="agree"></input>
        </label>
        <button id="confirm-btn" disabled>
          Confirm Participation
        </button>
      </div>
    </div>
  );
}

export default GestureTag;
