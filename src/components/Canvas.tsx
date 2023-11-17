import React, {useEffect, useRef, useState} from 'react';

interface Props {
    zoomValue: number;
    setZoomValue:  React.Dispatch<React.SetStateAction<number>>;
    viewport: {
        offset: {
            x: number;
            y: number;
        }
    }
    setViewport: React.Dispatch<React.SetStateAction<{
        offset: {
            x: number;
            y: number;
        }
    }>>
}

const Canvas: React.FC<Props> = ({setZoomValue, zoomValue, viewport, setViewport}) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [nav, setNav] = useState< null | 'top' | 'right' | 'bottom'| 'left' >(null);


    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            if (e.buttons !== 1) {
                setIsDragging(false);

                return;
            }

            setViewport((prev) => ({
                offset: {
                    x: prev.offset.x + e.movementX / zoomValue,
                    y: prev.offset.y + e.movementY / zoomValue
                }
            }));
        }
    };

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.onwheel = (e: WheelEvent) => {
                e.preventDefault();
                e.stopPropagation();

                if (e.ctrlKey || e.metaKey) {
                    const speedFactor = (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.0002) * 10;

                    setZoomValue((prev) => {
                        const pinchDelta = -e.deltaY * speedFactor;

                        return (
                            Math.min(
                                1.5,
                                Math.max(0.25, prev * Math.pow(2, pinchDelta))
                            )
                        )})
                } else {
                    setViewport((prev) => ({
                        offset: {
                            x: prev.offset.x - e.deltaX / zoomValue,
                            y: prev.offset.y - e.deltaY / zoomValue
                        }
                    }));
                }
            };
        }
    }, [setViewport, setZoomValue, zoomValue]);

    useEffect(() => {
        if(nav === 'top') {
            setViewport((prev) => ({
                offset: {
                    x: prev.offset.x,
                    y: prev.offset.y + 1,
                },
            }));
        }
        if(nav === 'right') {
            setViewport((prev) => ({
                offset: {
                    x: prev.offset.x - 1,
                    y: prev.offset.y,
                },
            }));
        }
        if(nav === 'bottom') {
            setViewport((prev) => ({
                offset: {
                    x: prev.offset.x,
                    y: prev.offset.y - 1,
                },
            }));
        }
        if(nav === 'left') {
            setViewport((prev) => ({
                offset: {
                    x: prev.offset.x + 1,
                    y: prev.offset.y,
                },
            }));
        }
    })


    return (
        <div
            className='canvas-container'
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div
                className='nav-top'
                onMouseOver={() => setNav('top')}
                onMouseOut={() => setNav(null)}
            >
                <div className='arrow top'/>
            </div>
            <div
                className='nav-bottom'
                onMouseOver={() => setNav('bottom')}
                onMouseOut={() => setNav(null)}
            >
                <div className='arrow bottom'/>
            </div>
            <div
                className='nav-left'
                onMouseOut={() => setNav(null)}
                onMouseOver={() => setNav('left')}
            >
                <div className='arrow left'/>
            </div>
            <div
                className='nav-right'
                onMouseOut={() => setNav(null)}
                onMouseOver={() => setNav('right')}
            >
                <div className='arrow right'/>
            </div>
            <div
                className={`flowchart-container ${!isDragging && !nav ? 'zoom-animation' : ''}`}
                style={{
                    transform: `translate(${viewport.offset.x * zoomValue}px, ${
                        viewport.offset.y * zoomValue
                    }px) scale(${zoomValue})`
                }}
            >
                <div style={{backgroundColor: 'red', width: '500px', height: '200px'}} />
            </div>
        </div>
    );
};

export default Canvas;