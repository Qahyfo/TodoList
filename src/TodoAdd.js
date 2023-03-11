import { Component } from "react";

export default class TodoAdd extends Component {
    constructor(props) {
        super(props);
        this.hangleTitleChange = this.hangleTitleChange.bind(this);
        this.hangleDescChange = this.hangleDescChange.bind(this);
        this.hangleImageChange = this.hangleImageChange.bind(this);
        this.hangleFormSubmit = this.hangleFormSubmit.bind(this);
        this.clearFormData()
    }

    clearFormData() {
        this.formData = {
            title: '',
            desc: '',
            image: ''
        };
    }

    hangleTitleChange(event) {
        this.formData.title = event.target.value;
    }
    hangleDescChange(event) {
        this.formData.desc = event.target.value;
    }
    hangleImageChange(event) {
        const cFiles = event.target.files;
        if (cFiles > 0) {
            const fileReader = new FileReader();
            const that = this;
            fileReader.onload = () => {
                that.formData.image = fileReader.result
            }
            fileReader.readAsDataURL(cFiles[0])
        } else { this.formData.image = '' }
    }

    hangleFormSubmit(event) {
        event.preventDefault()
        const newDeed = { ...this.formData }
        const date = new Date();
        newDeed.done = false;
        newDeed.createAt = date.toLocaleString()
        newDeed.key = date.getTime()
        this.props.add(newDeed)
        this.clearFormData()
        event.target.reset()
        console.log('add task')
    }

    render() {
        return (
            <section>
                <h1>Создание нового дела</h1>
                <form onSubmit={this.hangleFormSubmit}>
                    <div className="field">
                        <label className="label">Заголовок</label>
                        <div className="control">
                            <input className="input" onChange={this.hangleTitleChange}></input>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Примечание</label>
                        <div className="control">
                            <textarea className="textarea" onChange={this.hangleDescChange} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="file">
                            <label className="file-label">
                                <input className="file-input" type="file" accept="image/" onChange={this.hangleImageChange} />
                                <span className="file-cta">
                                    <span className="file-label">
                                        Графическая иллюстрация...
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <input type="reset" className="button is-link is-light" value="Сброс" />
                        </div>
                        <div className="control">
                            <input type="submit" className="button is-primary" value="Создать дело" />
                        </div>
                    </div>
                </form>
            </section>
        )
    }
}