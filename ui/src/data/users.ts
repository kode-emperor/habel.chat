import { v4 as uuidv4 } from 'uuid';


const mstart = new Date(2024, 0, 1)
const mend = new Date()

function randomDate(start:Date = mstart, end:Date = mend) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function randomTimeString() {
  const d = randomDate();
  const h = d.getHours();
  const m = d.getMinutes();
  return `${h}:${m < 10 ? '00' : m}`
}

export const  users = [
  {
    id: uuidv4(),
    message: "I am the Way, the Truth, and the Life. No one comes to the Father except through me.",
    time: randomTimeString()
  },
  {
    id: uuidv4(),
    message: "As the Father has loved me, so have I loved you.",
    time: randomTimeString()
  },
  {
    id: uuidv4(),
    message: "For what shall it profit a man, if he gain the whole world, and suffer the loss of his soul?",
    time: randomTimeString()
  }
]