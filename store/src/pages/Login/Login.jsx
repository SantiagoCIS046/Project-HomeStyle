import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { ShoppingCart, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ShinyText from '../../components/ShinyText/ShinyText';
import './Login.css';
import sneakerImg from '../../assets/images/sneaker_new_drop.png';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine user name to store
    const userName = isLogin ? (email.split('@')[0] || 'User') : name;

    // Persist to localStorage
    localStorage.setItem('homestyle_user', JSON.stringify({
      name: userName,
      isLoggedIn: true,
      lastAuth: new Date().toISOString()
    }));

    console.log(isLogin ? 'Logging in...' : 'Registering...');
    navigate('/home');
  };

  return (
    <div className="login-page">
      {/* Top Header */}
      <header className="login-header">
        <Link to="/home" className="header-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="logo-grid">
            <div className="grid-point"></div>
            <div className="grid-point"></div>
            <div className="grid-point"></div>
            <div className="grid-point"></div>
          </div>
          <ShinyText
            text="HOMESTYLE"
            speed={2}
            delay={0.5}
            className="logo-text-large"
            color="#b5b5b5"
            shineColor="#ffffff"
          />
        </Link>
      </header>

      <main className="login-main">
        {/* Left: Hero Section */}
        <section className="login-hero-section">
          <motion.div
            className="bg-text-large"
            animate={{
              x: [0, 20, 0],
              y: ["-50%", "-52%", "-50%"],
              opacity: [0.05, 0.08, 0.05]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            URB
          </motion.div>

          <div className="hero-main-content">
            <motion.div
              className="hero-title"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                ACCESO
              </motion.h1>
              <motion.h1
                className="radical"
                animate={{ skewX: [-10, -12, -10], x: [0, 2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                RADICAL
              </motion.h1>
            </motion.div>

            <motion.div
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p>Inicia sesión para desbloquear el drop exclusivo. Sin reglas, solo estilo urbano puro.</p>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ y: 0 }}
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.05,
                rotate: [-1, 1, -1],
                filter: "drop-shadow(0 30px 50px rgba(26, 92, 255, 0.3))"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Technical Accents */}
              <div className="corner-tl"></div>
              <div className="corner-br"></div>
              <div className="visual-marker top-left">DRP // 001</div>
              <div className="visual-marker bottom-right">STYLE: URB-INDUSTRIAL</div>

              <img
                src={sneakerImg}
                alt="New Drop sneaker"
                className="sneaker-img"
              />
              <div className="drop-badge">
                NEW DROP [2024]
              </div>
            </motion.div>
          </div>
        </section>

        {/* Right: Form Section */}
        <section className="login-form-section">
          <div className={`form-wrapper ${!isLogin ? 'registration-mode' : ''}`}>
            <form className="login-form-box" onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>
                {isLogin ? 'BIENVENIDO' : 'CREAR CUENTA'}
              </h2>

              {!isLogin && (
                <div className="form-group-custom">
                  <label htmlFor="name" style={{ color: 'var(--primary-blue)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '2px' }}>NOMBRE COMPLETO</label>
                  <div className="input-container-custom">
                    <input
                      id="name"
                      type="text"
                      placeholder="TU NOMBRE"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-group-custom">
                <label htmlFor="email" style={{ color: 'var(--primary-blue)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '2px' }}>EMAIL</label>
                <div className="input-container-custom">
                  <input
                    id="email"
                    type="email"
                    placeholder="USUARIO@HOMESTYLE.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group-custom">
                <label htmlFor="password" style={{ color: 'var(--primary-blue)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '2px' }}>CONTRASEÑA</label>
                <div className="input-container-custom">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="form-footer-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  <label className="checkbox-container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ display: 'none' }} />
                    <div className="custom-checkbox" style={{ width: '18px', height: '18px', border: '2px solid var(--border-dark)' }}></div>
                    <span>RECUÉRDAME</span>
                  </label>
                  <a href="#" className="forgot-link" style={{ color: 'var(--text-white)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>¿OLVIDASTE LA CLAVE?</a>
                </div>
              )}

              <button type="submit" className="btn-login-main">
                {isLogin ? 'INICIAR SESIÓN' : 'REGISTRARSE'} <ArrowRight size={20} />
              </button>

              <div className="no-account-divider">
                {isLogin ? '¿SIN CUENTA?' : '¿YA TIENES CUENTA?'}
              </div>

              <button
                type="button"
                className="btn-create-account"
                onClick={() => setIsLogin(!isLogin)}
                style={{ width: '100%', padding: '1.25rem', backgroundColor: 'transparent', border: '1px solid var(--border-dark)', color: 'white', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                {isLogin ? 'CREAR CUENTA' : 'VOLVER AL LOGIN'}
              </button>
            </form>

            <footer className="form-legal-footer">
              <span>TÉRMINOS</span>
              <span>PRIVACIDAD</span>
              <span>COOKIES</span>
            </footer>

            <div className="copyright-text">
              © HOMESTYLE INDUSTRIAL MMXXIV
            </div>
          </div>

          <div className="side-marker-text">
            STREETWEAR_DIV_001
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
