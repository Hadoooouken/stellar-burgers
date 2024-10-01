import { ConstructorPage, Feed,Login,Register } from '@pages';
import { Routes, Route } from "react-router-dom";

import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <ConstructorPage />

    <Routes>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="//forgot-password" element={<Register />} />
      </Routes>
  </div>
);

export default App;
