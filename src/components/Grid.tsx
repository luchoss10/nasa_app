import { ReactNode } from 'react';
import '../styles/Grid.css';

type GridProps = {
    children: ReactNode;
};

export function Grid( { children }: GridProps ) {
    return (
        <div className='grid-container'>
            {children}
        </div>
    );
}


