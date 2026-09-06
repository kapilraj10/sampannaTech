'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'What services does Sampanna Tech provide?',
    answer:
      'We build websites, mobile applications, custom business software, POS and business management systems. We also provide UI/UX design, IT consulting, digital solutions, and maintenance and support.',
  },
  {
    question: 'How much does a project cost?',
    answer:
      'Every project is different, so we quote based on your specific requirements. After an initial discussion we provide a clear, written estimate that covers scope, timeline and payment schedule.',
  },
  {
    question: 'How long does it take to build a website or application?',
    answer:
      'It depends on the scope. A professional business website typically takes a few weeks, while mobile apps and custom business software take longer. We agree on a realistic timeline before work begins and keep you updated throughout.',
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer:
      'Yes. We provide maintenance and support services to keep your software updated, secure and running smoothly after launch. Support terms are agreed with each project.',
  },
  {
    question: 'Can you build a POS system for our business?',
    answer:
      'Yes. We build POS and business management systems for billing, inventory, sales reports and day-to-day operations. Our Sampanna POS product covers many of these needs out of the box.',
  },
  {
    question: 'Do you work with businesses outside Nepal?',
    answer:
      'Yes. Sampanna Tech is based in Kathmandu, Nepal, and we work with businesses in Nepal and internationally through remote collaboration.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Use the contact page to send us a message about your project. We will get back to you to discuss your requirements and next steps.',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Common questions about how we work, how much things cost and what to expect when you start a project with us."
      />
      <section className="bg-slate-50 py-16 lg:py-24">
        <Container>
          <SectionHeading
            title="Everything you need to know"
            className="mb-10"
          />
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={openIndex === index}
                >
                  <h2 className="text-base font-semibold text-slate-900">{faq.question}</h2>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 text-slate-400 transition-transform',
                      openIndex === index && 'rotate-180'
                    )}
                    aria-hidden="true"
                  />
                </button>
                {openIndex === index && (
                  <div className="border-t border-slate-100 px-6 py-5">
                    <p className="leading-relaxed text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}