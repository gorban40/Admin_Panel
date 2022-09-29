import React from "react";

const ChooseModal = ({ modal, target, data, redirect}) => {

    const newArr = data.filter(item => {
        return item != '2ifjdfua8u28y372h87ih2ui3h.html'
    })

    const pageList = newArr.map(item => {
        return (
            <li key={item}>
                <a  onClick={(e) => redirect(e, item)}
                    className="uk-link-muted uk-modal-close" 
                    href="#">{item}</a>
            </li>
        )
    })

    return (
        <div container="false" id={target} uk-modal={modal.toString()}>
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Відкрити</h2>
                <ul className="uk-list uk-list-divider">
                    {pageList}
                </ul>
                <p className="uk-text-right">
                    <button className="uk-button uk-button-default uk-modal-close" type="button">Скасування</button>
                </p>
            </div>
        </div>
    )
};

export default ChooseModal;