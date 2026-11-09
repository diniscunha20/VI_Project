import { useState } from 'react'
import { EventControls } from './components/EventControls'
import { ComplexityPage } from './pages/ComplexityPage'
import { DurationPage } from './pages/DurationPage'
import { OverviewPage } from './pages/OverviewPage'
import { PlayersPage } from './pages/PlayersPage'
import { SimilarPage } from './pages/SimilarPage'
import { eventGames, games, similar } from './demo'
import './App.css'

const sections = [
  { label: 'Planear evento', views: [
    { id: 'overview', title: 'Visão geral', description: 'O que pôr nas mesas na noite de Halloween?' },
    { id: 'duration', title: 'Duração dos jogos', description: 'Que formato de noite faz sentido no Halloween?' },
    { id: 'scatter', title: 'Complexidade × nota', description: 'Que jogos são leves e bem avaliados?' },
    { id: 'players', title: 'Jogadores ideais', description: 'Com quantos jogadores funciona cada jogo da lista curta?' },
  ] },
  { label: 'Balcão', views: [
    { id: 'similar', title: 'Parecidos com…', description: 'Que alternativa sugerir a quem gostou de um jogo?' },
  ] },
]

function App() {
  const [page, setPage] = useState('overview')
  const [minutes, setMinutes] = useState(60)
  const [weight, setWeight] = useState(2.5)
  const [showAll, setShowAll] = useState(false)
  const [reference, setReference] = useState(similar[0].name)
  const [comparisonCount, setComparisonCount] = useState(2)

  const section = sections.find(group => group.views.some(view => view.id === page)) ?? sections[0]
  const view = section.views.find(view => view.id === page) ?? sections[0].views[0]
  const eventView = section === sections[0]
  const fits = (game: { minutes: number; weight: number }) => game.minutes <= minutes && game.weight <= weight
  const shortlist = games.filter(fits)

  return <>
    <header className="topbar">
      <div className="brand"><span className="mark">L</span><div>LUDOTECA<small>CARLOS MENDES</small></div></div>
      <span className="top-label">Board Game Insights</span>
      <span className="location">Loja-café · Coimbra</span>
      <span className="initials">CM</span>
    </header>
    <div className="layout">
      <aside className="sidebar">
        <nav aria-label="Vistas da ludoteca">
          {sections.map(group => <div className="nav-group" key={group.label}>
            <p className="eyebrow">{group.label}</p>
            {group.views.map(item => <button key={item.id} aria-current={item.id === page ? 'page' : undefined} onClick={() => setPage(item.id)}>
              {item.title}
            </button>)}
          </div>)}
        </nav>
        <small className="sidebar-note">Dados ilustrativos · projeto académico</small>
      </aside>
      <main>
        <div className="page-header">
          <div><h1>{view.title}</h1><p>{view.description}</p></div>
          <span className="eyebrow tag">{eventView ? 'Planear evento · Halloween' : section.label}</span>
        </div>
        {eventView && <EventControls minutes={minutes} weight={weight}
          onMinutesChange={setMinutes} onWeightChange={setWeight} />}
        {page === 'overview' && <OverviewPage shortlist={shortlist} matchingCount={eventGames.filter(fits).length} />}
        {page === 'duration' && <DurationPage minutes={minutes} />}
        {page === 'scatter' && <ComplexityPage minutes={minutes} weight={weight} />}
        {page === 'players' && <PlayersPage shortlist={shortlist} showAll={showAll} onToggle={() => setShowAll(value => !value)} />}
        {page === 'similar' && <SimilarPage reference={reference} count={comparisonCount}
          onReferenceChange={setReference} onCountChange={setComparisonCount} />}
      </main>
    </div>
  </>
}

export default App
