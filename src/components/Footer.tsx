
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black py-12 text-white mt-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-white/80 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/safety" className="text-white/80 hover:text-white transition-colors">Safety Information</Link></li>
              <li><Link to="/cancellation" className="text-white/80 hover:text-white transition-colors">Cancellation Options</Link></li>
              <li><Link to="/fup-program" className="text-white/80 hover:text-white transition-colors">FUP Program</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Community</h3>
            <ul className="space-y-2">
              <li><Link to="/filmmakers" className="text-white/80 hover:text-white transition-colors">For Filmmakers</Link></li>
              <li><Link to="/homeowners" className="text-white/80 hover:text-white transition-colors">For Property Owners</Link></li>
              <li><Link to="/resources" className="text-white/80 hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/damage-deposit" className="text-white/80 hover:text-white transition-colors">Damage Deposit</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">About</h3>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="text-white/80 hover:text-white transition-colors">How it Works</Link></li>
              <li><Link to="/news" className="text-white/80 hover:text-white transition-colors">Newsroom</Link></li>
              <li><Link to="/investors" className="text-white/80 hover:text-white transition-colors">Investors</Link></li>
              <li><Link to="/our-company" className="text-white/80 hover:text-white transition-colors">Our Company</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Connect with Us</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/filmloca" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="text-white/80 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com/filmloca" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter" className="text-white/80 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com/filmloca" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="text-white/80 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://youtube.com/@filmloca" target="_blank" rel="noopener noreferrer" aria-label="Follow us on YouTube" className="text-white/80 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-white/80">© 2025 FilmLoca. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-white/80 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-white/80 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
