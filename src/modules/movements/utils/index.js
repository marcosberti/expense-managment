const getMovementsMonth = location => {
  let year
  let month
  if (location.search) {
    ;[year, month] = location.search.split('=')[1].split('-')
    year = Number(year)
    month = Number(month) - 1
  }
  const date = new Date()
  year = year ?? date.getFullYear()
  month = month ?? date.getMonth()
  return {
    begin: new Date(year, month, 1).getTime(),
    end: new Date(year, month + 1, 0).getTime(),
  }
}

const filterMovements = (movements, {begin, end}) =>
  movements
    .filter(({date}) => date >= begin && date <= end)
    .sort((a, b) => (a.date > b.date ? -1 : 1))

const getPendingExpenses = (filteredMovs, payments, fixed, time) => {
  const pending = []
  const movRef = filteredMovs.filter(m => m.expenseRef).map(m => m.expenseRef)
  payments
    .filter(
      p =>
        !movRef.includes(p.id) &&
        time.end >= p.firstPaymentDate &&
        time.end <= p.lastPaymentDate
    )
    .forEach(
      ({id, details, currency, paymentAmount, categories, payments, paids}) =>
        pending.push({
          details: `${details} (${
            paids.filter(p => p).length + 1
          }/${payments})`,
          currency,
          categories,
          amount: paymentAmount,
          expenseRef: id,
          type: 'spent',
          spentType: 'payments',
          status: 'pending',
        })
    )
  fixed
    .filter(
      f =>
        !movRef.includes(f.id) &&
        f.active &&
        time.begin >= f.amounts[f.amounts.length - 1].activeDate
    )
    .forEach(({id, details, currency, amounts, categories}) =>
      pending.push({
        details,
        currency,
        categories,
        expenseRef: id,
        amount: amounts[amounts.length - 1].amount,
        type: 'spent',
        spentType: 'fixed',
        status: 'pending',
      })
    )

  return pending.sort((a, b) =>
    a.categories[0].name > b.categories[0].name ? 1 : -1
  )
}

const getMovements = ({movements, payments, fixed}, location) => {
  const time = getMovementsMonth(location)
  const filteredMovs = filterMovements(movements, time)
  const pending = getPendingExpenses(filteredMovs, payments, fixed, time)

  return [...filteredMovs, ...pending]
}

export {getMovements}
