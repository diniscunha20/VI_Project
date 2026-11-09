import type { IncomingMessage, ServerResponse } from 'node:http'
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import type { Catalog, EventGame, Recommendation } from '../src/catalog.ts'

const databasePath = fileURLToPath(new URL('../../data/database.sqlite', import.meta.url))
const pollColumns = Array.from({ length: 8 }, (_, index) => {
  const players = index + 1
  return `"polls.suggested_numplayers.${players}" AS poll${players}`
}).join(', ')

const commonColumns = `
  "game.id" AS id,
  "details.name" AS name,
  "details.playingtime" AS minutes,
  "stats.averageweight" AS weight,
  "stats.bayesaverage" AS rating
`

function readCatalog(): Catalog {
  const db = new DatabaseSync(databasePath, { readOnly: true })
  try {
    const rows = db.prepare(`
      SELECT ${commonColumns}, "attributes.boardgamecategory" AS theme, ${pollColumns}
      FROM BoardGames
      WHERE "game.type" = 'boardgame'
        AND instr(',' || "attributes.boardgamecategory" || ',', ',Horror,') > 0
        AND "stats.usersrated" >= 30
        AND "details.minplayers" BETWEEN 1 AND 8 AND "details.maxplayers" >= 4
        AND "details.maxplayers" >= "details.minplayers"
        AND "details.playingtime" > 0
        AND "stats.averageweight" BETWEEN 1 AND 5
        AND "stats.bayesaverage" > 0
      ORDER BY rating DESC, name, id
    `).all() as (Omit<EventGame, 'recommendations'> & Record<string, unknown>)[]
    const eventGames = rows.map(row => ({
      id: row.id, name: row.name, theme: row.theme, minutes: row.minutes, weight: row.weight, rating: row.rating,
      recommendations: Array.from({ length: 8 }, (_, index): Recommendation => {
        const value = row[`poll${index + 1}`]
        return value === 'Best' || value === 'Recommended' || value === 'NotRecommended' ? value : null
      }),
    }))

    const profiles = db.prepare(`
      SELECT ${commonColumns}, "details.minage" AS age,
        "details.minplayers" AS minPlayers, "details.maxplayers" AS maxPlayers
      FROM BoardGames
      WHERE "game.type" = 'boardgame'
        AND "details.minplayers" > 0 AND "details.maxplayers" >= "details.minplayers"
        AND "details.minage" > 0 AND "details.playingtime" > 0
        AND "stats.averageweight" BETWEEN 1 AND 5 AND "stats.bayesaverage" > 0
      ORDER BY "stats.usersrated" DESC, name, id
      LIMIT 50
    `).all() as { id: string; name: string; minutes: number; weight: number; rating: number; age: number; minPlayers: number; maxPlayers: number }[]

    return {
      eventGames,
      profiles: profiles.map(game => ({
        id: game.id,
        name: game.name,
        values: [game.minutes, game.weight, game.age, game.rating, game.maxPlayers],
        players: game.minPlayers === game.maxPlayers ? String(game.maxPlayers) : `${game.minPlayers}–${game.maxPlayers}`,
      })),
    }
  } finally {
    db.close()
  }
}

function serveCatalog(req: IncomingMessage, res: ServerResponse, next: () => void) {
  if (req.url?.split('?')[0] !== '/api/catalog') return next()
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Allow', 'GET')
    return res.end(JSON.stringify({ error: 'Método não permitido.' }))
  }

  try {
    res.end(JSON.stringify(readCatalog()))
  } catch (error) {
    console.error('Falha ao consultar o catálogo SQLite:', error)
    res.statusCode = 503
    res.end(JSON.stringify({ error: 'Não foi possível ler o catálogo SQLite.' }))
  }
}

export function catalogApi(): Plugin {
  return {
    name: 'sqlite-catalog',
    configureServer(server) {
      server.middlewares.use(serveCatalog)
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveCatalog)
    },
  }
}
