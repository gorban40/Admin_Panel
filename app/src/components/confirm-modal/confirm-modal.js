import React from "react";
import UIkit from "uikit";

const ConfirmModal = ({modal, target, method}) => {
    return (
        <div container="false" id={target} uk-modal={modal.toString()}>
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Збереження</h2>
                <p>Ви дійсно хочете зберегти зміни ?</p>
                <p className="uk-text-right">
                    <button className="uk-button uk-button-default uk-modal-close" type="button">Скасування</button>
                    <button onClick={() => method(() => {
                        UIkit.notification({ message: 'Успішно збережено', status: 'success' })
                    },
                        () => {
                            UIkit.notification({ message: 'Помилка збереження', status: "danger" })
                        })} className="uk-button uk-button-primary uk-modal-close" type="button">Опублікувати</button>
                </p>
            </div>
        </div>
    )
};
export default ConfirmModal;
