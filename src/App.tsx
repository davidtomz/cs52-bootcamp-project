import { useMutation, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import './App.css'

function App() {
  const apiAny = api as any
  const score = useQuery(apiAny.happiness.getScore)
  const vote = useMutation(apiAny.happiness.vote)
  const isLoading = score === undefined
  const displayScore = score ?? 0
  const moodLabel =
    displayScore >= 8
      ? 'Radiant'
      : displayScore >= 4
        ? 'Happy'
        : displayScore >= 1
          ? 'Brightening'
          : displayScore === 0
            ? 'Neutral'
            : displayScore >= -3
              ? 'Wobbly'
              : 'Stormy'

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">Community Pulse</p>
        <h1>How are we feeling today?</h1>
        <p className="subtitle">
          Tap a mood to nudge the shared happiness score up or down.
        </p>
      </header>

      <section className="scorecard">
        <div className="score">
          <span className="label">Overall happiness rating</span>
          <div className="value">{isLoading ? 'Loading…' : displayScore}</div>
          <span className="mood">{moodLabel}</span>
        </div>
        <div className="meter" aria-hidden="true">
          <span
            style={{
              transform: `translateX(${Math.min(
                46,
                Math.max(-46, displayScore * 6),
              )}px)`,
            }}
          />
        </div>
      </section>

      <section className="actions">
        <button
          className="mood-button happy"
          onClick={() => vote({ delta: 1 })}
          aria-label="Vote happy"
        >
          Happy
        </button>
        <button
          className="mood-button sad"
          onClick={() => vote({ delta: -1 })}
          aria-label="Vote sad"
        >
          Sad
        </button>
      </section>
    </main>
  )
}

export default App
