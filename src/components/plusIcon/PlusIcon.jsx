import { useState } from 'react';
import './plus-icon.css';
import {BiPlus} from 'react-icons/bi';


const PlusIcon = (props) => {
    const { hoverText, action } = props;
    const [hovered, setHovered] = useState(false);

  return (
    <div 
        className='plus-icon-con' 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={action}
    >
       <BiPlus className='plus-icon' />
       {hovered &&
        <div className="plus-icon-hover">
            {hoverText}
        </div>
       }

    </div>
  )
}

export default PlusIcon