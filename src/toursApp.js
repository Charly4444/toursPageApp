import React, {useState} from 'react';
import tour_data from './data';
import logo from './assets/default-img01.jpg'

const Touring = () => {
    const [tours, setTours] = useState(tour_data);

    // set up object for the states
    var stick = {};
    for(let tour of tour_data){
        stick = {...stick,[`button${tour.id.toString()}`]:'show more'}
    }
    const [show, setShow] = useState(stick)

    // toggle the state of the button displayed
    const handleShow = (id) => {
        if(show[`button${id}`] === 'show more'){
            setShow({...show,[`button${id}`]:'show less'})
        }
        else{
            setShow({...show,[`button${id}`]:'show more'})
        }
    }

    // remove an item from tours list when action
    const handleTour = (id) => {
        setTours(tours.filter((item) => item.id !== id))
    }
    

    return <>
        <div className='content'>
            <h1>Our Tours</h1>
            <div className='tours'>
                {tours.map((tour) => {
                    // destructure to get items out
                    const {id,price,caption,about} = tour;
                    return (
                        <div key={id} className='single-tour'>    
                            <img className='item' src={logo} alt='img'/>
                            <section className={(show[`button${id}`]==='show more')?'tour-info':'tour-info more-tour'}>
                                <span className='tour-price'>{price}</span>
                                <h4>{caption}</h4>
                                <p>{about}</p>
                            </section>
                            <button type='button' onClick={()=>handleShow(id)}>{show[`button${id}`]}</button>
                            <button className='btn' type='button' onClick={()=>handleTour(id)}>Not Interested</button>
                        </div>
                    )
                })}
            </div>
        </div>
    </>
};

export default Touring;

// we have given each tour-itm an 'id' 
// this 'id' is important to make changes
// to and about the tour item like; removing it, changing how its displayed.