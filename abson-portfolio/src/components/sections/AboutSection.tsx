'use client';

import { motion } from 'framer-motion';
import { User, Heart, Target, Award } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-black to-gray-900 relative overflow-hidden scroll-mt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-noise opacity-5" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-gradient">Sobre</span> <span className="text-white">Mim</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Desenvolvedor apaixonado por criar soluções que fazem a diferença
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              Sou um <span className="text-primary-400 font-semibold">Desenvolvedor Full Stack</span> apaixonado 
              por transformar ideias em realidade digital. Com mais de 5 anos de experiência, especializo-me 
              em criar aplicações completas e escaláveis.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              Minha jornada começou com curiosidade e evoluiu para uma paixão genuína por resolver problemas 
              complexos usando tecnologia. Trabalho com as mais modernas tecnologias do mercado.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Heart, title: "Paixão", desc: "Por tecnologia e inovação" },
                { icon: Target, title: "Foco", desc: "Em resultados excepcionais" },
                { icon: Award, title: "Qualidade", desc: "Em cada linha de código" },
                { icon: User, title: "Experiência", desc: "Do usuário em primeiro lugar" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card card-hover p-4"
                >
                  <item.icon className="w-8 h-8 text-primary-400 mb-3" />
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-white">
                A
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Abson Santos</h3>
              <p className="text-primary-400 font-medium mb-4">Full Stack Developer</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Disponível para projetos
                </div>
                <div>📍 Brasil</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;