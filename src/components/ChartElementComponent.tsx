import React, {useEffect, useRef, useState} from 'react';
import {ChartElement, LineStyles} from "../types";
import {ReactComponent as PencilIcon} from "../assets/images/icon-pencil.svg";

interface Props {
    element: ChartElement
    chartData: ChartElement[]
    setChartData:  React.Dispatch<React.SetStateAction<ChartElement[]>>
    firstVerticalLine?: LineStyles
    lastVerticalLine?: LineStyles
    blockRef?: React.RefObject<HTMLDivElement>
}

const ChartElementComponent: React.FC<Props> = ({ element, chartData, setChartData, firstVerticalLine, lastVerticalLine, blockRef }) => {
    const horizontalLineRef = useRef<HTMLDivElement>(null);
    const [firstVerticalLineStyle, setFirstVerticalLineStyle] = useState({right: 'auto', left: 'auto'});
    const [lastVerticalLineStyle, setLastVerticalLineStyle] = useState({right: 'auto', left: 'auto'});
    const [value, setValue] = useState<string>(element.title);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const areChildren = element.children && element.children.length > 1;
    const inputRef = useRef<HTMLInputElement>(null);
    const childBlockRef = useRef<HTMLDivElement>(null);
    const findElement = (id: string, elements: ChartElement[]): ChartElement | undefined => {
        let result: ChartElement | undefined;
        for(let i of elements){
            if(i.id === id){
                result = i;
                break;
            } else if(i.children){
                result = findElement(id, i.children);
                if(result){
                    break;
                }
            }
        }
        return result;
    }
    const colors = ['#FFA57B', '#15B2E0', '#FFD15B', '#FFA57B', '#15B2E0', '#FFD15B', '#FFA57B', '#15B2E0', '#FFD15B', '#6B76E1']
    const nestingLevel = element.id.split('.').length - 2;

    const deleteElement = (id: string, elements: ChartElement[]): ChartElement[] => {
        let result: ChartElement[] = elements;
        for(let i in elements){
            if(elements[i].id === id){
                result = elements.filter((element) => element.id !== id);
                break;
            } else if(elements[i].children){
                result[i].children = deleteElement(id, elements[i].children);
            }
        }
        return result;
    }

    const handleAddElement = (type: 'category' | 'service') => {
        setChartData((prevState) => {
            const lastChildrenId = element.children.length ? element.children[element.children.length - 1].id : undefined;
            const newElement: ChartElement = {
                id: `${element.id}.${lastChildrenId ? +lastChildrenId.charAt(lastChildrenId.length - 1)  + 1 : '1'}`,
                title: '',
                type,
                isEditable: true,
                children: []
            }
            // @ts-ignore
            findElement(element.id, prevState)?.children.push(newElement);
            return [...prevState]
        });
    }

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && value.length > 0){
            handleSetEditableElement();
        }
    }

    const handleSetEditableElement = () => {
        setChartData((prevState) => {
            const elementObj = findElement(element.id, prevState);
            if(elementObj !== undefined){
                if(elementObj.isEditable){
                    elementObj.title = value;
                }
                elementObj.isEditable = !elementObj.isEditable
            }
            return [...prevState]
        });
    }

    const handleDeleteElement = () => {
        setChartData((prevState) => {
            deleteElement(element.id, prevState);
            return [...prevState]
        });
    }
    useEffect(() => {
        //lines placement
        if(areChildren){
            const blockFirst = document.getElementById(element.children[0].id);
            const blockFirstToolbar = document.getElementById(`${element.children[0].id}Toolbar`);
            const blockLast = document.getElementById(element.children[element.children.length - 1].id);
            const blockLastToolbar = document.getElementById(`${element.children[element.children.length - 1].id}Toolbar`);
            const line = horizontalLineRef.current;

            if(blockFirst && blockFirstToolbar && blockLast && blockLastToolbar && line){
                const rectFirst = blockFirst.getBoundingClientRect();
                const rectFirstToolbar = blockFirstToolbar.getBoundingClientRect();
                const rectLast = blockLast.getBoundingClientRect();
                const rectLastToolbar = blockLastToolbar.getBoundingClientRect();
                const lineLeft = rectFirst.width / 2 - rectFirstToolbar.width/2 - 10 - 2;
                let lineRight = rectLast.width / 2 + rectLastToolbar.width/2 + 10 - 2;
                const marginLeft = window.getComputedStyle(blockFirst).getPropertyValue('margin-left')
                line.style.left =`calc(${lineLeft}px + ${marginLeft})`;
                line.style.right = lineRight + 'px';
                setLastVerticalLineStyle({right: lineRight + 'px', left: 'auto'});
                setFirstVerticalLineStyle({left: lineLeft + 'px', right: 'auto'});
            }
        }
    },[horizontalLineRef, element.children, element.id, chartData, areChildren]);

    useEffect(() => {
        if(element.isEditable){
            inputRef.current?.focus();
        }
    }, [element.isEditable]);

    useEffect(() => {
        //alignment of child block if there is only one
        if(childBlockRef.current && element.children.length === 1){
            const childBlock = childBlockRef.current;
            childBlock.style.marginLeft = '0px';
            const parentBlock = document.getElementById(element.id);
            const parentBlockToolbar = document.getElementById(`${element.id}Toolbar`);
            const childBlockToolbar = document.getElementById(`${element.children[0].id}Toolbar`);
            if(parentBlock && parentBlockToolbar && childBlock && childBlockToolbar){
                const rectParent = parentBlock.getBoundingClientRect();
                const rectParentToolbar = parentBlockToolbar.getBoundingClientRect();
                const rectChild = childBlock.getBoundingClientRect();
                const rectChildToolbar = childBlockToolbar.getBoundingClientRect();
                let marginValue = ((rectParent.width / 2 - rectParentToolbar.width / 2) - (rectChild.width / 2 - rectChildToolbar.width / 2));
                console.log({[element.id]: rectParent.width, [element.children[0].id]: rectChild.width}, rectParent.width < rectChild.width)
                console.log(marginValue)
                if(rectParent.width <= rectChild.width){
                    marginValue = marginValue * 2
                }
                childBlock.style.marginLeft = marginValue + 'px';
            }
        }
    }, [childBlockRef, chartData, element.children, element.id, isOpenModal]);

    const editablePart = () => (
        <div className='d-flex justify-content-center'>
            <div className={(!firstVerticalLine && !lastVerticalLine) ? 'position-relative' : ''}>
                {element.id !== '1' && <div style={firstVerticalLine || lastVerticalLine} id={`${element.id}TopLine`} className='top-line'/>}
                <div className='position-relative'>
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={element.type === 'category' ? 'Category name' : 'Service name'}
                        className='input-element'
                        onKeyPress={handlePressEnter}
                    />
                    {element.children && element.children.length > 0 && <div id={`${element.id}BottomLine`} className={`bottom-line ${element.id === '1' ? 'first-element' : ''}`}/>}
                </div>
            </div>
            <div id={`${element.id}Toolbar`} className='toolbar'>
                <button onClick={handleDeleteElement} className='tools-button orange'>
                    <div className='cross'/>
                </button>
                <button disabled={value.length < 1} onClick={handleSetEditableElement} className='tools-button green'>
                    <div className='checkmark'/>
                </button>
            </div>
        </div>
    )

    const modal = () => (
        <React.Fragment>
            {isOpenModal && <div className='modal'>
				<div className='modal-heading'>What do you want to create?</div>
				<div className='d-flex justify-content-center'>
					<button onClick={() => {
                        handleAddElement('category');
                        setIsOpenModal(false);
                    }} className='modal-button'>Category</button>
					<button onClick={() => {
                        handleAddElement('service');
                        setIsOpenModal(false);
                    }} className='modal-button'>Service</button>
				</div>
			</div>}
        </React.Fragment>
    )

    const nonEditablePart = () => (
        <div className='d-flex justify-content-center'>
            <div className={(!firstVerticalLine && !lastVerticalLine) ? 'position-relative' : ''}>
                {element.id !== '1' && <div style={firstVerticalLine || lastVerticalLine} id={`${element.id}TopLine`} className='top-line'/>}
                <div style={{backgroundColor: element.id === '1' ? 'white' : colors[nestingLevel % colors.length]}} className={`chart-element ${element.id === '1' ? 'first-element' : ''}`}>
                    {element.title}
                    {element.children && element.children.length > 0 && <div id={`${element.id}BottomLine`} className={`bottom-line ${element.id === '1' ? 'first-element' : ''}`}/>}
                </div>
            </div>
            <div id={`${element.id}Toolbar`} className='toolbar'>
                <button
                    className='tools-button gray'
                    onClick={() => element.id === '1' ? handleAddElement('category') : setIsOpenModal(true)}
                >
                    +
                </button>
                {element.id !== '1' && <button onClick={handleSetEditableElement} className='tools-button gray'>
					<PencilIcon/>
				</button>}
                {element.id !== '1' && <button onClick={handleDeleteElement} className='tools-button red'>
					<div className='cross'/>
				</button>}
            </div>
            {modal()}
        </div>
    )



    return (
        <div ref={blockRef} id={element.id} className='position-relative'>
            {element.isEditable ? editablePart() : nonEditablePart()}
            {element.children && (
                <div className='d-flex position-relative justify-content-center'>
                    {element.children.map((child: ChartElement, index: number) => (
                        <ChartElementComponent
                            key={child.id}
                            element={child}
                            chartData={chartData}
                            setChartData={setChartData}
                            firstVerticalLine={(element.children.length > 1 && index === 0) ? firstVerticalLineStyle : undefined}
                            lastVerticalLine={(element.children.length > 1 && index === element.children.length - 1) ? lastVerticalLineStyle : undefined}
                            blockRef={element.children.length === 1 ? childBlockRef : undefined}
                        />
                    ))}
                    {areChildren && <div ref={horizontalLineRef} className='line'/>}
                </div>
            )}
        </div>
    );
}

export default ChartElementComponent;