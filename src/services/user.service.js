//imports
import axios from 'axios'
import { storageService } from './storage.service'
//exports
export default {
  getLoggedInUser,
  signup,
  addMove,
}
//keys
const USER_KEY = 'user'
const LOGGED_IN_USER_KEY = 'loggedInUser'
//cache
var gUsers = storageService.loadFromStorage(USER_KEY)

var gLoggedInUser = storageService.loadFromStorage(LOGGED_IN_USER_KEY) || null
loadUsers()

function loadUsers() {
  console.log('Gusers loadusers1:', gUsers)
  if (!gUsers || !gUsers.length) {
    const users = [
      {
        name: 'Sagi K',
        coins: 100,
        moves: [
          {
            toId: '5a56640269f443a5d64b32ca',
            to: 'Ochoa Hyde',
            at: 1650301835052,
            amount: 3,
          },
          {
            toId: '5a5664025f6ae9aa24a99fde',
            to: 'Hallie Mclean',
            at: 1650301845052,
            amount: 10,
          },
          {
            toId: '5a56640252d6acddd183d319',
            to: 'Parsons Norris',
            at: 1650308835052,
            amount: 2,
          },
        ],
      },
    ]
    storageService.saveToStorage(USER_KEY, users)
  }
  console.log('Gusers loadusers2:', gUsers)
}

function getLoggedInUser() {
  return gLoggedInUser
}
function signup(userName) {
  console.log('username userService:', userName)
  console.log('Gusers userService:', gUsers)
  var user = gUsers.find((user) => user.name === userName)
  if (!user) {
    user = {
      name: userName,
      coins: 100,
      moves: [],
    }
    gUsers.push(user)
    storageService.saveToStorage(USER_KEY, gUsers)
  }
  gLoggedInUser = user
  storageService.saveToStorage(LOGGED_IN_USER_KEY, gLoggedInUser)
}

function addMove(contact, {amount}) {
  console.log('amount from addMove',amount)
  const move = {
    toId: contact._id,
    to: contact.name,
    at: Date.now(),
    amount,
  }
  gLoggedInUser.coins -= amount
  gLoggedInUser.moves.push(move)

  const idx = gUsers.findIndex((u) => u.name === gLoggedInUser.name)
  gUsers[idx] = gLoggedInUser

  storageService.saveToStorage(USER_KEY, gUsers)
  storageService.saveToStorage(LOGGED_IN_USER_KEY, gLoggedInUser)
}
