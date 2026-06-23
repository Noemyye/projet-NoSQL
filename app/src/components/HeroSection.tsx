import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative py-20 px-4 text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1a2535 0%, var(--cl-bg) 100%)",
      }}
    >
      {/* Décoration */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, #00AB6C 0%, transparent 50%), radial-gradient(circle at 70% 30%, #2255AA 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Suivez les films{" "}
          <span className="text-cl-green">que vous aimez.</span>
        </h1>
        <p className="text-cl-slate text-lg mb-8">
          Notez, critiquez, découvrez. Partagez votre amour du cinéma avec des
          amis qui le vivent autant que vous.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/auth/register" className="cl-btn px-8 py-3 text-base">
            Créer un compte gratuit
          </Link>
          <Link href="/films" className="cl-btn-ghost px-8 py-3 text-base">
            Explorer les films
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto">
          {[
            { label: "Films", value: "8 000+" },
            { label: "Membres", value: "120 000+" },
            { label: "Critiques", value: "2,4M" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-white text-2xl font-bold">{value}</p>
              <p className="text-cl-slate text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
