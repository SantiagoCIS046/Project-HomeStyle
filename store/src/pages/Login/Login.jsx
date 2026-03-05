import React from 'react';
import { Mail, Lock, Github, Chrome, Shirt } from 'lucide-react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      {/* Hero Section */}
      <section className="login-hero">
        <div className="hero-overlay">
          <div className="logo-icon">
            <Shirt color="white" size={20} />
          </div>
          <span className="logo-text">HomeStyle</span>
        </div>

        <div className="hero-content">
          <h1>Hecho a su medida.</h1>
          <p>Únete a nuestra comunidad exclusiva de conocedores de camisas y accede a ediciones limitadas y colecciones personalizadas.</p>
        </div>
      </section>

      {/* Auth Section */}
      <section className="login-auth">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Bienvenido de nuevo</h2>
            <p>Por favor, introduce tus datos para acceder a tu cuenta.</p>
          </div>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Correo electrónico</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input type="email" placeholder="nombre@empresa.com" required />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>Contraseña</label>
                <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input type="password" placeholder="••••••••" required />
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Recuérdame por 30 días</span>
              </label>
            </div>

            <button type="submit" className="btn-primary">Iniciar sesión</button>

            <div className="divider">O continuar con</div>

            <div className="social-buttons">
              <button type="button" className="btn-social">
                <Chrome size={20} />
                <span>Google</span>
              </button>
              <button type="button" className="btn-social">
                <Github size={20} />
                <span>GitHub</span>
              </button>
            </div>

            <p className="register-prompt">
              ¿No tienes una cuenta? <a href="#">Regístrate</a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
