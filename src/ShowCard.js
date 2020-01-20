import React from 'react'

const ShowCard =(props)=> {
    const {cards} = props;
    let output = cards.map((card,i)=>{
       return(
           <div className="row" key={i}>
                <div>{card.name}</div>
                <div>{card.card_number}</div>
                <div>£ {card.balance}</div>
                <div>£ {card.limit}</div>
            </div>
       )
    })
    return (
        <div>
            <h3 className="subTitle">Existing Cards</h3>
            {cards.length ? (
                <div>
                    <div className="row">
                        <div>Name</div>
                        <div>Card Number</div>
                        <div>Balance</div>
                        <div>Limit</div>
                    </div>
                    {output}
                </div>
            ) : "No cards found"}
         </div>
    )
}
export default ShowCard;