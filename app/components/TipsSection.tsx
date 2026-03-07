const tips = [
  {
    icon: "\u{1F50C}",
    title: "Laad je EV slim",
    description: "Plan het laden van je elektrische auto tijdens de goedkoopste uren.",
  },
  {
    icon: "\u{1F9FA}",
    title: "Wasmachine & droogkast",
    description: "Gebruik de timer om je was te draaien wanneer stroom het goedkoopst is.",
  },
  {
    icon: "\u{1F373}",
    title: "Koken & bakken",
    description: "Grote ovens en inductiekookplaten verbruiken veel - plan slim!",
  },
  {
    icon: "\u{2744}\uFE0F",
    title: "Airco & warmtepomp",
    description: "Verwarm of koel je huis op tijdens goedkope uren.",
  },
];

export default function TipsSection() {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Slim verbruiken
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {tips.map((tip) => (
          <div
            key={tip.title}
            className="flex items-start gap-4 rounded-xl bg-primary-50 border border-primary-100 p-4 transition-colors hover:bg-primary-100/70"
          >
            <span className="text-2xl flex-shrink-0 mt-0.5">{tip.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{tip.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
