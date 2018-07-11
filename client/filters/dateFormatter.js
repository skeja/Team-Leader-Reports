export default dateString => {
  const date = new Date(dateString);
  const day = date.getDate(date);
  const month = date.getMonth(date) + 1;
  const year = date.getFullYear(date);
  return `${day}. ${month}. ${year}.`;
};
