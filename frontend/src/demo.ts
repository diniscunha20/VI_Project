export const games = [
  { name: 'The Resistance: Avalon', theme: 'Bluffing · Deduction', best: 7, minutes: 30, weight: 1.8, rating: 7.6, votes: [null, null, null, null, 35, 55, 70, 62] },
  { name: 'Coup', theme: 'Bluffing', best: 5, minutes: 15, weight: 1.4, rating: 7.1, votes: [null, 5, 30, 55, 60, 40, null, null] },
  { name: 'Mysterium', theme: 'Deduction · Horror', best: 5, minutes: 45, weight: 1.9, rating: 7, votes: [null, 5, 20, 45, 62, 55, 30, null] },
  { name: 'One Night Ultimate Werewolf', theme: 'Bluffing · Deduction', best: 6, minutes: 10, weight: 1.2, rating: 6.9, votes: [null, null, 10, 30, 55, 65, 62, 55] },
  { name: 'Betrayal at House on the Hill', theme: 'Horror · Adventure', best: 5, minutes: 60, weight: 2.4, rating: 6.9, votes: [null, null, 15, 45, 65, 55, null, null] },
  { name: 'Zombicide', theme: 'Zombies · Horror', best: 4, minutes: 60, weight: 2.5, rating: 6.8, votes: [null, 10, 25, 60, 40, 25, null, null] },
  { name: 'Ultimate Werewolf', theme: 'Bluffing · Deduction', best: 8, minutes: 30, weight: 1.3, rating: 6.7, votes: [null, null, null, null, 10, 30, 40, 68] },
  { name: 'Mascarade', theme: 'Bluffing', best: 7, minutes: 30, weight: 1.5, rating: 6.6, votes: [null, 0, 5, 20, 45, 60, 62, 58] },
]

const durationCounts = [52, 32, 20, 28, 12, 6, 6]
const extraGames = durationCounts.flatMap((count, group) => {
  const existing = games.filter(game => Math.floor(game.minutes / 30) === group).length
  return Array.from({ length: count - existing }, (_, index) => ({
    name: `Jogo de demonstração ${group + 1}.${index + 1}`,
    minutes: group * 30 + 5 + (index * 7) % 25,
    weight: Math.round((1.1 + ((index * 17 + group * 29) % 360) / 100) * 10) / 10,
    rating: 5.6 + ((index * 13 + group * 37) % 160) / 100,
  }))
})

export const eventGames = [...games, ...extraGames]

export const similar = [
  { name: 'Carcassonne', values: [40, 1.9, 8, 7.4, 5], players: '2–5' },
  { name: 'Kingdomino', values: [15, 1.2, 8, 7.3, 4], players: '2–4' },
  { name: 'Takenoko', values: [45, 1.9, 8, 7.2, 4], players: '2–4' },
  { name: 'Azul', values: [45, 1.8, 8, 7.7, 4], players: '2–4' },
]
