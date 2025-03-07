import { prices } from "@/utils/data";
export default function Pricing() {
  return (
    <section id="precios" className="w-full py-9 md:py-20">
      <div className="flex flex-col items-center px-8">
        <h2 className="section_title">Precios Competitivos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {
            prices.map((plan, index) => (
              <div
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-cloud/20"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={plan.name}
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-center text-cloud-dark mb-4">
                    {plan.name}
                  </h3>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-cloud">{plan.price}</span>
                  </div>
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li className="flex items-center text-cloud" key={feature}>
                        <svg
                          className="w-5 h-5 text-cloud mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-8 bg-cloud text-white py-2 rounded-full hover:bg-cloud-dark transition duration-300">
                    Reservar Ahora
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}