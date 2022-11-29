import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from './components/header/Header';
import CalendarGrid from './components/calendar-grid/CalendarGrid';
import Footer from './components/footer/Footer';
import DayComponent from './components/day-component/DayComponent';
import moment from 'moment';
import { DISPLAY_MODE_MONTH, DISPLAY_MODE_DAY} from '../src/components/helpers/Config';
import './App.css';
const url = 'http://localhost:5000';
const totalDays = 42;
const defaultEvent = {
  title: '',
  description: '',
  date: moment().format('X')
}
function App() {
  const [displayMode, setDisplayMode] = useState('month');
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
    const prevHandler = () => setToday(prev => prev.clone().subtract(1, displayMode))
    const todayHandler = () => setToday(moment())
    const nextHandler = () => setToday(prev => prev.clone().add(1, displayMode))
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
    const openFormHandler = (methodName, eventForUpdate, dayItem) => {
      setEvent(eventForUpdate || {...defaultEvent, date: dayItem.format('X')})
      setMetod(methodName)
    }
    const openModelFormHandler = (methodName, eventForUpdate, dayItem) => {
      setShowForm(true)
      openFormHandler(methodName, eventForUpdate, dayItem)
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
    const removeBtnHandler = () => {
      const fetchUrl = `${url}/event/${event.id}`;
      const httpMethod = 'DELETE';
      fetch(fetchUrl, {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(res => {
          setEvents(prevState => prevState.filter(eventEl => eventEl.id !== event.id))
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
                placeholder="Add title"
                onChange={e => changeEventHandler(e.target.value, 'title')}
                />
              <textarea
                className="event_body"
                value={event.description}
                placeholder="Add description"
                onChange={e => changeEventHandler(e.target.value, 'description')}
                />
              <div className="buttons_wrapper">
                <button className="btn" onClick={eventFetchHandler}>{method}</button>
                {
                  method === 'Update' ? (
                    <button className="btn" onClick={removeBtnHandler}>Remove</button>
                  ) : null
                }
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
          setDisplayMode={setDisplayMode}
          displayMode={displayMode}
        />
        {
          displayMode === DISPLAY_MODE_MONTH ? (
            <CalendarGrid
              startDay={startDay}
              today={today}
              totalDays={totalDays}
              events={events}
              openFormHandler={openModelFormHandler}
              setDisplayMode={setDisplayMode}
            />
          ) : null
        }
        {
          displayMode === DISPLAY_MODE_DAY ? (
            <DayComponent
              events={events}
              today={today}
              selectedEvent={event}
              setEvent={setEvent}
              changeEventHandler={changeEventHandler}
              cancelBtnHandler={cancelBtnHandler}
              eventFetchHandler={eventFetchHandler}
              method={method}
              removeBtnHandler={removeBtnHandler}
              openFormHandler={openFormHandler}
            />
          ) : null
        }
        <Footer/>
      </div>
    </>
  );
}

export default App;