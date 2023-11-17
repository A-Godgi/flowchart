import React, {useState} from 'react';
import { ReactComponent as Arrow} from '../assets/images/gps-arrow-svgrepo-com.svg';

interface Props {
    children: React.ReactNode;
}
const Layout: React.FC<Props> = ({children}) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const selectOptions = [
        {label: '25%', value: 0.25},
        {label: '30%', value: 0.3},
        {label: '40%', value: 0.4},
        {label: '50%', value: 0.5},
        {label: '60%', value: 0.6},
        {label: '70%', value: 0.7},
        {label: '80%', value: 0.8},
        {label: '90%', value: 0.9},
        {label: '100%', value: 1},
        {label: '125%', value: 1.25},
        {label: '150%', value: 1.5},
    ]

    const togDropdown = () => setIsOpenDropdown(!isOpenDropdown)

    const selectDropdown = () => (
        <React.Fragment>
            <div className='selectModalContainer'>
                {selectOptions.map((option) => (
                    <div onClick={() => {setIsOpenDropdown(false)}} className='option'>
                        {option.label}
                    </div>
                ))}
            </div>
        </React.Fragment>
    )

    return (
        <div className='layout-container'>
            <div className='header'>
                <div className='d-flex align-items-center'>
                    <h1 className='header_title'>Services</h1>
                    <span className='header_counter'>0</span>
                </div>
                <div className='d-flex align-items-center position-relative'>
                    <button className='header-button-primary'>List view</button>
                    <button className='header-button-nav mr'><Arrow/></button>
                    <button className='header-button-nav bg'> - </button>
                    <button onClick={togDropdown} className='header-button-nav'> 100% </button>
                    <button className='header-button-nav bg'> + </button>
                    {isOpenDropdown && selectDropdown()}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Layout;