<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import CartSidebar from "./components/CartSidebar.vue";

const route = useRoute();

// Show header only on catalog page
const showHeader = computed(() => route.path === "/");
</script>

<template>
  <div class="app-container">
    <!-- Cart Sidebar -->
    <CartSidebar />

    <!-- Header with Logo (only on home page) -->
    <header v-if="showHeader" class="header">
      <div class="header-background">
        <div class="animated-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>

      <div class="header-content">
        <div class="logo-container">
          <div class="logo-wrapper">
            <img src="/Logo.png" class="logo" alt="SC HomeStyle Logo" />
            <div class="logo-glow"></div>
          </div>
        </div>

        <div class="brand-info">
          <h1 class="brand-title">
            <span class="title-line">SC</span>
            <span class="title-line title-main">Home Style</span>
          </h1>
          <div class="divider"></div>
          <p class="brand-subtitle">
            <span class="subtitle-icon">✦</span>
            Tu estilo, tu hogar, tu esencia
            <span class="subtitle-icon">✦</span>
          </p>
          <div class="brand-tags">
            <span class="tag">Estilo Único</span>
            <span class="tag">Calidad Premium</span>
            <span class="tag">Diseño Exclusivo</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; HomeStyle. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f8f8 100%);
}

.header {
  position: relative;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.6) 100%
    ),
    repeating-linear-gradient(
      90deg,
      #0a0a0a 0px,
      #0a0a0a 2px,
      #121212 2px,
      #121212 4px
    );
  padding: 80px 20px;
  text-align: center;
  overflow: hidden;
  margin-bottom: 40px;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(90deg, #00d4ff, #0080ff, #00d4ff) 1;
  box-shadow: inset 0 -20px 40px rgba(0, 0, 0, 0.5),
    0 10px 30px rgba(0, 0, 0, 0.8);
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  background: radial-gradient(
      circle at 20% 50%,
      rgba(0, 212, 255, 0.04) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 50%,
      rgba(0, 128, 255, 0.04) 0%,
      transparent 50%
    );
}

.animated-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  opacity: 0.08;
  animation: float 25s infinite ease-in-out;
  filter: blur(2px);
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #00d4ff, #0080ff);
  top: -150px;
  left: -150px;
  animation-delay: 0s;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #00a8ff, #0080ff);
  bottom: -100px;
  right: 5%;
  animation-delay: 8s;
  border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
}

.shape-3 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, #00d4ff, #00a8ff);
  top: 40%;
  right: -120px;
  animation-delay: 15s;
  border-radius: 50% 50% 30% 70% / 30% 70% 70% 30%;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

.header-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.logo-container {
  margin-bottom: 40px;
}

.logo-wrapper {
  position: relative;
  display: inline-block;
  animation: fadeInDown 1.2s ease-out;
}

.logo {
  height: 220px;
  width: 220px;
  object-fit: cover;
  border-radius: 50%;
  border: 6px solid transparent;
  background: linear-gradient(#0a0a0a, #0a0a0a) padding-box,
    linear-gradient(135deg, #00d4ff, #0080ff, #00d4ff) border-box;
  filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.6))
    drop-shadow(0 0 60px rgba(0, 128, 255, 0.4));
  transition: all 0.5s ease;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 40px rgba(0, 212, 255, 0.5), 0 0 80px rgba(0, 128, 255, 0.3),
    inset 0 0 20px rgba(0, 212, 255, 0.2);
  animation: logo-pulse 3s infinite ease-in-out;
}

@keyframes logo-pulse {
  0%,
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.6))
      drop-shadow(0 0 60px rgba(0, 128, 255, 0.4));
  }
  50% {
    transform: scale(1.05);
    filter: drop-shadow(0 0 40px rgba(0, 212, 255, 0.8))
      drop-shadow(0 0 80px rgba(0, 128, 255, 0.6));
  }
}

.logo:hover {
  transform: scale(1.15) rotate(10deg);
  filter: drop-shadow(0 0 50px rgba(0, 212, 255, 0.9))
    drop-shadow(0 0 100px rgba(0, 128, 255, 0.7));
  border-width: 8px;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 280px;
  background: radial-gradient(
    circle,
    rgba(0, 212, 255, 0.4) 0%,
    rgba(0, 128, 255, 0.2) 30%,
    transparent 70%
  );
  border-radius: 50%;
  animation: pulse-glow 2.5s infinite;
  z-index: 1;
}

@keyframes pulse-glow {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 1;
  }
}

.brand-info {
  animation: fadeInUp 1s ease-out;
}

.brand-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
}

.title-line {
  display: block;
  background: linear-gradient(
    90deg,
    #00d4ff,
    #0080ff,
    #00a8ff,
    #0080ff,
    #00d4ff
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 8px;
  animation: gradient-shift 4s linear infinite;
  filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.6));
}

.title-main {
  font-size: 4rem;
  letter-spacing: 12px;
  font-weight: 900;
  filter: drop-shadow(0 0 30px rgba(0, 128, 255, 0.8));
}

@keyframes gradient-shift {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

.divider {
  width: 200px;
  height: 4px;
  background: linear-gradient(
    90deg,
    transparent,
    #00d4ff,
    #0080ff,
    #00d4ff,
    transparent
  );
  margin: 0 auto 20px;
  border-radius: 2px;
  animation: expand 2s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
}

@keyframes expand {
  0%,
  100% {
    width: 200px;
    opacity: 0.6;
  }
  50% {
    width: 300px;
    opacity: 1;
  }
}

.brand-subtitle {
  font-size: 1.3rem;
  color: #e0e0e0;
  margin: 0 0 25px 0;
  font-style: italic;
  letter-spacing: 3px;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  animation: fadeIn 1.5s ease-out;
}

.subtitle-icon {
  color: #00d4ff;
  font-size: 0.9rem;
  animation: sparkle 2s infinite;
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.8));
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.4);
  }
}

.brand-tags {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 25px;
  animation: fadeIn 2s ease-out;
}

.tag {
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.25),
    rgba(0, 128, 255, 0.15)
  );
  border: 2px solid rgba(0, 212, 255, 0.4);
  color: #00d4ff;
  padding: 10px 24px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  cursor: default;
  box-shadow: 0 4px 15px rgba(0, 212, 255, 0.2);
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.tag:hover {
  transform: translateY(-5px) scale(1.05);
  border-color: #00d4ff;
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.4),
    rgba(0, 128, 255, 0.3)
  );
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.5),
    0 0 40px rgba(0, 128, 255, 0.4);
  color: #ffffff;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

main {
  padding: 0 20px 40px;
}

.footer {
  background: #1a1a1a;
  color: #b0b0b0;
  text-align: center;
  padding: 30px 20px;
  margin-top: 60px;
  border-top: 3px solid #4a90e2;
}

.footer p {
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .header {
    padding: 50px 15px;
  }

  .logo {
    height: 160px;
    width: 160px;
  }

  .logo-glow {
    width: 200px;
    height: 200px;
  }

  .brand-title {
    font-size: 2.2rem;
  }

  .title-line {
    letter-spacing: 4px;
  }

  .title-main {
    font-size: 2.8rem;
    letter-spacing: 6px;
  }

  .brand-subtitle {
    font-size: 0.95rem;
    letter-spacing: 2px;
  }

  .brand-tags {
    gap: 10px;
  }

  .tag {
    font-size: 0.7rem;
    padding: 8px 16px;
  }

  .shape-1 {
    width: 250px;
    height: 250px;
  }

  .shape-2 {
    width: 200px;
    height: 200px;
  }

  .shape-3 {
    width: 220px;
    height: 220px;
  }
}
</style>
