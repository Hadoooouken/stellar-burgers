import { ConstructorPage } from '@pages';
import { Routes, Route } from "react-router-dom";

import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <ConstructorPage />

    <Routes>
        <Route path="/" element={<ConstructorPage />}>
      </Routes>
  </div>
);

export default App;
