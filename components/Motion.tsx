'use client';

import { motion } from 'framer-motion';
import styles from './PageSocial.module.css';
import cs from 'classnames';
import React from 'react';

type Props = {
  href: string;
  title: string;
  name: string;
  icon: JSX.Element;
};

const Motion = ({ href, title, name, icon }: Props) => {
  return (
    <motion.a
      initial={false}
      animate={{ scale: [1.6, 1] }}
      whileHover={{ scale: 1.2 }}
      transition={{ type: 'spring', duration: 0.2 }}
      className={cs(styles.action, styles[name])}
      href={href}
      key={name}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.actionBg}>
        <div className={styles.actionBgPane} />
      </div>

      <div className={styles.actionBg}>{icon}</div>
    </motion.a>
  );
};

export default Motion;
