import React, {useState} from 'react';
import {ReactComponent as Arrow} from '../assets/images/gps-arrow-svgrepo-com.svg';

interface Props {
    children: React.ReactNode;
    zoomValue: number;
    setZoomValue: React.Dispatch<React.SetStateAction<number>>;
    setViewport: React.Dispatch<React.SetStateAction<{
        offset: {
            x: number;
            y: number;
        }
    }>>;
}
const Layout: React.FC<Props> = ({children, zoomValue, setZoomValue, setViewport}) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
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

    const moveToCenter = () => setViewport({
        offset: {
            x: 0.0,
            y: 0.0
        }
    })

    const zoomPlus = () => {
        if(zoomValue < 1.5){
            setZoomValue((prev) => prev + 0.1)
        }
    }

    const zoomMinus = () => {
        if(zoomValue > 0.25){
            setZoomValue((prev) => prev - 0.1)
        }
    }

    const togModal = () => setIsOpenModal(!isOpenModal)

    const selectModal = () => (
        <React.Fragment>
            <div className='selectModalContainer'>
                {selectOptions.map((option) => (
                    <div onClick={() => {setZoomValue(option.value); setIsOpenModal(false)}} className='option'>
                        {option.label} {Math.round(zoomValue * 100) === option.value * 100 && <div className='checkmark-selector'/>}
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
                    <button onClick={moveToCenter} className='header-button-nav mr'><Arrow/></button>
                    <button onClick={zoomMinus} className='header-button-nav bg'> - </button>
                    <button onClick={togModal} className='header-button-nav'> {Math.round(zoomValue * 100)}% </button>
                    <button onClick={zoomPlus} className='header-button-nav bg'> + </button>
                    {isOpenModal && selectModal()}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Layout;