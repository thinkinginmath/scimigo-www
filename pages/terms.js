import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/Legal.module.css';

export default function Terms() {
  return (
    <Layout 
      title="Terms of Service - SciMigo" 
      description="SciMigo Terms of Service - Understand your rights and responsibilities when using our platform"
    >
      <Head>
        <link rel="canonical" href="https://www.scimigo.com/terms" />
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.lastUpdated}>Last updated: June 26, 2025</p>

          <section className={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using SciMigo ("the Service"), you agree to be bound by these Terms of Service 
              and our Privacy Policy. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Description of Service</h2>
            <p>
              SciMigo is an AI-powered educational platform designed to provide assistance in Science, Technology, 
              Engineering, and Mathematics (STEM) subjects. The Service includes access to AI tutors, educational 
              content, and learning tools.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Appropriate Use</h2>
            <p>You agree to use the Service only for lawful educational purposes. Specifically, you must:</p>
            <ul>
              <li>Use the Service exclusively for educational assistance in STEM-related subjects</li>
              <li>Not submit content that is inappropriate, illegal, harmful, offensive, or discriminatory</li>
              <li>Not attempt to circumvent any content filtering or security measures</li>
              <li>Not use the Service for academic dishonesty or plagiarism</li>
              <li>Not impersonate others or provide false information</li>
              <li>Not interfere with or disrupt the Service or servers</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. User Accounts</h2>
            <p>
              To access certain features, you may need to create an account. You are responsible for:
            </p>
            <ul>
              <li>Providing accurate and complete information</li>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. Privacy and Personal Information</h2>
            <p>
              Your use of our Service is also governed by our Privacy Policy. By using the Service, you consent to:
            </p>
            <ul>
              <li>The collection and use of information as described in our Privacy Policy</li>
              <li>Processing of your interactions through third-party AI providers</li>
              <li>Not sharing private, personal, or sensitive information during AI interactions</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by SciMigo and are 
              protected by international copyright, trademark, patent, trade secret, and other intellectual 
              property laws. You may not:
            </p>
            <ul>
              <li>Copy, modify, or distribute the Service's content without permission</li>
              <li>Use our trademarks or logos without written consent</li>
              <li>Reverse engineer or attempt to extract the source code</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. User Content</h2>
            <p>
              By submitting content to the Service, you grant us a worldwide, non-exclusive, royalty-free license to:
            </p>
            <ul>
              <li>Use, reproduce, and process your content to provide the Service</li>
              <li>Analyze and improve our AI models and educational offerings</li>
              <li>Create anonymized and aggregated data for research purposes</li>
            </ul>
            <p>You retain ownership of your content and are responsible for ensuring it doesn't violate any third-party rights.</p>
          </section>

          <section className={styles.section}>
            <h2>8. Disclaimers</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. We do not guarantee:
            </p>
            <ul>
              <li>The accuracy, completeness, or usefulness of any information provided</li>
              <li>That the Service will be uninterrupted or error-free</li>
              <li>Specific learning outcomes or academic results</li>
            </ul>
            <p>
              The Service is an educational aid and should not replace professional instruction, textbooks, or 
              verified educational resources. Always verify important information independently.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, SciMigo and its affiliates shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages resulting from your use or 
              inability to use the Service.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless SciMigo from any claims, damages, or expenses 
              arising from your violation of these Terms or your use of the Service.
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your access to the Service immediately, without prior notice, for any 
              reason, including breach of these Terms. Upon termination, your right to use the Service will cease.
            </p>
          </section>

          <section className={styles.section}>
            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of any material changes 
              by posting the new Terms on this page. Your continued use of the Service after changes constitutes 
              acceptance of the new Terms.
            </p>
          </section>

          <section className={styles.section}>
            <h2>13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, 
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section className={styles.section}>
            <h2>14. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Email: <a href="mailto:support@scimigo.com">support@scimigo.com</a>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
