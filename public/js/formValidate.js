$('form').validate({
    messages: {
        to: "To is required.",
        from: "From is required.",
        time: {
            required: "Time is required.",
            time: "Time must be between 8:15a and 5:10p."
        }
        date: {
        	required: "Date is required.",
        	date: "Date cannot be in the past."
        }
    },
    focusInvalid: false
});