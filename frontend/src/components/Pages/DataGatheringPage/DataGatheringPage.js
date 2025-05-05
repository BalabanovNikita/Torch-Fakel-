import React from 'react';
import "./DataGatheringPage.css"

import sample1 from "../../../assets/images/sample1.jpg";
import sample2 from "../../../assets/images/sample2.jpg";
import sample3 from "../../../assets/images/sample3.jpg";


const modelList = [
    {name: "Модель1", created: "2222-22-22"},
    {name: "Модель2", created: "3333-33-33"},
    {name: "Модель3", created: "4444-44-44"},
]

const DataGatheringPage = () => {
    const [allSelected, setAllSelected] = React.useState(false);
    const [samples, setSamples] = React.useState([
        {id: 1, name: "Sample1", created: "2222-22-22", selected: false, weight: "10mb", img: sample1},
        {id: 2, name: "Sample2", created: "3333-33-33", selected: false, weight: "18mb", img: sample2},
        {id: 3, name: "Sample3", created: "4444-44-44", selected: false, weight: "10gb", img: sample3},
    ])

    const handleCheckboxChange = (sampleId) => {
        if (sampleId === -1) {
            const newAllSelected = !allSelected;

            setSamples(prevSamples =>
                prevSamples.map(sample => ({ ...sample, selected: newAllSelected }))
            );
            setAllSelected(newAllSelected);
        } else {
            setSamples(prevSamples =>
                prevSamples.map(sample =>
                    sample.id === sampleId ? { ...sample, selected: !sample.selected } : sample
                )
            );
        }
    };

    return (
        <div className="data-gathering-page">
            <div className="model-part">
                <div>
                    <h3 className="model-part-header">Список моделей</h3>
                    <div className="model-list">
                        {modelList.map((model) => (
                            <div className="model" key={model.id}>
                                <h3>{model.name}</h3>
                                <span>{model.created}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="samples">
                    <h3 className="model-part-header">Список сэмплов</h3>
                    <div className="sample-list">
                        <div className="sample">
                            <div className="sample-temp">Имя</div>
                            <div className="sample-temp">Создан</div>
                            <div className="sample-temp">Вес</div>
                            <input type={"checkbox"}
                                   onChange={e => handleCheckboxChange(-1)} />
                        </div>
                    {samples.map((sample) => (
                        <div className="sample" key={sample.id}>
                            <div className="sample-name">{sample.name}</div>
                            <div className="sample-created">{sample.created}</div>
                            <div className="sample-weight">{sample.weight}</div>
                            <input type={"checkbox"} checked={sample.selected}
                                   onChange={e => handleCheckboxChange(sample.id)} />
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <div className="data-gathering">
                {samples.map((sample) => (
                    <div className="sample-images">
                        <h4>{sample.name}</h4>
                        <img className="sample-img" src={sample.img} alt={sample.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataGatheringPage;