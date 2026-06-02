'use client';

import { useLanguage } from '@/lib/i18nContext';
import { Shield, BookOpen, Users, Activity } from 'lucide-react';
import styles from './page.module.css';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('sidebar.terms')} & App Details</h1>
        <p className={styles.subtitle}>
          Information regarding the Multi-Domain Work Scheduler application, its processes, and usage guidelines.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <BookOpen size={20} />
          About the Application
        </h2>
        <p className={styles.text}>
          The Multi-Domain Work Scheduler is a centralized platform designed to manage workspaces (Domains), collaborate with team members, and track tasks effectively. 
          It supports multiple languages (English, Telugu, Hindi) and provides real-time task management for organizations of all sizes.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Activity size={20} />
          Core Process & Workflow
        </h2>
        <p className={styles.text}>
          The application follows a structured workflow to ensure smooth team collaboration:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong>Domain Creation:</strong> Any registered user can create a new workspace (Domain). The creator automatically becomes the Admin of that domain.
          </li>
          <li className={styles.listItem}>
            <strong>Invitations:</strong> Admins and Sub-Admins can invite other users to their domain via email. Users will receive an invitation in their dashboard and can accept or decline.
          </li>
          <li className={styles.listItem}>
            <strong>Task Management:</strong> Once inside a domain, members can view, create, and manage tasks depending on their role permissions.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Users size={20} />
          Roles and Permissions
        </h2>
        <p className={styles.text}>
          Access within each Domain is strictly controlled through three hierarchical roles:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong>Admin:</strong> Has full control over the domain. Can invite new members, promote/demote users, delete the domain, and manage all tasks.
          </li>
          <li className={styles.listItem}>
            <strong>Sub-Admin:</strong> Assists the Admin in managing the domain. Can invite new members, create/edit tasks, but cannot delete the domain or remove the Admin.
          </li>
          <li className={styles.listItem}>
            <strong>Member:</strong> The standard role. Members can view the domain and manage tasks they are assigned to or have permission to edit, but cannot manage other users.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Shield size={20} />
          Terms of Service
        </h2>
        <p className={styles.text}>
          By using this application, you agree to use the platform responsibly and collaboratively. 
          The data you store in domains is protected by secure authentication (JWT) and database encryption (TiDB Cloud). 
          Please do not upload sensitive personal data without proper authorization from your domain Admin.
        </p>
      </div>
    </div>
  );
}
