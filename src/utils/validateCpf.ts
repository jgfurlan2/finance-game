export default function validateCPF(strCPF: string): boolean {
  const normalizedCPF = strCPF.replace('.', '').replace('-', '').trim()
  let sum = 0
  let rest = 0

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(normalizedCPF.substring(i - 1, i), 10) * (11 - i)
  }

  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) {
    rest = 0
  }
  if (rest !== parseInt(normalizedCPF.substring(9, 10), 10)) {
    return false
  }

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(normalizedCPF.substring(i - 1, i), 10) * (12 - i)
  }

  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(normalizedCPF.substring(10, 11), 10)) {
    return false
  }

  return true
}
