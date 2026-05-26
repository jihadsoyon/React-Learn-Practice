import React from "react";
import { Link } from "react-router-dom";
import { Heart, Code2, Globe, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-800 border-t border-gray-100 dark:border-dark-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-display font-bold text-gray-900 dark:text-white text-lg">
                Remotely<span className="text-primary-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Find the best remote jobs from top companies worldwide.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://github.com" target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-500 hover:text-primary-500 transition-colors">
                <Code2 size={15} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-500 hover:text-primary-500 transition-colors">
                <Globe size={15} />
              </a>
              <a href="mailto:hello@remotely.com"
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-500 hover:text-primary-500 transition-colors">
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Jobs */}
          <div>
            <h4 className="font-display font-semibold text-gray-900 dark:text-white text-sm mb-4">Jobs</h4>
            <ul className="space-y-2">
              {["Browse All Jobs", "Remote Jobs", "Full-time", "Internships", "Part-time"].map((item) => (
                <li key={item}>
                  <Link to="/jobs" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-gray-900 dark:text-white text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Blog", "Careers", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-gray-900 dark:text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 dark:border-dark-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Remotely. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            Made with for remote workers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;