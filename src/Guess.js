import React from 'react';



function Guess({values, res}){
    let feedback = '';
    if (res){
        feedback += 'בול '.repeat(res.bull).trim()
        feedback += '  פגיעה'.repeat(res.cow)
    }
    return <div className='guess'>
    {res && <div className="feedback">
        {feedback}
        </div>}
    <div className='values'>
        {values.map((v,i)=> <span key={i} >{v}</span>)}
    </div>
    </div>


}


export default Guess;