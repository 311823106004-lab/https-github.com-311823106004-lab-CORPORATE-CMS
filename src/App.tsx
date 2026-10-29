/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { WebsiteLayout } from './components/website/WebsiteLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginScreen } from './components/admin/AdminLoginScreen';

const MainAppContent: React.FC = () => {
  const { viewMode, isAuthenticated } = useApp();

  if (viewMode === 'login') {
    return <AdminLoginScreen />;
  }

  if (viewMode === 'admin') {
    if (!isAuthenticated) {
      return <AdminLoginScreen />;
    }
    return <AdminLayout />;
  }

  return <WebsiteLayout />;
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
