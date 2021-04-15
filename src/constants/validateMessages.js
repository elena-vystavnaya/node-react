export const validateMessages = {
    required: '${label} is required!',
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
        regexp:
            "${label} must including uppercase, lowercase letters and numbers",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
    string: {
        min: "${label} must be at least ${min} characters",
        max: "${label} cannot be longer than ${max} characters",
    },
    pattern: {
        mismatch:
            "${label} must including letters and numbers.",
    },
};