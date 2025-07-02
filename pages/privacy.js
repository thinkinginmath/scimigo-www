import Layout from '../components/Layout';
import styles from '../styles/Legal.module.css';

export default function Privacy() {
  return (
    <Layout 
      title="Privacy Policy - SciMigo" 
      description="SciMigo Privacy Policy - Learn how we collect, use, and protect your data"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last updated: June 25, 2025</p>

          <section className={styles.section}>
            <h2>Introduction</h2>
            <p>
              Welcome to SciMigo! We are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered STEM tutor platform.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Information We Collect</h2>
            <h3>Information You Provide</h3>
            <ul>
              <li>Account information (email address, username)</li>
              <li>Educational content and questions you submit</li>
              <li>Feedback and communications with us</li>
            </ul>
            
            <h3>Automatically Collected Information</h3>
            <ul>
              <li>Usage data and analytics</li>
              <li>Device information and browser type</li>
              <li>IP address and general location data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Provide and improve our AI tutoring services</li>
              <li>Personalize your learning experience</li>
              <li>Analyze usage patterns to enhance our platform</li>
              <li>Communicate with you about our services</li>
              <li>Ensure platform security and prevent abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Third-Party Services</h2>
            <p>
              Your interactions with our AI tutor are processed through third-party AI providers, including OpenAI. 
              We recommend reviewing their privacy policies to understand how they handle data:
            </p>
            <ul>
              <li><a href="https://openai.com/privacy/" target="_blank" rel="noopener noreferrer">OpenAI Privacy Policy</a></li>
            </ul>
            <p>
              We also use Google Analytics to understand how users interact with our website. 
              You can learn more about Google's data practices <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">here</a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Chrome Extension User Control</h2>
            <p>
              Our Chrome extension is designed with privacy-first principles and user control in mind:
            </p>
            <ul>
              <li><strong>No Silent Data Collection:</strong> No data is transmitted automatically - users must actively click to send requests</li>
              <li><strong>Full Transparency:</strong> Users can see exactly what text and data will be sent to our API before submission</li>
              <li><strong>User Editing Control:</strong> All content can be reviewed and edited by the user before transmission</li>
              <li><strong>Explicit Consent:</strong> Each API request requires deliberate user action and approval</li>
              <li><strong>No Background Processing:</strong> The extension only processes data when explicitly activated by the user</li>
            </ul>
            <p>
              This approach ensures that users maintain complete control over what information is shared and when, 
              making our extension significantly more privacy-friendly than services that automatically collect or transmit data.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
              internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
              Privacy Policy, unless a longer retention period is required by law. Educational content and interactions 
              may be anonymized and retained for service improvement purposes.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data</li>
              <li>Data portability</li>
              <li>Objection to certain processing activities</li>
            </ul>
            <p>To exercise these rights, please contact us at info@scimigo.com.</p>
          </section>

          <section className={styles.section}>
            <h2>Children's Privacy</h2>
            <p>
              Our service is intended for educational use by students. If you are under 13 years of age, 
              please use our service only with parental consent and supervision. We do not knowingly collect 
              personal information from children under 13 without parental consent.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p>
              Email: <a href="mailto:info@scimigo.com">info@scimigo.com</a>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
