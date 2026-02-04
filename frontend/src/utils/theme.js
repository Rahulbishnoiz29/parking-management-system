export const initTheme = () => {
  const theme = localStorage.getItem("theme")
  if (theme === "dark") {
    document.documentElement.classList.add("dark")
  }
}

export const toggleTheme = () => {
  const html = document.documentElement
  if (html.classList.contains("dark")) {
    html.classList.remove("dark")
    localStorage.setItem("theme", "light")
  } else {
    html.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }
}
