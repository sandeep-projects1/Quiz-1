import React, { useState } from 'react';
import './index.css';
import { teams, revealDelayMs } from './config';

import { questions, categoryNames as baseCategoryNames } from './FRIENDS2';
const categoryNames = { ...baseCategoryNames };
Object.keys(questions).forEach((key) => {
  const match = key.match(/^Category (\d+)-/);
  if (match) {
    const cat = parseInt(match[1]);
    if (!categoryNames[cat]) {
      categoryNames[cat] = `Category ${cat}`;
    }
  }
});

const categories = Array.from({ length: 8 }, (_, i) => i + 1);

// Dynamically map category to its available point values
const categoryPointsMap = {};
Object.keys(questions).forEach((key) => {
  const match = key.match(/^Category (\d+)-(\d+)$/);
  if (match) {
    const cat = parseInt(match[1]);
    const pt = parseInt(match[2]);
    if (!categoryPointsMap[cat]) categoryPointsMap[cat] = new Set();
    categoryPointsMap[cat].add(pt);
  }
});

// Ensure all categories from questions have a name
Object.keys(questions).forEach((key) => {
  const match = key.match(/^Category (\\d+)-/);
  if (match) {
    const cat = parseInt(match[1]);
    if (!categoryNames[cat]) {
      categoryNames[cat] = `Category ${cat}`;
    }
  }
});

const quizTheme = {
  title: '🎬 FRIENDS Quiz',
  useCurtain: true,
};

function App() {
  const theme = quizTheme;

  const [scores, setScores] = useState(() =>
    teams.reduce((acc, t) => ({ ...acc, [t]: 0 }), {})
  );
  const [usedQuestions, setUsedQuestions] = useState({});
  const [current, setCurrent] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [pendingScores, setPendingScores] = useState({});
  const [revealDelay, setRevealDelay] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const totalQuestions = Object.keys(questions).length;
  const answeredCount = Object.keys(usedQuestions).length;

  const totalPointsLeft = Object.keys(questions).reduce((sum, key) => {
    const match = key.match(/^Category (\d+)-(\d+)$/);
    if (match && !usedQuestions[key]) {
      return sum + parseInt(match[2]);
    }
    return sum;
  }, 0);

  const handleClick = (cat, pt) => {
    const key = `Category ${cat}-${pt}`;
    const q = questions[key] || {
      q: 'Your custom question',
      a: 'Your custom answer',
    };
    setCurrent({ key, cat, pt, ...q });
    setShowQuestion(false);
    setRevealDelay(false);
    setPendingScores({});
    setShowAnswer(false);
  };

  const markUsed = (awardSummary) => {
    const awardedPoints = Object.values(awardSummary).reduce(
      (sum, val) => sum + (val || 0),
      0
    );
    setUsedQuestions((prev) => ({
      ...prev,
      [current.key]: { ...awardSummary, awardedPoints },
    }));
    setScores((prev) => {
      const updated = { ...prev };
      teams.forEach((t) => {
        updated[t] = (prev[t] || 0) + (awardSummary[t] || 0);
      });
      return updated;
    });
    setCurrent(null);
    setShowQuestion(false);
    setRevealDelay(false);
    setShowAnswer(false);
  };

  const revealWithDelay = () => {
    setRevealDelay(true);
    setTimeout(() => setShowQuestion(true), revealDelayMs);
  };

  const goFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  return (
    <>
      {theme.useCurtain && (
        <div className="curtains">
          <div className="curtain curtain-left" />
          <div className="curtain curtain-right" />
        </div>
      )}

      <div className={`app ${theme.themeClass}`}>
        <button onClick={goFullscreen} className="fullscreen-button">
          📺
        </button>

        {!current && (
          <>
            <header className="header">
              <h1 className="title">{theme.title}</h1>
              <p className="subtitle">
                Questions Left: {totalQuestions - answeredCount} /{' '}
                {totalQuestions} •  Points Remaining: {totalPointsLeft}
              </p>
            </header>

            <div className="scoreboard">
              {teams.map((t) => (
                <div key={t} className="score-box">
                  <h3>{t}</h3>
                  <p>{scores[t]}</p>
                </div>
              ))}
            </div>

            <div className="board">
              {categories.map((catId, i) => {
                const pointList = Array.from(
                  categoryPointsMap[catId] || []
                ).sort((a, b) => a - b);
                const fullName = categoryNames[catId] || `Category ${catId}`;

                return (
                  <div key={catId} className={`column col-${i}`}>
                    <div className="cat-title" data-fullname={fullName}>
                      {fullName}
                    </div>
                    <div className="question-list">
                      {pointList.map((pt) => {
                        const key = `Category ${catId}-${pt}`;
                        const used = usedQuestions[key];
                        return (
                          <button
                            key={pt}
                            className="cell"
                            disabled={!!used}
                            onClick={() => handleClick(catId, pt)}
                          >
                            {used
                              ? `✔ ${Object.entries(used)
                                  .filter(
                                    ([k, v]) => k !== 'awardedPoints' && v !== 0
                                  )
                                  .map(
                                    ([t, v]) => `${t} ${v > 0 ? '+' : ''}${v}`
                                  )
                                  .join(', ')}`
                              : pt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {current && (
          <div className="modal">
            <h2>
              {categoryNames[current.cat] || `Category ${current.cat}`} –{' '}
              {current.pt} points
            </h2>

            {!showQuestion ? (
              <>
                {!revealDelay ? (
                  <button onClick={revealWithDelay} className="reveal-button">
                    🎤 Reveal Question
                  </button>
                ) : (
                  <p>🎬 Get ready...</p>
                )}
                <br />
                <button onClick={() => setCurrent(null)} className="back-home">
                  ← Back to Home
                </button>
              </>
            ) : (
              <>
                {current.q?.includes('<img') ? (
                  <div dangerouslySetInnerHTML={{ __html: current.q }} />
                ) : (
                  <div
                    className="text-question"
                    dangerouslySetInnerHTML={{ __html: current.q }}
                  />
                )}

                {!showAnswer && (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="reveal-answer-button"
                  >
                    👀 Reveal Answer
                  </button>
                )}

                {showAnswer && (
                  <>
                    <p className="answer">
                      Answer:&nbsp;
                      {current.a?.includes('<br') ? (
                        <span dangerouslySetInnerHTML={{ __html: current.a }} />
                      ) : (
                        current.a
                      )}
                    </p>

                    <div className="score-container">
                      <div className="score-left">
                        <div className="score-options">
                          {teams.map((t) => (
                            <React.Fragment key={t}>
                              <button
                                className={`award ${
                                  pendingScores[t] > 0 ? 'active' : ''
                                }`}
                                onClick={() =>
                                  setPendingScores((prev) => ({
                                    ...prev,
                                    [t]: current.pt,
                                  }))
                                }
                              >
                                {t} +{current.pt}
                              </button>
                              <button
                                className={`deduct ${
                                  pendingScores[t] < 0 ? 'active' : ''
                                }`}
                                onClick={() =>
                                  setPendingScores((prev) => ({
                                    ...prev,
                                    [t]: -current.pt,
                                  }))
                                }
                              >
                                {t} –{current.pt}
                              </button>
                            </React.Fragment>
                          ))}
                        </div>

                        <div className="custom-points">
                          {teams.map((t) => (
                            <div key={t} className="custom-row">
                              <label>{t}</label>
                              <input
                                type="number"
                                className="custom-input"
                                placeholder="+/- pts"
                                onChange={(e) =>
                                  setPendingScores((prev) => ({
                                    ...prev,
                                    [t]: parseInt(e.target.value) || 0,
                                  }))
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="score-right">
                        <p>Scoring Summary:</p>
                        <ul>
                          {teams.map(
                            (t) =>
                              pendingScores[t] !== undefined && (
                                <li key={t}>
                                  {t}: {pendingScores[t] > 0 ? '+' : ''}
                                  {pendingScores[t]} pts
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    </div>

                    <button
                      className="custom"
                      onClick={() => markUsed(pendingScores)}
                    >
                      Confirm & Return
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
