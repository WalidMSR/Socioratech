import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import Select from "react-select";
import type { SingleValue } from "react-select";
import axios from "axios";

type ProfessionOption = {
  value: string;
  label: string;
};

const professionOptions = [
  { value: "orthophoniste", label: "Orthophoniste" },
  { value: "psychologue", label: "Psychologue" },
  { value: "educateur", label: "Éducateur spécialisé" },
  { value: "autre", label: "Autre professionnel de santé" },
  { value: "structure", label: "Représentant d'une structure" }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await axios.post(
      "http://127.0.0.1:8000/api/contact/",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        profession: '',
        subject: '',
        message: ''
      });
    }, 3000);

  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'envoi du message");
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary to-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            Vous souhaitez simplifier votre gestion et optimiser l’accompagnement de vos patients ? 
            Échangez avec notre équipe pour découvrir nos solutions adaptées à vos besoins.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Envoyez-nous un message
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                Que vous souhaitiez une démonstration, des informations ou simplement discuter de vos besoins,
                nous sommes là pour vous accompagner.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Email</h3>
                    <a
                      href="mailto:contact@sociora.com"
                      className="text-secondary hover:underline"
                    >
                      contact@sociora.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Localisation</h3>
                    <p className="text-gray-600">Algérie</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 bg-blue-50 rounded-xl p-8">
                <h3 className="font-semibold text-primary mb-3 text-lg">
                  Horaires de réponse
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Du dimanche au jeudi : 9h - 17h<br />
                  Réponse sous 24-48h ouvrées
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 shadow-lg">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    Message envoyé !
                  </h3>
                  <p className="text-gray-600">
                    Merci pour votre message. Nous vous répondrons très prochainement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet <span className='text-red-600'>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className='text-red-600'>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="profession" className="block text-sm font-semibold text-gray-700 mb-2">
                      Profession
                    </label>
                    <Select
                      options={professionOptions}
                      placeholder="Sélectionnez..."
                      onChange={(option: SingleValue<ProfessionOption>) =>
                        setFormData({ ...formData, profession: option?.label ?? "" })
                      }
                    />

                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Sujet <span className='text-red-600'>*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                      placeholder="Demande de démo, question, etc."
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message <span className='text-red-600'>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition resize-none"
                      placeholder="Décrivez votre demande..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-secondary text-white px-6 py-4 rounded-lg hover:bg-blue-600 transition transform hover:scale-105 flex items-center justify-center gap-2 font-semibold shadow-lg"
                  >
                    <Send size={20} />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <h2 className="text-3xl font-semibold text-primary mb-6">
              Vous souhaitez une démonstration ?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Découvrez nos solutions en action lors d'une démonstration personnalisée.
              Nous prendrons le temps de comprendre vos besoins et de vous montrer
              comment SOCIORA peut vous accompagner.
            </p>
            <div className="inline-block bg-blue-50 text-secondary px-6 py-3 rounded-lg font-semibold">
              Réponse garantie sous 48h
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
