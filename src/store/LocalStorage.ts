

export const getTheme = () => {
    return window.localStorage.getItem("theme");
}

export const setTheme = (theme: string) => {
    return window.localStorage.setItem("theme", theme);
}