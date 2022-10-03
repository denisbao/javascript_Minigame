const ATTACK_VALUE = 10
const STRONG_ATTACK_VALUE = 17
const MONSTER_ATTACK_VALUE = 15
const HEAL_VALUE = 20

const MODE_ATTACK = 'ATTACK'
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK'
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK'
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK'
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL'
const LOG_EVENT_GAME_OVER = 'GAME_OVER'

function getMaxLifeValues() {
  const enteredValue = prompt('Maximum life for you and the monster:', '100')
  const parseValue = parseInt(enteredValue)
  if (isNaN(parseValue) || parseValue <= 10) {
    throw { message: 'Invalid user input, not a number!' }
  }
  return parseValue
}

let chosenMaxLife

try {
  chosenMaxLife = getMaxLifeValues()
} catch (error) {
  console.log(error)
  chosenMaxLife = 100
  alert('You entered something wrong, defaul life was defined as 100.')
}

let currentMonsterHealth = chosenMaxLife
let currentPlayerHealth = chosenMaxLife
let hasBonusLife = true
let battleLog = []

adjustHealthBars(chosenMaxLife)

function writeToLog(event, value, monsterHealth, playerHealth) {
  logEntry = {
    event,
    value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  }

  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'Monster'
      break

    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = 'Monster'
      break

    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = 'Player'
      break

    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = 'Player'
      break

    default:
      logEntry = {}
  }

  battleLog.push(logEntry)
}

function reset() {
  currentMonsterHealth = chosenMaxLife
  currentPlayerHealth = chosenMaxLife
  resetGame(chosenMaxLife)
}

function endRound() {
  const initialPlayerHealt = currentPlayerHealth

  //moster attack
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
  currentPlayerHealth -= playerDamage

  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  )

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false
    removeBonusLife()
    currentPlayerHealth = initialPlayerHealt
    alert('Dead already? Alright... use this suspicious drug and try again.')
  }

  //check for game end
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('The monster is dead! You are victorious!')
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'The player won the battle',
      currentMonsterHealth,
      currentPlayerHealth
    )
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You are dead. Pathetic...')
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'The Monster won the battle',
      currentMonsterHealth,
      currentPlayerHealth
    )
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('The monster is dead... and you to! Your bravery will be remembered.')
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'Draw',
      currentMonsterHealth,
      currentPlayerHealth
    )
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset()
  }
}

function attackHandler() {
  attackMonster(MODE_ATTACK)
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK)
}

function attackMonster(attackMode) {
  const maxDamage =
    attackMode === ATTACK_VALUE ? ATTACK_VALUE : STRONG_ATTACK_VALUE

  let logEventType =
    attackMode === ATTACK_VALUE
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK

  //player attack
  const damage = dealMonsterDamage(maxDamage)
  currentMonsterHealth -= damage

  writeToLog(logEventType, damage, currentMonsterHealth, currentPlayerHealth)

  endRound()
}

function healPlayerHandler() {
  let healValue
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert('You already have enought healt, you weak bastard...')
    healValue = chosenMaxLife - currentPlayerHealth
  } else {
    healValue = HEAL_VALUE
  }
  increasePlayerHealth(healValue)
  currentPlayerHealth += healValue

  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  )

  endRound()
}

function printLogHandler() {
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i])
  // }

  // for (const logEntry of battleLog) {
  //   console.log(logEntry)
  // }

  let i = 1
  for (const logEntry of battleLog) {
    console.log(`Log entry: ${i} ---------------------------------------------`)
    for (const key in logEntry) {
      console.log(`${key}: ${logEntry[key]}`)
    }
    i++
  }
}

attackBtn.addEventListener('click', attackHandler)
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler)
logBtn.addEventListener('click', printLogHandler)
