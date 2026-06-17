import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wand2, ArrowRight, RotateCcw,
  Home, Scissors, Building2, Sparkles,
  BookOpen, Zap, Award,
  TrendingDown, DollarSign, TrendingUp, Gem,
  CheckCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useProducts } from '../../hooks/usePublicData';
import type { Product } from '../../types';
import ProductCard from '../ui/ProductCard';

interface StepOption {
  label: string;
  value: string;
  Icon: LucideIcon;
}

interface Step {
  key: string;
  question: string;
  options: StepOption[];
}

const steps: Step[] = [
  {
    key: 'useCase',
    question: 'What will you mainly use the machine for?',
    options: [
      { label: 'Home Sewing / Hobby', value: 'home', Icon: Home },
      { label: 'Fashion Design Business', value: 'fashion', Icon: Scissors },
      { label: 'Garment Production / Factory', value: 'production', Icon: Building2 },
      { label: 'Embroidery & Decorative Work', value: 'embroidery', Icon: Sparkles },
    ],
  },
  {
    key: 'experience',
    question: 'What is your sewing experience level?',
    options: [
      { label: 'Complete Beginner', value: 'beginner', Icon: BookOpen },
      { label: 'Intermediate', value: 'intermediate', Icon: Zap },
      { label: 'Advanced / Professional', value: 'advanced', Icon: Award },
    ],
  },
  {
    key: 'budget',
    question: 'What is your budget range?',
    options: [
      { label: 'Under ₦100,000', value: 'low', Icon: TrendingDown },
      { label: '₦100,000 – ₦250,000', value: 'mid', Icon: DollarSign },
      { label: '₦250,000 – ₦500,000', value: 'high', Icon: TrendingUp },
      { label: 'Over ₦500,000', value: 'premium', Icon: Gem },
    ],
  },
];

type Answers = Record<string, string>;

function getRecommendations(answers: Answers, allProducts: Product[]): Product[] {
  let filtered = [...allProducts];

  if (answers.budget === 'low') {
    filtered = filtered.filter(p => (p.salePrice ?? p.price) < 100000);
  } else if (answers.budget === 'mid') {
    filtered = filtered.filter(p => (p.salePrice ?? p.price) >= 100000 && (p.salePrice ?? p.price) <= 250000);
  } else if (answers.budget === 'high') {
    filtered = filtered.filter(p => (p.salePrice ?? p.price) > 250000 && (p.salePrice ?? p.price) <= 500000);
  }

  if (answers.useCase === 'production') {
    filtered = filtered.filter(p => p.category === 'industrial-machines' || p.tags.includes('industrial'));
  } else if (answers.useCase === 'embroidery') {
    filtered = filtered.filter(p => p.category === 'embroidery-machines');
  } else if (answers.useCase === 'home') {
    filtered = filtered.filter(p => p.category === 'sewing-machines' || p.category === 'starter-kits');
  }

  filtered.sort((a, b) => b.rating - a.rating);

  return filtered.slice(0, 3).length > 0
    ? filtered.slice(0, 3)
    : allProducts.filter(p => p.isBestSeller).slice(0, 3);
}

export default function MachineFinderSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [done, setDone] = useState(false);

  const { data } = useProducts({ limit: 100 });
  const allProducts = data?.products ?? [];

  const handleAnswer = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setRecommendations(getRecommendations(newAnswers, allProducts));
      setDone(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
    setRecommendations([]);
  };

  const currentStep = steps[step];

  return (
    <section id="machine-finder" className="py-16 bg-navy-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 rounded-full px-4 py-1.5 mb-4">
            <Wand2 className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 text-sm font-medium">Machine Finder Tool</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Find Your Perfect Machine
          </h2>
          <p className="text-white/60">
            Answer 3 quick questions and we'll recommend the best machines for you
          </p>
        </div>

        {!done ? (
          <div className="bg-navy-800 rounded-3xl p-6 md:p-10">
            <div className="mb-8">
              <div className="flex justify-between text-xs text-white/50 mb-2">
                <span>Question {step + 1} of {steps.length}</span>
                <span>{Math.round(((step + 1) / steps.length) * 100)}% complete</span>
              </div>
              <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-500 rounded-full transition-all duration-500"
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              {currentStep.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentStep.options.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleAnswer(currentStep.key, option.value)}
                  className="flex items-center gap-3 p-4 bg-navy-700 hover:bg-gold-500/20 border border-navy-600 hover:border-gold-500 rounded-2xl text-left transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-navy-600 group-hover:bg-gold-500/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <option.Icon className="w-4 h-4 text-gold-400" />
                  </div>
                  <span className="text-sm font-medium text-white group-hover:text-gold-300">
                    {option.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gold-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-gold-500/20 border border-gold-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-gold-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Your Perfect Matches
              </h3>
              <p className="text-white/60 text-sm">
                Based on your needs, we recommend these machines
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {recommendations.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-gold-400 text-white hover:text-gold-400 px-6 py-3 rounded-xl transition-colors font-medium"
              >
                <RotateCcw className="w-4 h-4" /> Start Over
              </button>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Browse All Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
