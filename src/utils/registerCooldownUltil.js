
//usado para setar valores de cooldown para que não seja espamado ações como cadastro de usuário

const COOLDOWN_KEY = 'registerCooldownUntil'
const COOLDOWN_MS = 30 * 60 * 1000

export function isRegisterBlocked() {
  const until = Number(localStorage.getItem(COOLDOWN_KEY) || 0)
  return Date.now() < until
}

export function setRegisterCooldown() {
  localStorage.setItem(
    COOLDOWN_KEY,
    String(Date.now() + COOLDOWN_MS)
  )
}

// export function getRemainingMinutes() {
//   const until = Number(localStorage.getItem(COOLDOWN_KEY) || 0)
//   const diff = until - Date.now()
//   return diff > 0 ? Math.ceil(diff / 60000) : 0
// }

// export function clearRegisterCooldownIfExpired() {
//   const until = Number(localStorage.getItem(COOLDOWN_KEY) || 0)
//   if (until && Date.now() >= until) {
//     localStorage.removeItem(COOLDOWN_KEY)
//   }
// }