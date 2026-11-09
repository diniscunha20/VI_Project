import { useEffect, useState } from 'react'
import { EventControls } from './components/EventControls'
import { ComplexityPage } from './pages/ComplexityPage'
import { DurationPage } from './pages/DurationPage'
import { OverviewPage } from './pages/OverviewPage'
import { PlayersPage } from './pages/PlayersPage'
import { SimilarPage } from './pages/SimilarPage'
import type { Catalog } from './catalog'
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

function Dashboard({ eventGames, profiles }: Catalog) {
  const [page, setPage] = useState('overview')
  const [minutes, setMinutes] = useState(60)
  const [weight, setWeight] = useState(2.5)
  const [showAll, setShowAll] = useState(false)
  const [reference, setReference] = useState(profiles.find(game => game.name === 'Carcassonne')?.id ?? profiles[0]?.id ?? '')
  const [comparisonCount, setComparisonCount] = useState(2)

  const section = sections.find(group => group.views.some(view => view.id === page)) ?? sections[0]
  const view = section.views.find(view => view.id === page) ?? sections[0].views[0]
  const eventView = section === sections[0]
  const fits = (game: { minutes: number; weight: number }) => game.minutes <= minutes && game.weight <= weight
  const matchingGames = eventGames.filter(fits)
  const shortlist = matchingGames.slice(0, 8)

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
        <small className="sidebar-note">Catálogo BoardGameGeek · projeto académico</small>
      </aside>
      <main>
        <div className="page-header">
          <div><h1>{view.title}</h1><p>{view.description}</p></div>
          <span className="eyebrow tag">{eventView ? 'Planear evento · Halloween' : section.label}</span>
        </div>
        {eventView && <EventControls minutes={minutes} weight={weight}
          onMinutesChange={setMinutes} onWeightChange={setWeight} />}
        {page === 'overview' && <OverviewPage shortlist={shortlist} matchingCount={matchingGames.length} totalCount={eventGames.length} />}
        {page === 'duration' && <DurationPage games={eventGames} minutes={minutes} />}
        {page === 'scatter' && <ComplexityPage games={eventGames} minutes={minutes} weight={weight} />}
        {page === 'players' && <PlayersPage shortlist={shortlist} showAll={showAll} onToggle={() => setShowAll(value => !value)} />}
        {page === 'similar' && <SimilarPage profiles={profiles} reference={reference} count={comparisonCount}
          onReferenceChange={setReference} onCountChange={setComparisonCount} />}
      </main>
    </div>
  </>
}

export default function App() {
  const [catalog, setCatalog] = useState<Catalog>()
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    async function loadCatalog() {
      try {
        const response = await fetch('/api/catalog', { signal: controller.signal })
        if (!response.ok) throw new Error('Falha ao carregar o catálogo')
        setCatalog(await response.json() as Catalog)
      } catch {
        if (!controller.signal.aborted) setError(true)
      }
    }
    void loadCatalog()
    return () => controller.abort()
  }, [])

  if (error) return <main role="alert">Não foi possível carregar o catálogo. Confirma que o ficheiro data/database.sqlite está disponível e recarrega a página.</main>
  if (!catalog) return <main role="status">A carregar o catálogo…</main>
  return <Dashboard {...catalog} />
}
