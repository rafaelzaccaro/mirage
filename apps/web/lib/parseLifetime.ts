export function getPercentage(startDate: Date, endDate: Date) {
  const today = new Date().valueOf(),
    start = new Date(startDate).valueOf(),
    end = new Date(endDate).valueOf()

  var q = Math.abs(today - start)
  var d = Math.abs(end - start)

  return Math.max(100 - Math.round((q / d) * 100), 0)
}

export function getRemainingDuration(lifetime: Date) {
  const diff = new Date(lifetime).getTime() - new Date().getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)).toString()
  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  ).toString()
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString()
  const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString()

  return (
    (days.length < 2 ? '0' + days : days) +
    'd ' +
    (hours.length < 2 ? '0' + hours : hours) +
    'h ' +
    (minutes.length < 2 ? '0' + minutes : minutes) +
    'm ' +
    (seconds.length < 2 ? '0' + seconds : seconds) +
    's '
  )
}
