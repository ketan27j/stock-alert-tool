import React from 'react';

const Layout: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
