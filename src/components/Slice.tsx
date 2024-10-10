import { useState } from 'react';
import '../styles/slice.css';
import {Button, Divider} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
                <Divider />
            </p>

            <Button onClick={toggleExpanded} variant="contained">
                {isExpanded ? 'Show less' : 'Read more'}
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
        </div>
    );
}
