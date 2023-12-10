module.exports = {
  formatDate: function (date) {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date
    );

    return formattedDate;
  },
};
