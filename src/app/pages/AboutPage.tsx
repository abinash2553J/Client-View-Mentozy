import { Target, Heart, Users } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Democratizing <span className="text-amber-600">Mentorship</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We believe that guidance shouldn't be a privilege. Mentozy is building a world where every ambitious learner has access to the wisdom of those who came before them.
          </p>
        </div>

        {/* Mission Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="text-center p-8 bg-amber-50/50 rounded-2xl border border-amber-100">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Mission</h3>
            <p className="text-gray-600">To bridge the gap between academic theory and real-world application through human-led guidance.</p>
          </div>
          <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-gray-600 shadow-sm">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Values</h3>
            <p className="text-gray-600">We prioritize trust, practical skills, and community growth over profit and empty certificates.</p>
          </div>
          <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-gray-600 shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
            <p className="text-gray-600">A verified network of 50,000+ learners and 500+ mentors helping each other succeed.</p>
          </div>
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              Mentozy started with a simple observation: students were graduating with degrees but without the skills industries actually needed. The missing link wasn't content—there's plenty of that online—it was <strong>context</strong>.
            </p>
            <p className="mb-6">
              We realized that one conversation with a senior in the field was often worth more than 10 hours of video lectures. That insight led to the creation of Mentozy.
            </p>
            <p>
              Today, we are a team of passionate educators, engineers, and designers working to make that "one conversation" scalable and accessible to everyone, everywhere.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}