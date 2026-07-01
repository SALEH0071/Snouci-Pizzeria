export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-gradient-to-b from-card to-card/80 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-accent opacity-90 mb-1">
              LA MAISON
            </h1>
            <p className="text-sm md:text-base text-accent font-semibold tracking-[0.15em] uppercase">
              djalil & Snouci Pizzeria
            </p>
            <div className="h-1 w-16 bg-accent mx-auto mt-3 opacity-80"></div>
          </div>
        </div>
      </div>
    </header>
  )
}
