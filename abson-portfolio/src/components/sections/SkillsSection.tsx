'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const SkillsSection = () => {
  const { t } = useLanguage();
  const skillCategories = [
    {
      title: t('skills.frontend'),
      skills: [
        { name: 'Flutter', logo: 'https://cdn.simpleicons.org/flutter' },
        { name: 'Angular', logo: 'https://cdn.simpleicons.org/angular' },
        { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs' },
        { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript' },
        { name: 'React', logo: 'https://cdn.simpleicons.org/react' },
        { name: 'Dart', logo: 'https://cdn.simpleicons.org/dart' },
      ]
    },
    {
      title: t('skills.backend'),
      skills: [
        { name: '.NET Core', logo: 'https://cdn.simpleicons.org/dotnet' },
        { name: 'Azure', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg' },
        { name: 'C#', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg' },
        { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs' },
        { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker' },
        { name: 'Kubernetes', logo: 'https://cdn.simpleicons.org/kubernetes' },
      ]
    },
    {
      title: t('skills.database'),
      skills: [
        { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql' },
        { name: 'Firebase', logo: 'https://cdn.simpleicons.org/firebase' },
        { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github' },
        { name: 'Git', logo: 'https://cdn.simpleicons.org/git' },
        { name: 'REST APIs', logo: 'https://cdn.simpleicons.org/fastapi' },
        { name: 'GraphQL', logo: 'https://cdn.simpleicons.org/graphql' },
      ]
    },
    {
      title: t('skills.methodologies'),
      skills: [
        { name: 'SOLID', logo: 'https://cdn.simpleicons.org/solid' },
        { name: 'TDD', logo: 'https://cdn.simpleicons.org/testinglibrary' },
        { name: 'Clean Architecture', logo: 'https://cdn.simpleicons.org/blueprint' },
        { name: 'Agile/Scrum', logo: 'https://cdn.simpleicons.org/atlassian' },
        { name: 'CI/CD', logo: 'https://cdn.simpleicons.org/githubactions' },
        { name: 'DevOps', logo: 'https://cdn.simpleicons.org/jenkins' },
      ]
    },
    {
      title: t('skills.ai'),
      skills: [
        { name: 'Cursor AI', logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg' },
        { name: 'Claude Code', logo: 'https://cdn.simpleicons.org/anthropic' },
        { name: 'GitHub Copilot', logo: 'https://cdn.simpleicons.org/githubcopilot' },
        { name: 'ChatGPT', logo: 'https://cdn.simpleicons.org/openai' },
      ]
    }
  ];

  return (
    <section id="skills" className="section-padding relative overflow-hidden scroll-mt-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6">
            <span style={{ color: 'var(--text-primary)' }}>{t('skills.title').split(' ')[0]}</span> <span className="text-gradient">{t('skills.title').split(' ')[1]}</span>
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
                    className="flex flex-col items-center p-3 rounded-lg transition-all duration-300 group"
                    style={{
                      backgroundColor: 'var(--bg-glass-dark)',
                      border: `1px solid var(--border-light)`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-glass)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-glass-dark)';
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <img 
                      src={skill.logo} 
                      alt={skill.name}
                      className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-sm font-medium text-center leading-tight" style={{ color: 'var(--text-secondary)' }}>
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