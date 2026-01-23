import { BookOpen, Clock, BarChart, CheckCircle2, ArrowRight } from 'lucide-react';

export function TracksPage() {
  const tracks = [
    {
      title: "Full Stack Web Development",
      level: "Beginner to Advanced",
      duration: "6 Months",
      projects: 8,
      description: "Master the MERN stack (MongoDB, Express, React, Node.js) and build production-ready applications.",
      modules: ["HTML/CSS & JavaScript", "React & State Management", "Node.js & APIs", "Database Design", "Deployment & DevOps"]
    },
    {
      title: "Data Structures & Algorithms",
      level: "Intermediate",
      duration: "3 Months",
      projects: 40,
      description: "Crack coding interviews at top tech companies. Focus on problem-solving patterns and optimization.",
      modules: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "System Design Basics", "Mock Interviews"]
    },
    {
      title: "Product Management",
      level: "Beginner",
      duration: "4 Months",
      projects: 5,
      description: "Learn how to build products users love. From user research to roadmap planning and launch.",
      modules: ["Market Research", "User Personas", "Wireframing", "Agile Methodologies", "Go-to-Market Strategy"]
    },
    {
      title: "UI/UX Design",
      level: "Beginner",
      duration: "4 Months",
      projects: 6,
      description: "Design beautiful and functional interfaces. Master Figma, prototyping, and design systems.",
      modules: ["Design Principles", "Figma Mastery", "User Research", "Prototyping", "Portfolio Building"]
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-600 font-semibold tracking-wider text-sm uppercase mb-3 block">
            Curriculum
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Structured Learning Tracks
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive roadmaps designed by industry experts to take you from zero to job-ready.
          </p>
        </div>

        <div className="grid gap-8 max-w-5xl mx-auto">
          {tracks.map((track, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{track.title}</h2>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">{track.description}</p>
                </div>
                <div className="flex flex-col gap-2 min-w-[140px]">
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                      <BarChart className="w-4 h-4 text-amber-500" /> {track.level}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4 text-amber-500" /> {track.duration}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                      <BookOpen className="w-4 h-4 text-amber-500" /> {track.projects} Projects
                   </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Syllabus Highlights</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {track.modules.map((mod, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      {mod}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button className="flex items-center gap-2 text-amber-600 font-bold hover:gap-3 transition-all">
                  View Full Syllabus <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}