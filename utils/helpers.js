module.exports = {
    formatDate: (date) => {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    },
    // Continue adding more helper functions here
  };
  
