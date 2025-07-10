import React from 'react';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div className='app'>
      <header className='app-header'>
        <h1>{props.title}</h1>
      </header>
      <main className='app-main'>
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
