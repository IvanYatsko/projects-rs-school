import React from "react"

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
    <a className="footer-link__git text text-title" href="https://github.com/IvanYatsko">Github_author</a>
    <h2 className="footer-title text text-title">2021</h2>
    <a className="footer-link__logo" href="https://rs.school/js/">
      <img className="footer-logo" src="./assets/image/rs_school_js.svg" alt="logo" />
    </a>
  </footer>
  )
}
