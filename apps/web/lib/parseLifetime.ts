export function getPercentage(startDate: Date, endDate: Date) {
  const today = new Date().valueOf(),
    start = new Date(startDate).valueOf(),
    end = new Date(endDate).valueOf()

  var q = Math.abs(today - start)
  var d = Math.abs(end - start)

  return Math.max(100 - Math.round((q / d) * 100), 0)
}
