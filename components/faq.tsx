import { useState } from "react";

export function Faq() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    
      const faqItems = [
        {
          question: "What makes Jetflix different?",
          answer: "Our platform combines cutting-edge technology with curated content selection, offering personalized streaming experiences powered by AI recommendations."
        },
        {
          question: "How much does it cost?",
          answer: "We offer flexible plans starting from $9.99/month. Cancel anytime with no hidden fees."
        },
        {
          question: "Can I watch offline?",
          answer: "Yes! Download your favorite content to watch anywhere, anytime without an internet connection."
        }
      ];
    
      return (
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  <span className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="px-6 pb-4 pt-2 border-t border-gray-100 text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      );
}