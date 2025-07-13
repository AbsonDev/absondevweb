'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-gray-900 to-black relative overflow-hidden scroll-mt-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-white">Entre em</span> <span className="text-gradient">Contato</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pronto para transformar sua ideia em realidade? Vamos conversar!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Vamos trabalhar juntos!</h3>
            
            {[
              { icon: Mail, title: 'Email', value: 'contato@abson.dev', href: 'mailto:contato@abson.dev' },
              { icon: Phone, title: 'WhatsApp', value: '+55 (11) 99999-9999', href: 'tel:+5511999999999' },
              { icon: MapPin, title: 'Localização', value: 'Brasil', href: '#' }
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4 card p-4"
              >
                <contact.icon className="w-6 h-6 text-primary-400" />
                <div>
                  <p className="text-gray-400 text-sm">{contact.title}</p>
                  <a href={contact.href} className="text-white font-medium hover:text-primary-400 transition-colors">
                    {contact.value}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Nome</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary-500 focus:outline-none text-white"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary-500 focus:outline-none text-white"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Assunto</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary-500 focus:outline-none text-white"
                  placeholder="Sobre o projeto..."
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Mensagem</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary-500 focus:outline-none text-white resize-none"
                  placeholder="Conte-me sobre seu projeto..."
                />
              </div>
              
              <motion.button
                type="submit"
                className="btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensagem
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;