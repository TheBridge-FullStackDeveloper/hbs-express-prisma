function formatDate(date) {
    const formattedDate = new Date(date);

    if (isNaN(formattedDate.getTime())) {
      return 'Invalid date';
    }

    options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    return formattedDate.toLocaleString('en-US', options);
}

module.exports = { formatDate }