const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 space-y-3">
          <h3 className="text-white font-bold text-xl">DigiTools</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Premium digital tools for creators, professionals, and businesses. Work smarter
            with our suite of powerful tools.
          </p>
        </div>

        {/* Product */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm">Product</h4>
          <ul className="space-y-2 text-sm">
            {["Features", "Pricing", "Templates", "Integrations"].map((item) => (
              <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm">Company</h4>
          <ul className="space-y-2 text-sm">
            {["About", "Blog", "Careers", "Press"].map((item) => (
              <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm">Resources</h4>
          <ul className="space-y-2 text-sm">
            {["Documentation", "Help Center", "Community", "Contact"].map((item) => (
              <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm">Social Links</h4>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-700 hover:bg-violet-600 flex items-center justify-center transition-colors text-sm">▶</a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-700 hover:bg-violet-600 flex items-center justify-center transition-colors text-sm">f</a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-700 hover:bg-violet-600 flex items-center justify-center transition-colors text-sm">𝕏</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p>© 2026 DigiTools. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;