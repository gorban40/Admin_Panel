import React from "react";

const Panel = () => {
    return (
        <div className="panel">
            <button uk-toggle="target: #modal-open" className="uk-button uk-button-primary uk-margin-small-right">Відкрити</button>
            <button uk-toggle="target: #modal-save" className="uk-button uk-button-primary">Опублікувати</button>
            <button uk-toggle="target: #modal-backup" className="uk-button uk-button-default">Востановити</button>
        </div>
    )
}

export default Panel;