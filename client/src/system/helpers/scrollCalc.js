export default function scroll() {
  const scrolled = window.pageYOffset;
  const innerHeight = window.innerHeight;
  const resScrolled = (innerHeight + scrolled) * 1.15;

  const scrollHeight = document.documentElement.scrollHeight;

  return scrolled > 0 ? resScrolled >= scrollHeight : false;
}
