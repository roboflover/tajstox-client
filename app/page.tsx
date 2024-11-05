// pages/index.tsx
'use client'
import React from 'react';
import {ParticlesContainer} from './components/Particles';

const Home: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {/* <Head>
                <title>Next.js Particles</title>
                <meta name="description" content="Particles example using Next.js and TypeScript" />
            </Head> */}
            <ParticlesContainer/>
        </div>
    );
};

export default Home;

