import React from 'react';
import {CirclePlus} from "lucide-react";

const ImageLoader = ({dragActive, handleDrop, handleButtonClick, image, handleFileChange, fileInputRef}) => {
    return (
        <div className="image-loader-container">
            <div
                className={`${dragActive ? "drag-active" : ""} image-loader`}
                onDrop={handleDrop}
                onClick={handleButtonClick}
                style={{ backgroundImage: image ? `url(${image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }} // Set background image
            >
                <CirclePlus size={40} />
                <input
                    type={"file"}
                    accept={"image/*"}
                    hidden={true}
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            handleFileChange(e.target.files[0]);
                        }
                    }}
                    ref={fileInputRef}
                />
            </div>
        </div>
    );
};

export default ImageLoader;