const user = (state = {}, action) => {
    switch (action.type) {
        case "ADD_CURRENT_USER":
            const { id, username, email, password } = action.payload;
            return {
                id,
                username,
                email,
                password,
            };
        default:
            return state;
    }
};

export default user;
