/**
 * Brand Preview Page
 * View all logo options at: http://localhost:3000/brand-preview
 */

import { Logo, LogoAlt, LogoShield } from "@/components/brand/logo";

export default function BrandPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Horizon Credit Repair - Brand Options
        </h1>
        <p className="mb-12 text-center text-gray-600">
          Review the logo options below. Let me know which style you prefer.
        </p>

        {/* Option 1: Rising Sun/Horizon */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Option 1: Rising Horizon (Recommended)
          </h2>
          <p className="mb-6 text-gray-600">
            A sunrise over a horizon line symbolizing new beginnings and upward
            trajectory. Includes a checkmark representing credit success.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Light Background */}
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <p className="mb-4 text-sm font-medium text-gray-500">
                Light Background
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-gray-500">Full:</span>
                  <Logo variant="full" size="lg" theme="light" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-gray-500">Icon:</span>
                  <Logo variant="icon" size="lg" theme="light" />
                  <Logo variant="icon" size="md" theme="light" />
                  <Logo variant="icon" size="sm" theme="light" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-gray-500">Sizes:</span>
                  <Logo variant="full" size="sm" theme="light" />
                  <Logo variant="full" size="md" theme="light" />
                </div>
              </div>
            </div>

            {/* Dark Background */}
            <div className="rounded-xl bg-[#1E3A5F] p-8 shadow-lg">
              <p className="mb-4 text-sm font-medium text-white/60">
                Dark Background
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-white/60">Full:</span>
                  <Logo variant="full" size="lg" theme="dark" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-white/60">Icon:</span>
                  <Logo variant="icon" size="lg" theme="dark" />
                  <Logo variant="icon" size="md" theme="dark" />
                  <Logo variant="icon" size="sm" theme="dark" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 2: Abstract H */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Option 2: Abstract H with Upward Arrow
          </h2>
          <p className="mb-6 text-gray-600">
            A modern, tech-focused design combining the letter H with an upward
            arrow representing growth and improvement.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <p className="mb-4 text-sm font-medium text-gray-500">
                Light Background
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-gray-500">Full:</span>
                  <LogoAlt variant="full" size="lg" theme="light" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-gray-500">Icon:</span>
                  <LogoAlt variant="icon" size="lg" theme="light" />
                  <LogoAlt variant="icon" size="md" theme="light" />
                  <LogoAlt variant="icon" size="sm" theme="light" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#1E3A5F] p-8 shadow-lg">
              <p className="mb-4 text-sm font-medium text-white/60">
                Dark Background
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-white/60">Full:</span>
                  <LogoAlt variant="full" size="lg" theme="dark" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-white/60">Icon:</span>
                  <LogoAlt variant="icon" size="lg" theme="dark" />
                  <LogoAlt variant="icon" size="md" theme="dark" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Option 3: Shield */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Option 3: Shield with Checkmark
          </h2>
          <p className="mb-6 text-gray-600">
            A trust and security-focused design. The shield represents
            protection, the checkmark represents verified results.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <p className="mb-4 text-sm font-medium text-gray-500">
                Light Background
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-gray-500">Full:</span>
                  <LogoShield variant="full" size="lg" theme="light" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-gray-500">Icon:</span>
                  <LogoShield variant="icon" size="lg" theme="light" />
                  <LogoShield variant="icon" size="md" theme="light" />
                  <LogoShield variant="icon" size="sm" theme="light" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#1E3A5F] p-8 shadow-lg">
              <p className="mb-4 text-sm font-medium text-white/60">
                Dark Background
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-white/60">Full:</span>
                  <LogoShield variant="full" size="lg" theme="dark" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-20 text-sm text-white/60">Icon:</span>
                  <LogoShield variant="icon" size="lg" theme="dark" />
                  <LogoShield variant="icon" size="md" theme="dark" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Brand Color Palette
          </h2>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-lg overflow-hidden shadow">
              <div className="h-24 bg-[#1E3A5F]" />
              <div className="bg-white p-3 text-center">
                <p className="font-medium">Horizon Blue</p>
                <p className="text-sm text-gray-500">#1E3A5F</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow">
              <div className="h-24 bg-[#E8A838]" />
              <div className="bg-white p-3 text-center">
                <p className="font-medium">Sunrise Gold</p>
                <p className="text-sm text-gray-500">#E8A838</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow">
              <div className="h-24 bg-[#6B4C9A]" />
              <div className="bg-white p-3 text-center">
                <p className="font-medium">Dusk Violet</p>
                <p className="text-sm text-gray-500">#6B4C9A</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow">
              <div className="h-24 bg-[#4CAF50]" />
              <div className="bg-white p-3 text-center">
                <p className="font-medium">Success Green</p>
                <p className="text-sm text-gray-500">#4CAF50</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow">
              <div className="h-24 bg-[#E8F4FD]" />
              <div className="bg-white p-3 text-center">
                <p className="font-medium">Sky Light</p>
                <p className="text-sm text-gray-500">#E8F4FD</p>
              </div>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="rounded-xl bg-blue-50 p-6">
          <h3 className="mb-2 font-semibold text-blue-800">Next Steps</h3>
          <p className="text-blue-700">
            Review the options above and let me know which logo style you
            prefer:
          </p>
          <ul className="mt-2 list-inside list-disc text-blue-700">
            <li>
              <strong>Option 1:</strong> Rising Horizon (sunrise motif)
            </li>
            <li>
              <strong>Option 2:</strong> Abstract H with arrow
            </li>
            <li>
              <strong>Option 3:</strong> Shield with checkmark
            </li>
          </ul>
          <p className="mt-4 text-blue-700">
            I can also adjust colors, proportions, or combine elements from
            different options.
          </p>
        </section>
      </div>
    </div>
  );
}

