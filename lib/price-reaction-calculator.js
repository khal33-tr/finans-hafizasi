const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function toDateKey(dateLike) {
  const date = new Date(`${dateLike}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateLike}`);
  }
  return date.toISOString().slice(0, 10);
}

export function addCalendarDays(dateKey, days) {
  const date = new Date(`${toDateKey(dateKey)}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function percentChange(baseValue, endValue) {
  if (typeof baseValue !== "number" || typeof endValue !== "number") {
    throw new Error("Return calculation requires numeric values.");
  }
  if (baseValue === 0) {
    throw new Error("Base value cannot be zero.");
  }
  return Number((((endValue / baseValue) - 1) * 100).toFixed(4));
}

export function buildTradingCalendar(calendarRows) {
  return new Map(calendarRows.map((row) => [row.date, row]));
}

export function isTradingDay(dateKey, calendar) {
  const key = toDateKey(dateKey);
  const row = calendar.get(key);
  if (row) return row.isTradingDay === true;

  const day = new Date(`${key}T00:00:00Z`).getUTCDay();
  return day !== 0 && day !== 6;
}

export function nextTradingDay(dateKey, calendar) {
  let current = toDateKey(dateKey);
  for (let guard = 0; guard < 370; guard += 1) {
    if (isTradingDay(current, calendar)) return current;
    current = addCalendarDays(current, 1);
  }
  throw new Error(`No trading day found after ${dateKey}`);
}

export function tradingDayOffset(baseDate, offset, calendar) {
  let current = toDateKey(baseDate);
  let remaining = offset;

  while (remaining > 0) {
    current = addCalendarDays(current, 1);
    if (isTradingDay(current, calendar)) remaining -= 1;
  }

  return current;
}

export function resolveWindowEndDate(baseDate, windowDefinition, calendar) {
  if (windowDefinition.type === "trading_day_offset") {
    return tradingDayOffset(baseDate, windowDefinition.offset, calendar);
  }

  if (windowDefinition.type === "calendar_day_then_next_trading_day") {
    return nextTradingDay(addCalendarDays(baseDate, windowDefinition.calendarDays), calendar);
  }

  throw new Error(`Unknown window type: ${windowDefinition.type}`);
}

export function buildBarIndex(priceBars) {
  const index = new Map();

  for (const bar of priceBars) {
    const key = `${bar.symbol}:${bar.date}`;
    index.set(key, bar);
  }

  return index;
}

export function getBar(barIndex, symbol, date) {
  const bar = barIndex.get(`${symbol}:${date}`);
  if (!bar) {
    throw new Error(`Missing price bar for ${symbol} on ${date}`);
  }
  return bar;
}

export function previousTradingDays(baseDate, count, calendar) {
  const days = [];
  let current = toDateKey(baseDate);

  while (days.length < count) {
    current = addCalendarDays(current, -1);
    if (isTradingDay(current, calendar)) days.unshift(current);
  }

  return days;
}

export function average(values) {
  if (!values.length) throw new Error("Average requires at least one value.");
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function calculateVolumeMultiple({ ticker, baseDate, barIndex, calendar, lookback = 20 }) {
  const baseBar = getBar(barIndex, ticker, baseDate);
  const previousDays = previousTradingDays(baseDate, lookback, calendar);
  const previousVolumes = previousDays.map((date) => getBar(barIndex, ticker, date).volume);
  const averageVolume = average(previousVolumes);

  return {
    eventDayVolume: baseBar.volume,
    previousAverageVolume: Number(averageVolume.toFixed(2)),
    volumeMultiple: Number((baseBar.volume / averageVolume).toFixed(4))
  };
}

export function calculateEventReaction({ input, priceBars, calendarRows, windowDefinitions }) {
  const calendar = buildTradingCalendar(calendarRows);
  const barIndex = buildBarIndex(priceBars);
  const baseDate = nextTradingDay(input.baseDate, calendar);
  const stockBase = getBar(barIndex, input.ticker, baseDate);
  const indexBase = getBar(barIndex, "XU100", baseDate);
  const windows = {};

  for (const definition of windowDefinitions) {
    const endDate = resolveWindowEndDate(baseDate, definition, calendar);
    const stockEnd = getBar(barIndex, input.ticker, endDate);
    const indexEnd = getBar(barIndex, "XU100", endDate);
    const stockReturnPct = percentChange(stockBase.adjustedClose, stockEnd.adjustedClose);
    const indexReturnPct = percentChange(indexBase.adjustedClose, indexEnd.adjustedClose);

    windows[definition.key] = {
      label: definition.label,
      baseDate,
      endDate,
      basePrice: stockBase.adjustedClose,
      endPrice: stockEnd.adjustedClose,
      stockReturnPct,
      indexReturnPct,
      relativeReturnPct: Number((stockReturnPct - indexReturnPct).toFixed(4))
    };
  }

  const volume = calculateVolumeMultiple({
    ticker: input.ticker,
    baseDate,
    barIndex,
    calendar
  });

  return {
    slug: input.slug,
    ticker: input.ticker,
    benchmark: "XU100",
    calculationStatus: "calculated",
    baseDate,
    windows,
    volume,
    dataStatus: "sample_fixture_not_market_data"
  };
}

export function calculateAllEventReactions({ inputs, priceBars, calendarRows }) {
  return inputs.events.map((input) =>
    calculateEventReaction({
      input,
      priceBars,
      calendarRows,
      windowDefinitions: inputs.windowDefinitions
    })
  );
}
