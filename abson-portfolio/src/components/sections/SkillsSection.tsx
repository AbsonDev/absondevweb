'use client';

import { motion } from 'framer-motion';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Frontend & Mobile',
      skills: [
        { name: 'Flutter', icon: '📱' },
        { name: 'Angular', icon: '⚡' },
        { name: 'Next.js', icon: '⚛️' },
        { name: 'TypeScript', icon: '🔷' },
        { name: 'React', icon: '⚛️' },
        { name: 'Dart', icon: '🎯' },
      ]
    },
    {
      title: 'Backend & Cloud',
      skills: [
        { name: '.NET Core', icon: '💎' },
        { name: 'Azure', icon: '☁️' },
        { name: 'C#', icon: '🔧' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'Docker', icon: '🐳' },
        { name: 'Kubernetes', icon: '⚙️' },
      ]
    },
    {
      title: 'Database & Tools',
      skills: [
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'Firebase', icon: '🔥' },
        { name: 'GitHub', icon: '🐙' },
        { name: 'Git', icon: '📝' },
        { name: 'REST APIs', icon: '🔗' },
        { name: 'GraphQL', icon: '📊' },
      ]
    },
    {
      title: 'Metodologias & Práticas',
      skills: [
        { name: 'SOLID', icon: '🏗️' },
        { name: 'TDD', icon: '🧪' },
        { name: 'Clean Architecture', icon: '🏛️' },
        { name: 'Agile/Scrum', icon: '🔄' },
        { name: 'CI/CD', icon: '🚀' },
        { name: 'DevOps', icon: '⚡' },
      ]
    },
    {
      title: 'AI Development Tools',
      skills: [
        { name: 'Cursor AI', icon: '🤖' },
        { name: 'Claude Code', icon: '🧠' },
        { name: 'GitHub Copilot', icon: '🚁' },
        { name: 'ChatGPT', icon: '💬' },
      ]
    }
  ];

  return (
    <section id="skills" className="section-padding bg-gray-900 relative overflow-hidden scroll-mt-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-white">Minhas</span> <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="card card-hover"
            >
              <h3 className="text-xl font-bold text-gradient mb-6 text-center">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.2 + skillIndex * 0.1 
                    }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-300 text-center leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;