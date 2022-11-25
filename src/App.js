import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from './components/header/Header';
import CalendarGrid from './components/calendar-grid/CalendarGrid';
import Footer from './components/footer/Footer';
import moment from 'moment';
import './App.css';
const url = 'http://localhost:5000';
const totalDays = 42;
const defaultEvent = {
  title: '',
  description: '',
  date: moment().format('X')
}
function App() {
  window.moment = moment;
  moment.updateLocale ('en', {week: {dow: 1}});
  const [today, setToday] = useState(moment());
    const startDay = today.clone().startOf('month').startOf('week');
    const endDay = moment().endOf('month').endOf('week');
    const calendar = [];
    const day = startDay.clone();
    while (!day.isAfter(endDay)) {
      calendar.push(day.clone())
      day.add(1, 'day')
    }
    const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'))
    const todayHandler = () => setToday(moment())
    const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'))
    const [method, setMetod] = useState(null)
    const [isShowForm, setShowForm] = useState(false)
    const [event, setEvent] = useState(null)
    const [events, setEvents] = useState([])
    const startDayQuery = startDay.clone().format('X')
    const endDayQuery = startDay.clone().add(totalDays, 'days').format('X')
    useEffect(() => {
      fetch(`${url}/event?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
      .then(res => res.json())
      .then(res => {
        console.log('Response', res)
        setEvents(res)
      })
    }, [today]);
    const openFormHandler = (methodName, eventForUpdate) => {
      setShowForm(true)
      setEvent(eventForUpdate || defaultEvent)
      setMetod(methodName)
    }
    const cancelBtnHandler = () => {
      setShowForm(false)
      setEvent(null)
    }
    const changeEventHandler = (text, field) => {
      setEvent(prevState => ({
        ...prevState,
        [field]: text
      }))
    }
    const removeBtnHandler = () => {
      
    }
    const eventFetchHandler = () => {
      const fetchUrl = method === 'Update' ? `${url}/event/${event.id}` : `${url}/event`;
      const httpMethod = method === 'Update' ? 'PATCH' : 'POST';
      fetch(fetchUrl, {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
        .then(res => res.json())
        .then(res => {
          if(method === 'Update') {
            setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl))
          } else {
            setEvents(prevState => [...prevState, res])
          }
          cancelBtnHandler()
        })
    }
  return (
    <>
      {
        isShowForm ? (
          <div className="form_position" onClick={cancelBtnHandler}>
            <div className="form_wrapper" onClick={e => e.stopPropagation()}>
              <input
                className="event_title"
                value={event.title}
                onChange={e => changeEventHandler(e.target.value, 'title')}
                />
              <input
                className="event_body"
                value={event.description}
                onChange={e => changeEventHandler(e.target.value, 'description')}
                />
              <div className="buttons_wrapper">
                <button className="btn" onClick={eventFetchHandler}>{method}</button>
                <button className="btn" onClick={removeBtnHandler}>Remove</button>
                <button className="btn" onClick={cancelBtnHandler}>Cancel</button>
              </div>
            </div>
          </div>
        ) : null
      }
      <div className="app">
        <Header
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
        />
        <CalendarGrid
          startDay={startDay}
          today={today}
          totalDays={totalDays}
          events={events}
          openFormHandler={openFormHandler}
          />
          <Footer/>
      </div>
    </>
  );
}

export default App;