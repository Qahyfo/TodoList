import { Component } from "react";
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import TodoList from './TodoList'
import TodoAdd from './TodoAdd'


const date1 = new Date(2021, 7, 19, 14, 5)
const date2 = new Date(2021, 7, 19, 15, 23)

const initianialData = [
  {
    title: 'Изучить React',
    desc: 'Да поскорее!',
    image: '',
    done: true,
    createAt: date1.toLocaleString(),
    key: date1.getTime()
  },
  {
    title: 'Написать первое React-приложение',
    desc: 'Список запланированых дел',
    image: '',
    done: false,
    createAt: date2.toLocaleString(),
    key: date2.getTime()
  },
]

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: initianialData }
    this.setDone = this.setDone.bind(this) // Получение ссылки на этот обьект (пометить как выполненное)
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this)
  }


  /*
    Вот в чём прикол, когда мет setDone привяжем к обьекту от будет кидать обратно undefined
    Эту проблему спокойно решает bind (https://learn.javascript.ru/bind#reshenie-2-privyazat-kontekst-s-pomoschyu-bind)
    Грубо говоря вытащил контекст благодаря bind
  */


  setDone(key) {   //Ищем с помощью find дело у которого совпадает id и присовпадении делаем done = true
    const deed = this.state.data.find((current) => current.key === key)
    if (deed) {
      deed.done = true;
    }
    this.setState((state) => ({}))
  }


  //Метод удаления
  delete(key) {
    const newData = this.state.data.filter((current) => current.key === key)
    this.setState((state) => ({ data: newData }))
  }


  add(deed) {
    this.state.data.push(deed)
    this.setState(() => ({}))
  }

  render() {
    return (
      <HashRouter>
        <nav className="navbar is-light">
          <div className="navbar-brand">
            <NavLink to='/' className={
              (isActive) => 'navbar-item is-uppercase' + (isActive ? 'is-active' : '')
            }>Todos</NavLink>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <NavLink to='/add' className={
                (isActive) => 'navbar-item' + (isActive ? 'is-active' : '')
              }>Создать дело </NavLink>
            </div>
          </div>
        </nav>
        <main className="content px-6 mt-6">
          <Routes>
            <Route path="/" element={
              <TodoList
                setDone={this.setDone}
                list={this.state.data}
                delete={this.delete}
              />
            } />
            <Route path="/add" element={
              <TodoAdd
                add={this.add}
              />
            } />
          </Routes>
        </main>
      </HashRouter >

    )
  }


}
