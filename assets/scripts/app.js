const ATTACK_VALUE = 10 //maximum value possible
const STRONG_ATTACK_VALUE = 17 //maximum value possible
const MONSTER_ATTACK_VALUE = 15 //maximum value possible

let chosenMaxLife = 100
let currentMonsterHealth = chosenMaxLife
let currentPlayerHealth = chosenMaxLife

adjustHealthBars(chosenMaxLife)

function attackHandler() {
  attackMonster('ATTACK')
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK')
}

function attackMonster(attackMode) {
  let maxDamage

  if (attackMode === 'ATTACK') {
    maxDamage = ATTACK_VALUE
  } else {
    maxDamage = STRONG_ATTACK_VALUE
  }

  //player attack
  const damage = dealMonsterDamage(maxDamage)
  currentMonsterHealth -= damage

  //moster attack
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE)
  currentPlayerHealth -= playerDamage

  //check for game end
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('The monster is dead! You are victorious!')
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You are dead. Pathetic...')
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('The monster is dead... and you to! Your bravery will be remembered.')
  }
}

attackBtn.addEventListener('click', attackHandler)
strongAttackBtn.addEventListener('click', strongAttackHandler)
