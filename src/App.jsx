import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [studyMode, setStudyMode] = useState(false);
  const [timerMode, setTimerMode] = useState(false);
const [timeLeft, setTimeLeft] = useState(25 * 60);
const [timerRunning, setTimerRunning] = useState(false);
const [selectedTime, setSelectedTime] = useState(null);
const [customMinutes, setCustomMinutes] = useState('');
useEffect(() => {
  if (!timerRunning || timeLeft <= 0) {
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((previousTime) => previousTime - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timerRunning, timeLeft]);
if (timerMode) {
  const chooseTime = (minutes) => {
    const totalSeconds = minutes * 60;

    setSelectedTime(totalSeconds);
    setTimeLeft(totalSeconds);
    setTimerRunning(false);
  };

  const changeDuration = () => {
    setTimerRunning(false);
    setSelectedTime(null);
  };

  if (selectedTime === null) {
    return (
      <div className="timer-page">
        <button
          className="back-button"
          onClick={() => setTimerMode(false)}
        >
          ← Back to {selectedSubject}
        </button>

        <div className="timer-heading">
          <p>FOCUS SESSION</p>
          <h1>{selectedSubject}</h1>
          <span>How long do you want to focus?</span>
        </div>

        <div className="duration-options">
          <button onClick={() => chooseTime(25)}>
            <strong>25</strong>
            <span>minutes</span>
            <small>Quick focus</small>
          </button>

          <button onClick={() => chooseTime(45)}>
            <strong>45</strong>
            <span>minutes</span>
            <small>Deep focus</small>
          </button>

          <button onClick={() => chooseTime(60)}>
            <strong>60</strong>
            <span>minutes</span>
            <small>Long session</small>
          </button>
        </div>
        <div className="custom-time">
  <p>Or choose your own time</p>

  <div className="custom-time-input">
    <input
      type="number"
      min="1"
      max="720"
      placeholder="Minutes"
      value={customMinutes}
      onChange={(event) => setCustomMinutes(event.target.value)}
    />

    <button
      onClick={() => {
        const minutes = Number(customMinutes);

        if (minutes > 0 && minutes <= 720) {
          chooseTime(minutes);
        }
      }}
    >
      Start custom session
    </button>
  </div>
</div>
      </div>
    );
  }

 const hours = Math.floor(timeLeft / 3600);
const minutes = Math.floor((timeLeft % 3600) / 60);
const seconds = timeLeft % 60;
const timerProgress = (selectedTime - timeLeft) / selectedTime;
const handRotation = timerProgress * 360;

  return (
    <div className="timer-page">
      <button
        className="back-button"
        onClick={changeDuration}
      >
        ← Change duration
      </button>

      <div className="timer-heading">
        <p>FOCUS SESSION</p>
        <h1>{selectedSubject}</h1>
        <span>Lock in. One session at a time.</span>
      </div>

      <div className="clock">
        <div className="clock-inner">
          <div
  className="clock-hand"
  style={{
    transform: `translate(-50%, -100%) rotate(${handRotation}deg)`
  }}
></div>
          <div className="clock-centre"></div>

          <div className="digital-display">
            <strong>
              {hours > 0
  ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  : `${minutes}:${seconds.toString().padStart(2, '0')}`}
            </strong>
            <span>{selectedSubject}</span>
          </div>
        </div>
      </div>

      <div className="timer-controls">
        <button onClick={() => setTimerRunning(!timerRunning)}>
          {timerRunning ? 'Pause' : 'Start'}
        </button>

        <button
          onClick={() => {
            setTimerRunning(false);
            setTimeLeft(selectedTime);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
if (studyMode) {
  return (
  <div className="study-page">
  <button
  className="back-button"
  onClick={() => setStudyMode(false)}
>
  ← Back to dashboard
</button>
<div className="study-header">
  <p className="study-header">STUDY SESSION</p>
  <h1>{selectedSubject}</h1>
  <p>What do you want to work on?</p>
</div>

<div className="study-options">
  <button>Review notes</button>
  <button>Practice questions</button>
  <button onClick={() => setTimerMode(true)}>
  Start focus timer
</button>
  </div>
  </div>
); 
}
  return (
    <div className="App">
      <header className="topbar">
        <div className="brand">Focus.</div>
        <nav className="nav-links">
          <button className="nav-active">Dashboard</button>
          <button>Calendar</button>
          <button>Study</button>
          </nav>
          <button className="settings-button">⚙</button>
          </header>
      <h1>Study Dashboard</h1>
      <p>Everything you need to stay on top of school</p>

      <h2>My Subjects</h2>
      <div className="subjects-grid">
      

      <div
  className={`subject-card ${selectedSubject === 'Chemistry' ? 'selected' : ''}`}
  onClick={() => setSelectedSubject('Chemistry')}
>
        <h3>Chemistry</h3>
        <p>0 tasks remaining</p>
        </div>

       <div
  className={`subject-card ${selectedSubject === 'Mathematics' ? 'selected' : ''}`}
  onClick={() => setSelectedSubject('Mathematics')}
>
          <h3>Mathematics</h3>
          <p>0 tasks remaining</p>
          </div>

         <div
  className={`subject-card ${selectedSubject === 'English' ? 'selected' : ''}`}
  onClick={() => setSelectedSubject('English')}
>
            <h3>English</h3>
            <p>0 tasks remaining</p>
            </div>
            </div>
            <h2 className="today-title">Today</h2>
            <div className="today-panel">
              <h3>Nothing due today🎉</h3>
              <p>You're all caught up. Pick a subject to get ahead.</p>
              <button
  disabled={!selectedSubject}
  onClick={() => setStudyMode(true)}
>
  {selectedSubject
    ? `Start ${selectedSubject} session`
    : 'Select a subject first'}
</button>
            </div>
            </div>            
  );
}

export default App;