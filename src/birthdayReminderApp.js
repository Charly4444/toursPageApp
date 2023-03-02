import React, {useState, useEffect} from 'react';
import peopleList from './data';


// calculate a persons age {input format => "2000-01-01"}
const calculateAge = (dob) => { 
    const today = new Date();
    const birthDate = new Date(dob);
    let ageInMilliseconds = today - birthDate;
    return (Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)));
};


// check if Birthday
const checkBirthday = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    if (
      birthDate.getMonth() === today.getMonth() &&
      birthDate.getDate() === today.getDate()
    ) return true;
    
    return false;
};


const BirthdayReminder  = () => {
    const allPeople = peopleList;
    const[people,setPeople] = useState([]);

    const getTodayPeople = (allPeople) => {
        var todayPeople = [];
        for(let peep of allPeople){
            const dob = peep.dob;
            // update birthdays
            peep.birthday = checkBirthday(dob);
            peep.age = calculateAge(dob);
            if(peep.birthday) todayPeople.push(peep);
        }
        setPeople(todayPeople);
    };

    useEffect (() => {
        getTodayPeople(allPeople);
    },[allPeople]);

    return <>
        <div>
            <h2>{people.length} Birthdays Today</h2>
            
            {people.map((person) => {
                const {id, name, age} = person;
                return <div key={id} className='item'>
                    <h4>{name}</h4>
                    <h5>{age}</h5>
                </div>
            })}
            <button type='button' className='btn' onClick={() => getTodayPeople(allPeople)}>
                refresh
            </button>
        </div>
    </>
};

export default BirthdayReminder;
