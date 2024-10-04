import { useState } from 'react';
import '../styles/slice.css';

type SliceProps = {
    title: string;
    imageUrl: string;
    body: string;
};

export function Slice( { title, imageUrl, body }: SliceProps ) {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='slice'>
            <h2>{title}</h2>
            <img src={imageUrl} alt={title} />
            <p>
                {isExpanded ? body : `${body.substring(0, 100)}...`}
            </p>
            <button onClick={toggleExpanded}>
                {isExpanded ? 'Show less' : 'Read more'}
            </button>
        </div>
    );
}
