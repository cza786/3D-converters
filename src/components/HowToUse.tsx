import React from 'react';
import { Upload, Eye, Cpu, Download } from 'lucide-react';

interface Step {
  step: number;
  title: string;
  description: string;
}

interface Props {
  steps: Step[];
  title?: string;
  subtitle?: string;
}

const STEP_ICONS = [Upload, Eye, Cpu, Download];

export default function HowToUse({
  steps,
  title = 'How to Use',
  subtitle = 'Simple 4-step workflow to convert and inspect your 3D assets in seconds.',
}: Props) {
  return (
    <section className="py-12 border-t border-zinc-800/80">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => {
          const Icon = STEP_ICONS[idx % STEP_ICONS.length];
          return (
            <div
              key={step.step}
              className="relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xs transition-all hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-black text-zinc-700">
                  0{step.step}
                </span>
              </div>

              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
