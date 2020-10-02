export function shortDateFormat(date) {
  const dateFormat = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  let dateArr;
  if (date === null) {
    dateArr = dateFormat.formatToParts(Date.now());
  } else {
    dateArr = dateFormat.formatToParts(new Date(date));
  }
  let dateStr = "";
  dateArr.forEach((el) => (dateStr += el.value));
	return dateStr
}

export function longDateFormat(date) {
	const dateFormat = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  let dateArr;
  if (date === null) {
    dateArr = dateFormat.formatToParts(Date.now());
  } else {
    dateArr = dateFormat.formatToParts(new Date(date));
  }
  let dateStr = "";
	dateArr.forEach((el) => (dateStr += el.value));
	return dateStr
}

export function plotDateFormat(rawDate) {
	const date = new Date(rawDate)
	const dd = date.getDate();
	const mm = date.getMonth()+1;
	const formattedDate = `${mm}/${dd}`;
	return formattedDate;
}
