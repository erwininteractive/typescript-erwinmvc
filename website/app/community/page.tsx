'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Users, Github, GitPullRequest, Bug, MessageCircle,
  Heart, Star, BookOpen, Code, ArrowRight, ExternalLink
} from 'lucide-react';
import Link from 'next/link';

const contributionSteps = [
  {
    step: 1,
    title: 'Fork the Repository',
    description: 'Create your own copy of the ErwinMVC repository on GitHub.',
    icon: Github
  },
  {
    step: 2,
    title: 'Create a Branch',
    description: 'Make a new branch for your feature or bug fix.',
    icon: GitPullRequest
  },
  {
    step: 3,
    title: 'Make Your Changes',
    description: 'Write code, add tests, and update documentation as needed.',
    icon: Code
  },
  {
    step: 4,
    title: 'Submit a Pull Request',
    description: 'Open a PR and describe your changes for review.',
    icon: GitPullRequest
  }
];

const waysTiContribute = [
  {
    icon: Bug,
    title: 'Report Bugs',
    description: 'Found a bug? Open an issue on GitHub with details about the problem.',
    link: 'https://github.com/erwininteractive/typescript-erwinmvc/issues'
  },
  {
    icon: BookOpen,
    title: 'Improve Docs',
    description: 'Help make the documentation better by fixing typos or adding examples.',
    link: 'https://github.com/erwininteractive/typescript-erwinmvc'
  },
  {
    icon: Code,
    title: 'Write Code',
    description: 'Contribute features, fix bugs, or improve the codebase.',
    link: 'https://github.com/erwininteractive/typescript-erwinmvc/pulls'
  },
  {
    icon: Star,
    title: 'Star the Repo',
    description: 'Show your support by starring the repository on GitHub.',
    link: 'https://github.com/erwininteractive/typescript-erwinmvc'
  }
];

export default function CommunityPage() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [stepsRef, stepsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
            <Users className="w-4 h-4" />
            Community
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Join the <span className="gradient-text">Community</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            ErwinMVC is open source and we welcome contributions from developers of all skill levels.
            Whether you're fixing bugs, adding features, or improving docs, your help is appreciated!
          </p>
        </motion.div>

        {/* Ways to Contribute */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Ways to Contribute</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {waysTiContribute?.map?.((item, idx) => {
              const Icon = item?.icon;
              return (
                <motion.a
                  key={idx}
                  href={item?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 card-hover group"
                >
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    {Icon && <Icon className="w-6 h-6 text-blue-400" />}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    {item?.title}
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </h3>
                  <p className="text-slate-400 text-sm">{item?.description}</p>
                </motion.a>
              );
            }) ?? []}
          </div>
        </section>

        {/* Contribution Steps */}
        <section ref={stepsRef} className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">How to Contribute Code</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributionSteps?.map?.((step, idx) => {
              const Icon = step?.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {step?.step}
                  </div>
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 mt-2">
                    {Icon && <Icon className="w-5 h-5 text-blue-400" />}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step?.title}</h3>
                  <p className="text-slate-400 text-sm">{step?.description}</p>
                </motion.div>
              );
            }) ?? []}
          </div>
        </section>

        {/* About the Author */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-2xl border border-slate-700/50 p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
                ASE
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Andrew S. Erwin</h2>
                <p className="text-blue-400 mb-4">Creator of ErwinMVC • Software Engineer • 25+ Years Experience</p>
                <p className="text-slate-400 mb-4">
                  Andrew is the owner of Erwin Interactive, specializing in custom software solutions.
                  ErwinMVC was created to provide developers with a streamlined, sensible MVC framework
                  that gets out of your way while providing all the features you need.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://andrewthecoder.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    andrewthecoder.com
                  </a>
                  <a
                    href="https://github.com/erwininteractive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-center"
        >
          <Heart className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Contribute?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Every contribution, no matter how small, helps make ErwinMVC better for everyone.
            Check out the repository and get started today!
          </p>
          <a
            href="https://github.com/erwininteractive/typescript-erwinmvc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-100 text-blue-600 font-semibold rounded-xl transition-all"
          >
            <Github className="w-5 h-5" />
            View on GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
}
