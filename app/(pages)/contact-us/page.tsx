import cn from 'clsx'
import { Shield } from 'lucide-react'
import { Theme } from '~/app/(pages)/_components/theme'
import { Wrapper } from '~/app/(pages)/_components/wrapper'
import { HashPattern } from '~/app/(pages)/home/_components/hash-pattern'
import { ContactForm } from '~/components/contact-form'
import { FooterContent } from '~/components/footer-content'
import { ScrollToTop } from '~/libs/scroll-to-top'
import s from './contact-us.module.css'

export default async function ContactUsPage() {
  return (
    <Theme theme="dark" global>
      <ScrollToTop />
      <div className="min-h-svh flex flex-col bg-white">
        <Wrapper />
        <main className="flex-1">
          <div
            className={cn(
              'dr-pt-80 dr-px-20 dr-pb-80 dt:dr-pt-120 dt:dr-px-40 dt:dr-pb-60 relative overflow-x-hidden',
              s.container
            )}
          >
            <HashPattern className="absolute inset-0 text-teal opacity-[0.06] pointer-events-none" />

            <div className="w-full max-w-[1100px] mx-auto relative z-10 dt:grid dt:grid-cols-[1fr_minmax(0,480px)] dt:dr-gap-100 dt:items-center">
              {/* Left Column - Value Props */}
              <div className="dt:dr-max-w-500">
                {/* Mobile: Centered header */}
                <div className="text-center dr-mb-48 dr-mt-48 dt:hidden">
                  <h1 className="typo-h3 text-off-white dr-mb-20">
                    Request a Demo
                  </h1>
                  <p className="typo-p-l text-off-white dr-max-w-340 mx-auto leading-[1.6]">
                    See ERA in action. Request a personalised demo for your
                    building, your portfolio, or your organisation.
                  </p>
                </div>

                {/* Desktop: Full value props */}
                <div className="hidden dt:block">
                  <h1 className="typo-h1 text-off-white dr-mb-32">
                    Request a Demo
                  </h1>

                  <div className="dr-mb-40">
                    <div className="flex items-start dr-gap-16 dr-mb-24">
                      <Shield className="dr-w-24 dr-h-24 flex-shrink-0 dr-mt-4 text-forest" />
                      <div>
                        <span className="typo-p text-off-white opacity-80">
                          See ERA in action. Request a personalised demo for
                          your building, your portfolio, or your organisation.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="w-full dr-max-w-480 dt:max-w-full mx-auto dt:mx-0">
                <ContactForm />
              </div>
            </div>
          </div>
        </main>
        <FooterContent />
      </div>
    </Theme>
  )
}
