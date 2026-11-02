// Stránka se scrolluje uvnitř CustomScrollbar kontejneru, ne přes window,
// proto kotvy řešíme přes scrollIntoView (respektuje scroll-margin-top sekcí).
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
