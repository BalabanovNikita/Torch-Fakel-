import React, {useState, useRef} from 'react';
import './MainPage.css';
import ImageLoader from "./components/image-loader/ImageLoader";
import noDefects from "../../../assets/images/withoutDefects.jpg";
import defects from "../../../assets/images/withDefects.jpg";

const modelList = [
    "Модель1",
    "Модель2",
    "Модель3"
]

const MainPage = () => {
    const [dragActive, setDragActive] = useState(false);
    const [image, setImage] = useState(noDefects);
    const fileInputRef = useRef(null);
    const [sensitivity, setSensitivity] = useState(0.7);
    const [model, setModel] = useState(modelList[0]);
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            handleFileChange(file);
        }
    };

    const handleFileChange = (file) => {
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="main-page"
             onDragEnter={handleDrag}
             onDragLeave={handleDrag}
             onDragOver={handleDrag}>
            <div className="left-content">
                <div className="header">
                    <h2 className="title-text">Загрузите картинку</h2>
                </div>
                <ImageLoader image={image} handleDrop={handleDrop} dragActive={dragActive} fileInputRef={fileInputRef}
                             handleButtonClick={handleButtonClick} handleFileChange={handleFileChange}/>
                <div className="commands">
                    <div className="sensitivity-container">
                        <div className="sensitivity-text">Чувствительность: <span className={"sensitivity"}>{sensitivity}</span></div>
                        <input className="sensitivity-input"
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.1"
                            placeholder="Введите чувствительность"
                            value={sensitivity}
                            onChange={(e) => {
                                const newValue = parseFloat(e.target.value);
                                setSensitivity(newValue);
                            }}
                        />
                    </div>
                    <div className="model-container">
                            <select
                                id="chooseModel"
                                value={model}
                                onChange={(e) => {setModel(e.target.value)}}>
                                {modelList.map(modelVar => (
                                    <option value={modelVar}>{modelVar}</option>
                                ))}
                            </select>
                    </div>
                </div>
            </div>
            <div className="right-content">
                <div className="header">
                    <h2 className="header">
                        Детекция
                    </h2>
                </div>
                <div className="detection-container">
                    <img src={defects} alt="" />
                </div>
            </div>
        </div>
    );
};

export default MainPage;