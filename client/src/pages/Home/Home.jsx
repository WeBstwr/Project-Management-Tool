import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './home.css';

function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleLearnMore = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      // Scroll to features section
      document.querySelector('.features').scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Streamline Your Projects with 
            <span className="highlight"> ProjectManager</span>
          </h1>
          <p className="hero-subtitle">
            Collaborate seamlessly, track progress efficiently, and deliver projects on time. 
            The ultimate project management tool for teams of all sizes.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Active Teams</span>
            </div>
            <div className="stat">
              <span className="stat-number">99%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="mockup">
            <div className="mockup-header">
              <div className="mockup-dot"></div>
              <div className="mockup-dot"></div>
              <div className="mockup-dot"></div>
            </div>
            <div className="mockup-content">
              <div className="mockup-card">
                <div className="mockup-card-header">Project Alpha</div>
                <div className="mockup-task">✅ Design Review</div>
                <div className="mockup-task">🔄 Development</div>
                <div className="mockup-task">⏳ Testing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose ProjectManager?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Project Boards</h3>
            <p>Organize your projects with intuitive Kanban boards. Visualize progress and keep everyone on the same page.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Team Collaboration</h3>
            <p>Assign tasks, share updates, and communicate seamlessly within your projects. Real-time collaboration made easy.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Task Management</h3>
            <p>Create, assign, and track tasks with detailed descriptions, due dates, and status updates.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Comments & Communication</h3>
            <p>Discuss tasks, share feedback, and keep conversations organized within each project context.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Smart Notifications</h3>
            <p>Stay updated with real-time notifications for task assignments, project updates, and team activities.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Monitor project progress, track completion rates, and identify bottlenecks with comprehensive analytics.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          {isAuthenticated ? (
            <>
              <h2>Welcome Back!</h2>
              <p>Ready to continue managing your projects? Jump back into your workspace and keep the momentum going.</p>
              <div className="cta-buttons">
                <button className="cta-primary" onClick={handleGetStarted}>
                  Go to Dashboard
                </button>
                <button className="cta-secondary" onClick={() => navigate('/projects')}>
                  View Projects
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>Ready to Transform Your Project Management?</h2>
              <p>Join thousands of teams who have already improved their productivity and collaboration.</p>
              <div className="cta-buttons">
                <button className="cta-primary" onClick={handleGetStarted}>
                  Get Started Free
                </button>
                <button className="cta-secondary" onClick={handleLearnMore}>
                  Learn More
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;