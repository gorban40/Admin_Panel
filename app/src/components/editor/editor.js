import "../../helpers/iframeLoader.js";
import axios from 'axios';
import React, { Component } from 'react';
import DOMHelper from "../../helpers/dom-helper.js";
import EditorText from "../editor-text";
import UIkit from "uikit";
import Spinner from "../spinner";
import ConfirmModal from "../confirm-modal";
import ChooseModal from "../choose-modal";

export default class Editor extends Component {
    constructor() {
        super();
        this.currentPage = "index.html";
        this.state = {
            pageList: [],
            newPageName: "",
            loading: true
        }
        this.createNewPage = this.createNewPage.bind(this);
        this.isLoaded = this.isLoaded.bind(this);
        this.isLoading = this.isLoading.bind(this);
        this.save = this.save.bind(this);
        this.init = this.init.bind(this);
    }

    componentDidMount() {
        this.init(null,this.currentPage);
    }

    init(e, page) {
        if (e) {
            e.preventDefault();
        }
        this.isLoading();
        this.iframe = document.querySelector('iframe');
        this.open(page, this.isLoaded);
        this.loadPageList();
    }

    open(page, cb) {
        this.currentPage = page;

        axios
            .get(`../${page}?rnd=${Math.random()}`)
            .then(res => DOMHelper.parseStrToDOM(res.data))
            .then(DOMHelper.wrapTextNodes)
            .then(dom => {
                this.virtualDom = dom;
                return dom;
            })
            .then(DOMHelper.serializeDOMToString)
            .then(html => axios.post("./api/saveTempPage.php", { html }))
            .then(() => this.iframe.load("../2ifjdfua8u28y372h87ih2ui3h.html"))
            .then(() => setTimeout(() => this.enableEditing(), 400))
            .then(() => setTimeout(() => this.injectStyles(), 400))
            .then(cb)
            .then(() => console.log(this.iframe.load("../2ifjdfua8u28y372h87ih2ui3h.html")))
    }

    save(onSuccess, onError) {
        this.isLoading();
        const newDom = this.virtualDom.cloneNode(this.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        const html = DOMHelper.serializeDOMToString(newDom);
        console.log('yes');
        axios
            .post('./api/savePage.php', { pageName: this.currentPage, html })
            .then(onSuccess)
            .catch(onError)
            .finally(this.isLoaded);
    }

    enableEditing() {
        console.log('hello');
        this.iframe.contentDocument.body.querySelectorAll("text-editor").forEach(element => {
            const id = element.getAttribute("nodeid");
            const virtualElement = this.virtualDom.body.querySelector(`[nodeid="${id}"]`);

            new EditorText(element, virtualElement);
        });
    }

    injectStyles() {
        const style = this.iframe.contentDocument.createElement("style");
        style.innerHTML = `
            text-editor:hover {
                outline: 3px solid orange;
                outline-offset: 8px;
            }
            text-editor:focus {
                outline: 3px solid red;
                outline-offset: 8px;
            }
    `;
        this.iframe.contentDocument.head.appendChild(style);
    }

    loadPageList() {
        axios
            .get("./api/pageList.php")
            .then(res => this.setState({ pageList: res.data }))
    }

    createNewPage() {
        axios
            .post("./api/createNewPage.php", { "name": this.state.newPageName })
            .then(this.loadPageList())
            .catch(() => alert("Страница уже существует!"));
    }

    deletePage(page) {
        axios
            .post("./api/deletePage.php", { "name": page })
            .then(this.loadPageList())
            .catch(() => alert("Страницы не существует!"));
    }

    isLoading() {
        this.setState({
            loading: true
        })
    }

    isLoaded() {
        this.setState({
            loading: false
        })
    }


    render() {
        const {loading, pageList} = this.state;
        const modal = true;
        let spinner;

        loading ? spinner = <Spinner active/> : spinner = <Spinner/>

        return (
            <>
                <iframe src={this.currentPage} frameBorder="0"></iframe>

                {spinner}

                <div className="panel">
                    <button uk-toggle="target: #modal-open" className="uk-button uk-button-primary uk-margin-small-right">Відкрити</button>
                    <button uk-toggle="target: #modal-save" className="uk-button uk-button-primary">Опублікувати</button>
                </div>

                <ConfirmModal modal={modal} target={'modal-save'} method={this.save}/>
                <ChooseModal modal={modal} target={'modal-open'} data={pageList} redirect={this.init}/>
            </>
        )
    }
}

