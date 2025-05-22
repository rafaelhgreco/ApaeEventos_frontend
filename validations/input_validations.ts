export const isValidPasswordLength = (password: string) => {
    return password.length >= 8;
};

export const hasSpecialCharacters = (password: string) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharRegex.test(password);
};

export const isValidEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string) => {
    return isValidPasswordLength(password) && hasSpecialCharacters(password);
};
