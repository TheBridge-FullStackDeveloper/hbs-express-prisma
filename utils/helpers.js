module.exports = {
    capitalize: function(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
    formatDate: function(date, format) {
        const newDate = new Date(date)
        if(format === "DD/MM/YYYY"){
            const DD = newDate.getDay() + 1
            const MM = newDate.getMonth() + 1
            const YYYY = newDate.getFullYear()
            return `${DD}/${MM}/${YYYY}`
        }else{
            return date
        }
    }
};